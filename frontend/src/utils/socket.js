import { io } from "socket.io-client";
import axios from "axios";
import { API_ROOT } from "../api-config";

const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:9000";

export const socket = io.connect(URL);

export const getRoom = async (SenderId, RecevierId) => {
  console.log("getRoom", SenderId, RecevierId);
  try {
    let res = await axios.post(`${API_ROOT}/chat/room`, {
      SenderId: SenderId,
      RecevierId: RecevierId,
    });

    return res.data.roomId;
  } catch (err) {
    console.log(err);
  }
};

export const getChats = async (RoomId) => {
  try {
    let res = await axios.post(`${API_ROOT}/chat/texts`, {
      RoomId: RoomId,
    });
    console.log("Chats", res);
    return res.data.texts;
  } catch (err) {
    console.log(err);
  }
};

export const addChatList = async (UserId, ConnectionId, PetID) => {
  try {
    let res = await axios.post(`${API_ROOT}/chat/chatlist/add`, {
      UserId,
      ConnectionId,
      PetID,
    });

    return res.status;
  } catch (err) {
    console.log(err);
  }
};

export const getChatList = async (UserId) => {
  try {
    let res = await axios.get(`${API_ROOT}/chat/chatlist/${UserId}`);
    console.log("here", res.data);
    return res.data.ChatList;
  } catch (err) {
    console.log(err);
  }
};
