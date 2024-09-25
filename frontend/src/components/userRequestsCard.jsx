import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faMessage, faCircle } from "@fortawesome/free-solid-svg-icons";
import { getPetByPetID } from "../utils/pets";
import { acceptAdoptRequest, rejectAdoptRequest } from "../utils/requests";
import "../styles/userRequestCard.css";
import { useEffect } from "react";
import { useState } from "react";
import truncateString from "../utils/truncate";
import { useContext } from "react";
import { UserContext } from "../utils/userContext";
import { getUserInfo } from "../utils/user";

export default function UserRequestCard({ data, requests }) {
  const { state } = useContext(UserContext);
  const [pet, setPet] = useState();
  const [req, setReqs] = useState();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (data) getPetByPetID(data?.PetID).then((res) => setPet(res));
    console.log(state.UserID);
    if (requests && requests[0]?.Requests) {
      let req = requests[0].Requests;
      setUsers([]);
      req.forEach((e) => {
        getUserInfo(e).then((res) => {
          setUsers((prevstate) => [...prevstate, res]);
        });
      });
    }

    console.log(pet);
  }, [requests]);

  const backgroundImage =
    "https://images.unsplash.com/photo-1444212477490-ca407925329e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8ZG9nc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60";

  return (
    <div className="userRequestCard container border rounded border-2 border-solid border-success border-opacity-50 py-2 bg-light m-2 shadow-sm">
      <div className=" flex d-flex">
        <div>
          <div
            className="rounded px-2 shadow-lg "
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "400px",
              width: "350px",
            }}
          />
        </div>
        <div className=" p-3 w-100 align-self-start">
          <div className="">
            <h3>
              <b>{pet?.Name}</b>
            </h3>
          </div>

          <div className="pt-2">
            <h6>
              {pet?.Description ? (
                truncateString(pet?.Description, 150)
              ) : (
                <div />
              )}
            </h6>
          </div>
          <hr />
          <div>
            <h6>
              <b>Pet Details</b>
            </h6>
            <p>
              Address: {pet?.State}, {pet?.City}
            </p>
          </div>
        </div>
      </div>
      <div className="w-100">
        {users.length > 0 &&
          users.map((element) => {
            return (
              <div className=" d-flex flex justify-content-between mt-3 bg-secondary text-white p-2 rounded">
                <div>
                  <img
                    type="button"
                    data-bs-toggle="dropdown"
                    src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg"
                    width="55"
                    height="55"
                    className="rounded-circle dropdown-toggle"
                    alt="Placeholder profile pic"
                  />
                </div>
                <div>
                  <p>
                    Name: {element[0].name}
                    <br />
                    Mobile: {element[0].mobile}
                    <br />
                    <p style={{ fontSize: "12px" }}>
                      userId: {element[0].userId}
                    </p>
                  </p>
                </div>
                <button className="btn btn-dark m-1 text-white mx-1">
                  <FontAwesomeIcon icon={faMessage} /> &nbsp; Chat
                </button>
                <button
                  onClick={() => {
                    let response = acceptAdoptRequest(
                      pet.PetID,
                      element[0].userId,
                      state.userID
                    );
                    alert(response);
                  }}
                  className="btn btn-success m-1 text-white mx-1"
                >
                  Accept
                </button>
                <button
                  onClick={rejectAdoptRequest}
                  className="btn btn-danger m-1 text-white mx-1"
                >
                  Reject
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
