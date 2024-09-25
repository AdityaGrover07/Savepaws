import { API_ROOT } from "../api-config";
import axios from "axios";
export const getMetrics = async () => {
  try {
    let res = await axios.get(`${API_ROOT}/analytics/metrics`);
    return res.data.metric;
  } catch (err) {}
};
