import Message from "../models/message.model";
import Conversation from "../models/conversation.model";

export const getConversations = async (req, res) => {
  try {
    const senderId = req.user._id;
    
    const conversations = await Conversation.find({
      participants: { $all: [senderId] }
    });

    if (!conversations || conversations.length === 0) {
      return res.status(200).json([]);
    }

    const chatHistory = conversations.map((conversation) => {
      const receiverId = conversation.participants.find((user) => user._id.toString() !== senderId.toString());
      return { receiverId };
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

    let conversation = await Conversation.find({
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

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error(`Error in sendMessage controller: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}