import axios from "axios";
import { API_ROOT } from "../api-config";
export const getUserInfo = async (UserID) => {
  try {
    let response = await axios.post(
      `${API_ROOT}/user/userInfo`,
      {
        UserID: UserID,
      }
      //   { withCredentials: true }
    );
    return response.data.userInfo;
  } catch (err) {}
};
