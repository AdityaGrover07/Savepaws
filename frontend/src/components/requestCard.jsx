import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faMessage, faCircle } from "@fortawesome/free-solid-svg-icons";
import { getPetByPetID } from "../utils/pets";
import "../styles/requestCard.css";
import { useEffect } from "react";
import { useState } from "react";
import truncateString from "../utils/truncate";
import { useContext } from "react";
import { UserContext } from "../utils/userContext";

export default function RequestCard({ isAdopt, data }) {
  const { state } = useContext(UserContext);
  const [pet, setPet] = useState();
  useEffect(() => {
    if (data) getPetByPetID(data?.PetID).then((res) => setPet(res));

    console.log("pet:", pet);
  }, [data]);

  const backgroundImage =
    "https://images.unsplash.com/photo-1444212477490-ca407925329e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8ZG9nc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60";

  return (
    <div className="requestCard container border rounded border-2 border-solid border-success border-opacity-50 py-2 bg-light m-2 shadow-sm">
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
          <div className="">Pet Details</div>
        </div>
      </div>
      <div className="w-100 p-3">
        {isAdopt ? (
          <div className=" d-flex flex justify-content-around mt-3">
            <div className="text-white mx-1">
              {data.Status &&
              pet &&
              pet.AdopterID &&
              pet.AdopterID == state.userID ? (
                <div className=" text-black text-center">
                  <div>
                    <button className=" btn btn-success border-2 mx-2 ">
                      <FontAwesomeIcon icon={faCircle} />
                      &nbsp; Accepted
                    </button>
                    <button className="btn btn-dark m-1 text-white mx-2">
                      <FontAwesomeIcon icon={faMessage} /> &nbsp; Chat
                    </button>
                  </div>
                  <h6 className=" py-2">
                    Thankyou for joining the paws community. You can always
                    reach reach us out on mail in case of any queries
                  </h6>
                </div>
              ) : (
                <>
                  <button className=" btn btn-secondary border-2 ">
                    <FontAwesomeIcon icon={faCircle} /> Pending
                  </button>
                  <button className="btn btn-dark m-1 text-white mx-1">
                    <FontAwesomeIcon icon={faMessage} /> &nbsp; Chat
                  </button>
                  <button className="btn btn-success m-1 text-white mx-1">
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className=" d-flex flex justify-content-between mt-3">
            <div>
              <img
                type="button"
                data-bs-toggle="dropdown"
                src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg"
                width="40"
                height="40"
                className="rounded-circle dropdown-toggle"
                alt="Placeholder profile pic"
              />
            </div>
            <div>
              <h6>User Name</h6>
              <h6>User Details</h6>
              <h6 style={{ fontSize: "12px" }}>UserID</h6>
            </div>
            <button className="btn btn-dark m-1 text-white mx-1">
              <FontAwesomeIcon icon={faMessage} /> &nbsp; Chat
            </button>
            <button className="btn btn-success m-1 text-white mx-1">
              Accept
            </button>
            <button className="btn btn-danger m-1 text-white mx-1">
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
