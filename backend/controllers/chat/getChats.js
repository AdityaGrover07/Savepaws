const { Chat } = require("../../models/schemas/chatSchema");
const getChats = async (req, res) => {
  const RoomId = req.body.RoomId;

  try {
    let response = await Chat.find({ RoomId: RoomId });
    res.status(200).send({ texts: response[0].texts });
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = { getChats };
