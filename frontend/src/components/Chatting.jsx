import { useForm } from "react-hook-form";
import "../styles/chat.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Message from "../components/message";
import { useState } from "react";
import { useEffect } from "react";
import { addChatList } from "../utils/socket";

export default function Chatting({
  RoomId,
  SenderId,
  ReceiverId,
  previous_messages,
  socket,
  SenderName,
  receiverInfo,
  petId,
}) {
  const [messageList, setMessageList] = useState(previous_messages);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  });

  const onSubmit = (data) => {
    let message = {
      RoomId: RoomId,
      SenderId: SenderId,
      RecevierId: ReceiverId,
      text: data.message,
    };

    socket.emit("send_message", message);
    let temp = { text: message.text, Sender: message.SenderId };
    setMessageList((list) => [...list, temp]);
    addChatList(SenderId, ReceiverId, petId);
  };

  const formSchema = yup.object().shape({
    message: yup.string().required("message is required"),
  });

  const formOptions = { resolver: yupResolver(formSchema) };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  return (
    <div className="  w-100 bg-white d-flex flex-column m-2 rounded overflow-auto ">
      <div className=" w-100">
        <div className=" w-100 d-flex align-items-center bg-success p-2 text-white rounded ">
          <div className=" px-2">
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
          </div>
          <div>
            {receiverInfo?.name} (<span>{ReceiverId}</span>) - Pet Name
          </div>
        </div>
        <center>
          <b>Text messages will appear here</b>
        </center>
      </div>
      <div className=" overflow-auto">
        {messageList.length > 0 ? (
          <div className=" p-2  ">
            {messageList.map((el) => {
              return (
                <div>
                  {el.Sender == SenderId ? (
                    <Message
                      text={el.text}
                      type="send"
                      image={SenderId}
                      name={SenderName}
                      time="2"
                    />
                  ) : (
                    <Message
                      text={el.text}
                      type="receive"
                      image={ReceiverId}
                      name={receiverInfo.name}
                      time="2"
                    />
                  )}
                </div>
              );
            })}{" "}
          </div>
        ) : (
          <div />
        )}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" mt-auto align-self-end w-100 d-flex input-group"
      >
        <input
          type="text"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          {...register("message")}
          className={`form-control form-control-lg shadow-none  ${
            errors.name ? "is-invalid" : ""
          }`}
        />
        <button
          href="#"
          class="input-group-append btn btn-success btn-sm text-white px-4"
        >
          send
        </button>
      </form>
    </div>
  );
}
