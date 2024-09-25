const { CONNECTIONS_LIMIT } = require("./constants");
const { Chat, Text } = require("../../models/schemas/chatSchema");
const { mongoose } = require("mongoose");

const MessageList = [];

module.exports = (socket, io) => {
  if (io.engine.clientsCount > CONNECTIONS_LIMIT) {
    socket.emit("err", { message: "reach the limit of connections" });
    socket.disconnect();
    console.log("Disconnected...");
    return;
  }

  socket.on("connect", () => {
    console.log("User Connected", socket.id);
  });

  socket.emit("welcome", "Welcome to Paws Adoption Community Chat (MVC Phase)");

  socket.on("send_message", async (data) => {
    console.log(data);
    try {
      socket.to(data.RoomId).emit("receive_message", data);
      let res = await Chat.updateOne(
        {
          RoomId: data.RoomId,
        },
        { $push: { texts: { text: data.text, Sender: data.SenderId } } }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });

  // socket.on("previous_messages", async (RoomId) => {
  //   let response = await Chat.find({ RoomId: RoomId });
  //   console.log(response);
  //   socket.to(RoomId).emit("previous_messages_list", response[0]?.texts);
  // });

  socket.on("join_room", (RoomId) => {
    socket.join(RoomId);
    console.log(`User with ID: ${socket.id} joined room: ${RoomId}`);
  });
};
