import axios from "axios";
import Cookies from "universal-cookie";
import { API_URIS } from ".";

const cookies = new Cookies(null, { path: "/" });

const config = {
  headers: { Authorization: `Bearer ${cookies.get("accessToken")}` },
};

export const getAllBreaks = async () => {
  return await axios.get(`${API_URIS.CORE_API}/api/break`, config);
};

export const getBreakById = async (id) => {
  return await axios.get(`${API_URIS.CORE_API}/api/break/${id}`, config);
};

export const addBreak = async (createdDate, duration) => {
  return await axios.post(
    `${API_URIS.CORE_API}/api/break`,
    {
      createdDate,
      duration,
    },
    config
  );
};

export const editBreak = async (id, createdDate, duration) => {
  return await axios.put(
    `${API_URIS.CORE_API}/api/break/${id}`,
    {
      createdDate,
      duration,
    },
    config
  );
};

export const deleteBreak = async (id) => {
  return await axios.delete(`${API_URIS.CORE_API}/api/break/${id}`, config);
};
