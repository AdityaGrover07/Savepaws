const mongoose = require("mongoose");

const textSchema = new mongoose.Schema(
  {
    text: String,
    Sender: String,
  },
  { timestamps: true }
);

const Text = mongoose.model("text", textSchema);

const ChatListSchema = new mongoose.Schema({
  UserId: {
    type: String,
    required: true,
  },
  Connections: [
    {
      UserId: String,
      PetID: String,
    },
  ],
});

const ChatList = mongoose.model("chatList", ChatListSchema);

const ChatSchema = new mongoose.Schema(
  {
    // unique id
    RoomId: {
      type: String,
      required: true,
    },
    // From & To are userId's
    SenderId: {
      type: String,
      required: true,
    },
    RecevierId: {
      type: String,
      required: true,
    },
    texts: [textSchema],
  },
  { timestamps: true }
);

const Chat = mongoose.model("chat", ChatSchema);

module.exports = { Chat, Text, ChatList };
