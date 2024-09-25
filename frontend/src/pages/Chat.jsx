import Chatting from "../components/Chatting";
import "../styles/chat.css";
import { useContext } from "react";
import { UserContext } from "../utils/userContext";
import { useState } from "react";
import { getChatList, getChats, getRoom, socket } from "../utils/socket";
import { useEffect } from "react";
import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { getUserInfo } from "../utils/user";

export default function Chat() {
  const { state } = useContext(UserContext);
  const { receiverId, petId } = useParams();
  const [ReceiverId, setReceiverId] = useState(receiverId);
  const [senderId, setSenderId] = useState();
  const [messageList, setMessageList] = useState([]);
  const [room, setRoom] = useState();
  const [receiverInfo, setReceiverInfo] = useState();
  const [ChatList, setChatList] = useState([]);

  useEffect(() => {
    if (state.userID) {
      getChatList(state.userID).then((res) => {
        // setChatList([]);
        console.log("res", res);
        res.forEach((el) => {
          setChatList((list) => [...list, el.UserId]);
        });
      });
    }
  }, [state]);

  const getMessages = useCallback(async () => {
    getRoom(senderId, ReceiverId).then((res) => {
      setRoom(res);
      if (res?.length > 0) {
        socket.emit("join_room", room);
        getChats(room).then((res) =>
          res.forEach((el) => {
            let temp = { text: el.text, Sender: el.Sender };
            setMessageList((list) => [...list, temp]);
          })
        );

        // Bug: Infinite Loop
      }
    });

    console.log("prev:", messageList);
  }, [ReceiverId, senderId, room]);

  useEffect(() => {
    setSenderId(state?.userID);
    getMessages();
  }, [state, getMessages]);

  // useEffect(() => {
  //   getPrevMessages();
  // });

  useEffect(() => {
    getUserInfo(ReceiverId).then((res) => {
      setReceiverInfo(res[0]);
    });
  }, [ReceiverId]);

  return (
    <div className="chat-component container-fluid d-flex w-100 justify-content-between">
      <div className="userslist w-25 border-2 border-white p-2">
        {ChatList.length > 0 ? (
          ChatList.map((el) => {
            return (
              <button
                className=" btn btn-lg btn-light text-black w-100 text-left"
                style={{ fontSize: "18px" }}
                onClick={() => {
                  setReceiverId(el);
                  getMessages();
                  getUserInfo(el).then((res) => {
                    setReceiverInfo(res[0]);
                  });
                }}
              >
                <img
                  type="button"
                  data-bs-toggle="dropdown"
                  src={` https://paws-adoption.s3.ap-south-1.amazonaws.com/users/${ReceiverId}.jpeg`}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src =
                      "https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg";
                  }}
                  width="55"
                  height="55"
                  className="rounded-circle dropdown-toggle"
                  alt="Placeholder profile pic"
                />
                &nbsp; &nbsp;
                {el.UserId}
              </button>
            );
          })
        ) : (
          <button
            className=" btn btn-lg btn-light text-black w-100 text-left"
            style={{ fontSize: "18px" }}
            // onClick={() => setReceiverId("g90bm4shlftghf94")}
          >
            <img
              type="button"
              data-bs-toggle="dropdown"
              src={` https://paws-adoption.s3.ap-south-1.amazonaws.com/users/${ReceiverId}.jpeg`}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src =
                  "https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg";
              }}
              width="55"
              height="55"
              className="rounded-circle dropdown-toggle"
              alt="Placeholder profile pic"
            />
            &nbsp; &nbsp;
            {receiverInfo?.name}
          </button>
        )}
      </div>
      <div className=" absolute  w-75 bg-white h-90 d-flex flex-column m-2 rounded ">
        {room && ReceiverId && senderId && messageList.length > 0 ? (
          <Chatting
            socket={socket}
            RoomId={room}
            previous_messages={messageList}
            ReceiverId={ReceiverId !== receiverId ? receiverId : ReceiverId}
            SenderId={senderId}
            SenderName={state.name}
            receiverInfo={receiverInfo}
            petId={petId}
          />
        ) : (
          <div className="text-center margin-auto ">Loading...</div>
        )}
      </div>
    </div>
  );
}
