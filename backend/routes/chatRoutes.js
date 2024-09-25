const express = require("express");
const routes = express.Router();

const { getRoom } = require("../controllers/chat/getRoom");
const { getChats } = require("../controllers/chat/getChats");
const { addChatList, getChatList } = require("../controllers/chat/chatList");

routes.post("/room", getRoom);
routes.post("/texts", getChats);
routes.post("/chatlist/add", addChatList);
routes.get("/chatlist/:UserId", getChatList);

module.exports = routes;
