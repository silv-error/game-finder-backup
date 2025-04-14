import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import { getReceiverSocketId, io } from "../socket/socketio.js";

export const getConversations = async (req, res) => {
  try {
    const senderId = req.user._id;
    
    const conversations = await Conversation.find({
      participants: { $all: [senderId] }
    }).populate({ path: "participants", select: "-password" });

    if (!conversations || conversations.length === 0) {
      return res.status(200).json([]);
    }

    const chatHistory = conversations.map((conversation) => {
      return conversation.participants.find((user) => user._id.toString() !== senderId.toString());
    })

    res.status(200).json(chatHistory);
  } catch (error) {
    console.error(`Error in getChatHistory controller: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const getMessages = async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]);
    }

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.error(`Error in getMessages controller: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.id;
    const { message } = req.body;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId]
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message
    });

    if(newMessage) {
      conversation.messages.push(newMessage._id);
    }

    Promise.all([
      await conversation.save(),
      await newMessage.save()
    ])

    const receiverSocketId = await getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      await io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error(`Error in sendMessage controller: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}