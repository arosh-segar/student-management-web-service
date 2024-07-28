import axios from "axios";
import Cookies from "universal-cookie";
import { API_URIS } from ".";

const cookies = new Cookies(null, { path: "/" });

const config = {
  headers: { Authorization: `Bearer ${cookies.get("accessToken")}` },
};

export const getPrediction = async (subjectId) => {
  return await axios.post(
    `${API_URIS.UTIL_API}/api/prediction`,
    {
      subjectId,
    },
    config
  );
};
