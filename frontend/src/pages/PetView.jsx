import "../styles/ui.css";
import "../styles/responsive.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faHeart,
  faInfoCircle,
  faMedkit,
  faStickyNote,
  faMessage,
  faComments,
  faCommentSlash,
} from "@fortawesome/free-solid-svg-icons";
import { API_ROOT } from "../api-config";
import { useContext } from "react";
import { UserContext } from "../utils/userContext";
import { requestPet } from "../utils/requests";
import { useParams } from "react-router-dom";
import { getPetByPetID } from "../utils/pets";
import Modal from "../components/modal";
import { useNavigate } from "react-router-dom";

library.add(fab);
function PetViewPage() {
  const [socialList, setSocialList] = useState([]);
  const { PetID } = useParams();
  const navigate = useNavigate();
  const [element, setElement] = useState();
  const [petAddModal, setPetAddModal] = useState(false);
  const [message, setMessage] = useState();
  useEffect(() => {
    getPetByPetID(PetID).then((res) => setElement(res));

    updatedSocialList();
  }, [PetID]);

  const handleOnClick = (event) => {
    setimgS(event.target.src);
  };

<<<<<<< HEAD
  const [imgS, setimgS] = useState();
  // `https://paws-adoption.s3.ap-south-1.amazonaws.com/pets/${PetID}-1.jpg`
=======
  const [imgS, setimgS] = useState(
    `https://paws-adoption.s3.amazonaws.com/pets/${PetID}-1.jpg`
  );
  // `https://paws-adoption.s3.amazonaws.com/pets/${PetID}-1.jpg`
>>>>>>> a9577ef (dbox review 29th march)
  const { state } = useContext(UserContext);
  // console.log("State ", state.userID);
  const [comment, setComment] = useState("");
  const [likeColor, setlikeColor] = useState();
  const handleOnChange = (event) => {
    setComment(event.target.value);
  };

  const PetLike = () => {
    setlikeColor("red");
  };

  const addComment = () => {
    clear();
    // console.log("comment", comment);
    // console.log(likeColor == "red" ? element.RescuerID : 5);
    const SocialData = {
      comment: comment,
      likes: likeColor == "red" ? state.userID : null,
      author: state.userID,
      PetID: element.PetID,
    };
    newComment(SocialData);
  };

  const newComment = async (SocialData) => {
    console.log(SocialData);
    try {
      const res = await axios.post(
        `${API_ROOT}/social/${SocialData.PetID}/social`,
        { SocialData }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updatedSocialList = async () => {
    try {
      axios.get(`${API_ROOT}/social/${PetID}/getSocial`).then((res) => {
        setSocialList(res.data);
      });
    } catch (err) {
      console.log(err);
    }

    // console.log("New Function", res);
  };

  const clear = () => {
    setComment("");
  };

  const sendPetRequest = async () => {
    let res = await requestPet(PetID, state.userID);
    setMessage(res);
    setPetAddModal(true);
  };

  return (
    <div className="pet-view">
      <section className="section-content padding-y bg">
        {petAddModal ? (
          <Modal state={petAddModal} text={`${message}`} />
        ) : (
          <></>
        )}
        {element ? (
          <div className="container-fluid">
            <article className="pet">
              <div className="pet-body">
                <div className="row">
                  <aside className="col-md-6">
                    <article className="gallery-wrap">
                      <div className="pet img-big-wrap">
                        <a href="/">
                          {" "}
                          <img src={imgS} alt="Selected view" />
                        </a>
                      </div>
                      <div className="thumbs-wrap">
                        <a href="#" className="item-thumb">
                          {" "}
                          <img
                            className="cover"
                            // src={`https://paws-adoption.s3.ap-south-1.amazonaws.com/pets/${PetID}-1.jpg`}
                            onClick={handleOnClick}
                            alt="error"
                          />
                        </a>
                        <a href="#" className="item-thumb">
                          {" "}
                          <img
                            className="cover"
                            // src={`https://paws-adoption.s3.ap-south-1.amazonaws.com/pets/${PetID}-2.jpg`}
                            onClick={handleOnClick}
                            alt="error"
                          />
                        </a>
                        <a href="#" className="item-thumb">
                          {" "}
                          <img
                            className="cover"
                            // src={`https://paws-adoption.s3.ap-south-1.amazonaws.com/pets/${PetID}-3.jpg`}
                            onClick={handleOnClick}
                            alt="error"
                          />
                        </a>
                        <a href="#" className="item-thumb">
                          {" "}
                          <img
                            className="cover"
                            // src={`https://paws-adoption.s3.ap-south-1.amazonaws.com/pets/${PetID}-4.jpg`}
                            onClick={handleOnClick}
                            alt="error"
                          />
                        </a>
                      </div>
                    </article>
                  </aside>
                  <main className="col-md-6">
                    <article>
                      <div className=" d-flex justify-content-between w-full align-items-center me-2 ms-2">
                        <div>
                          <h3 className="title" style={{ color: "green" }}>
                            <b>{element.Name}, </b>
                            <span style={{ fontSize: "20px", color: "black" }}>
                              (City, State)
                            </span>
                          </h3>
                        </div>
                        {state.user ? (
                          <div className="like_adopt">
                            <span className="sp_heart" role="button">
                              <FontAwesomeIcon
                                icon={faHeart}
                                className="heart-hover"
                                onClick={PetLike}
                                style={{ color: likeColor }}
                              />{" "}
                              Like
                            </span>
                          </div>
                        ) : (
                          <div />
                        )}
                      </div>

                      <hr width="90%" />

                      <div className="mb-3">
                        <h5>
                          <b>
                            <FontAwesomeIcon
                              icon={faInfoCircle}
                              style={{ color: "#25511f" }}
                            />{" "}
                            Basic Information
                          </b>
                        </h5>
                        <ul className="schema-ul">
                          <li>Age: {element.Age} </li>
                          <li>
                            gender:{" "}
                            {element.Gender ? (
                              <span>Male</span>
                            ) : (
                              <div>
                                {element.Gender == 2 ? (
                                  <span>Female</span>
                                ) : (
                                  <span>Not Sure</span>
                                )}
                              </div>
                            )}
                          </li>
                          <li>Breed: {element.Breed1} </li>
                          <li>Status: </li>
                        </ul>

                        <hr width="90%" />

                        <h5>
                          <b>
                            <FontAwesomeIcon
                              icon={faMedkit}
                              style={{ color: "#25511f" }}
                            />{" "}
                            Health
                          </b>
                        </h5>
                        <ul>
                          <li>
                            Vaccinated:{" "}
                            {element.Vaccinated == 1 ? (
                              <span>True</span>
                            ) : (
                              <span>False</span>
                            )}
                          </li>
                          <li>
                            Sterilized:{" "}
                            {element.Sterilized ? (
                              <span>Yes</span>
                            ) : (
                              <div>
                                {element.Gender == 2 ? (
                                  <span>No</span>
                                ) : (
                                  <span>Not Sure</span>
                                )}
                              </div>
                            )}
                          </li>
                        </ul>

                        <hr width="90%" />

                        <h5>
                          <b>
                            <FontAwesomeIcon
                              icon={faStickyNote}
                              style={{ color: "#25511f" }}
                            />{" "}
                            Description
                          </b>
                        </h5>
                        <p>{element.Description}</p>
                      </div>

                      {state.user ? (
                        <div className="mb-4">
                          <button
                            onClick={sendPetRequest}
                            className="btn btn-success mx-2"
                            style={{ color: "white" }}
                          >
                            Request now
                          </button>
                          <button
                            className="btn btn-success mx-2"
                            style={{ color: "white" }}
                            onClick={() =>
                              navigate(
                                `/chat/${element.RescuerID}/${element.PetID}`
                              )
                            }
                          >
                            <FontAwesomeIcon icon={faMessage} /> &nbsp;Chat
                          </button>
                        </div>
                      ) : (
                        <div />
                      )}
                    </article>
                  </main>
                </div>
              </div>
            </article>

            <article className="pet mt-5">
              <div className="pet-body px-4">
                <h3>Comments</h3>

                <div className="comments container">
                  <div
                    className="scrollspy-example comment-widgets mb-30"
                    data-bs-spy="scroll"
                    data-bs-offset="0"
                  >
                    {socialList.map((res) => {
                      return (
                        <div className="d-flex flex-row justify-contents-between align-items-center comment-row">
                          <div className="p-2">
                            <span class="round">
                              <img
                                src="data:image/jpeg;base64,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"
                                alt="user"
                                width="50"
                              />
                            </span>
                          </div>
                          <div class="comment-text w-100">
                            <h5 style={{ color: "blue" }}>{res.author.name}</h5>
                            <div class="comment-footer">
                              <span class="date">
                                {res.createdAt
                                  ? new Date(res.createdAt).toLocaleDateString()
                                  : Date.now()}
                              </span>
                            </div>
                            <p class="m-b-5 m-t-10 commentData">
                              {res.comments}
                            </p>
                          </div>
                        </div>
                      );
                    })}

                    <div className="p-2">
                      <div className="d-flex flex-row align-items-start">
                        <img
                          className="rounded-circle"
                          src="data:image/jpeg;base64,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"
                          width="40"
                        />
                        <textarea
                          className="form-control ml-1"
                          placeholder="Add a Comment"
                          value={comment}
                          onChange={handleOnChange}
                        ></textarea>
                      </div>

                      <div className="mt-2 text-right d-flex justify-content-end align-items-end">
                        <button
                          className="btn btn-primary btn-sm mx-2"
                          type="button"
                          onClick={addComment}
                        >
                          <FontAwesomeIcon
                            icon={faComments}
                            style={{ color: "#dadde2" }}
                          />
                          &nbsp; Post comment
                        </button>
                        <button
                          className="btn btn-primary btn-sm ml-1"
                          type="button"
                          onClick={clear}
                        >
                          <FontAwesomeIcon icon={faCommentSlash} /> &nbsp;
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        ) : (
          <div />
        )}
      </section>
    </div>
  );
}

export default PetViewPage;
