import axios from "axios";
import Cookies from "universal-cookie";
import { API_URIS } from ".";

const cookies = new Cookies(null, { path: "/" });

const config = {
  headers: { Authorization: `Bearer ${cookies.get("accessToken")}` },
};

export const getAllSessions = async () => {
  return await axios.get(`${API_URIS.CORE_API}/api/session`, config);
};

export const getSessionById = async (id) => {
  return await axios.get(`${API_URIS.CORE_API}/api/session/${id}`, config);
};

export const addSession = async (
  subjectId,
  createdDate,
  duration,
  chaptersCovered
) => {
  return await axios.post(
    `${API_URIS.CORE_API}/api/session`,
    {
      subjectId,
      createdDate,
      duration,
      chaptersCovered,
    },
    config
  );
};

export const editSession = async (
  id,
  subjectId,
  createdDate,
  duration,
  chaptersCovered
) => {
  return await axios.put(
    `${API_URIS.CORE_API}/api/session/${id}`,
    {
      subjectId,
      createdDate,
      duration,
      chaptersCovered,
    },
    config
  );
};

export const deleteSession = async (id) => {
  return await axios.delete(`${API_URIS.CORE_API}/api/session/${id}`, config);
};
