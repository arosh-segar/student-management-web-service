import axios from "axios";
import Cookies from "universal-cookie";
import { API_URIS } from ".";

const cookies = new Cookies(null, { path: "/" });

const config = {
  headers: { Authorization: `Bearer ${cookies.get("accessToken")}` },
};

export const getReport = async (startDate, endDate, subjectId) => {
  return await axios.post(
    `${API_URIS.UTIL_API}/api/report`,
    {
      startDate,
      endDate,
      subjectId,
    },
    config
  );
};
