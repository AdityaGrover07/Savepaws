const { Chat } = require("../../models/schemas/chatSchema");
const uniqid = require("uniqid");

const getRoom = async (req, res) => {
  let SenderId = req.body.SenderId;
  let RecevierId = req.body.RecevierId;
  let roomId = uniqid();
  try {
    let chat = await Chat.find({
      $or: [
        { SenderId: SenderId, RecevierId: RecevierId },
        { SenderId: RecevierId, RecevierId: SenderId },
      ],
    });

    // Room not found
    if (chat.length == 0) {
      let newChat = new Chat({
        RoomId: roomId,
        SenderId: SenderId,
        RecevierId: RecevierId,
      });

      await newChat.save();
    }
    // Room found
    else {
      roomId = chat[0].RoomId;
    }

    res.status(200).send({ roomId });
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = { getRoom };
