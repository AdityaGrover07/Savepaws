import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "550px",
    border: "2px solid green",
    borderRadius: "10px",
    color: "black",
  },
};

library.add(fab);

export default function ModalContainer({ state, text }) {
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(state);

  function closeModal() {
    setIsOpen(false);
    navigate("/home");
  }
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Example Modal"
      >
        <div className=" d-flex flex-column">
          <div className="pb-2 align-self-end ">
            <button class="btn btn-danger mx-1 m-auto" onClick={closeModal}>
              <FontAwesomeIcon icon={faClose} />
            </button>
          </div>
          <div className=" p-4 text-start">
            <h4>{text}</h4>
          </div>

          <div className=" pt-2 align-self-end">
            <button class="btn btn-success mx-1" onClick={closeModal}>
              cancel
            </button>
            <button class="btn btn-success mx-1" onClick={closeModal}>
              okay, got it!!
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
