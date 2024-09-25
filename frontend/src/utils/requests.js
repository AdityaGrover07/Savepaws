import axios from "axios";
import { API_ROOT } from "../api-config";

// User requested pet
export const getRequestByUserID = async (UserID) => {
  let data;
  try {
    await axios
      .get(`${API_ROOT}/pets/requests/user/${UserID}`)
      .then(async (response) => {
        let res = await getRequestsByPetID(response.data.PetID);
        data = await res.data.Pet;
      });
    return { data };
  } catch (err) {
    console.log(err);
  }
};

const getRequestsByPetID = async (PetID) => {
  try {
    let res = await axios.get(`${API_ROOT}/pets/requests/pet/${PetID}`);
    return res;
  } catch (err) {
    console.log(err);
  }
};

// // User rescued pet requests
export const getRequestsByRescuerID = async (RescuerID) => {
  /**
   * Fix this fxn in backend
   */
  try {
    let res = await axios.get(`${API_ROOT}/pets/requests/rescuer/${RescuerID}`);

    if (res.data.Requests) return res.data.Requests;
    else return {};
  } catch (err) {
    console.log(err);
  }
};

export const requestPet = async (PetID, UserID) => {
  try {
    let res = await axios.post(`${API_ROOT}/pets/requestpet`, {
      PetID: PetID,
      UserID: UserID,
    });
    return res.data.message;
  } catch (err) {
    console.log(err);
  }
};

export const acceptAdoptRequest = async (PetID, UserID, RescuerID) => {
  try {
    let res = await axios.post(`${API_ROOT}/pets/adopt`, {
      PetID: PetID,
      UserID: UserID,
      RescuerID: RescuerID,
    });
    console.log(res.data.message);
    return res.data.message;
  } catch (err) {
    console.log(err);
  }
};
export const rejectAdoptRequest = () => {};

// export const deleteRequest = async () => {};
