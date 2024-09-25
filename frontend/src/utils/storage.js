import axios from "axios";
import { API_ROOT } from "../api-config";

export const getSessionStorage = async () => {
  var initialValue = {
    user: false,
    userID: "",
    email: "",
    name: "",
    overlay: false,
    mobile: "",
  };

  let res = await axios.get(`${API_ROOT}/user/info`, {
    withCredentials: true,
  });

  if (res.status === 200) {
    let user = res.data[0];
    initialValue = {
      user: true,
      userID: user.userId,
      email: user.email,
      name: user.name,
      overlay: false,
      mobile: user.mobile,
    };
  }
  return initialValue;
};
