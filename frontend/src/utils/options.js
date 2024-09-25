import { API_ROOT } from "../api-config";
import axios from "axios";

export const getBreedOptions = async () => {
  try {
    let breedOptions = [];
    const res = await axios.get(`${API_ROOT}/options/breeds`);

    res.data.forEach((element) => {
      const obj = {};
      obj.label = element.BreedName;
      obj.value = element.BreedID;
      breedOptions.push(obj);
    });

    return breedOptions;
  } catch (err) {
    console.log(err);
  }
};

export const getStatesOption = async () => {
  try {
    let statesOptions = [];
    const res = await axios.get(`${API_ROOT}/options/states`);

    res.data.forEach((element) => {
      const obj = {};
      obj.value = element.StateID;
      obj.label = element.StateName;

      statesOptions.push(obj);
    });

    return statesOptions;
  } catch (err) {
    console.log(err);
  }
};

// export { getBreedOptions };
