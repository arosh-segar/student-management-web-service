import axios from "axios";
import Cookies from "universal-cookie";
import { API_URIS } from ".";

const cookies = new Cookies(null, { path: "/" });

const config = {
  headers: { Authorization: `Bearer ${cookies.get("accessToken")}` },
};

export const getAllSubjects = async () => {
  return await axios.get(`${API_URIS.CORE_API}/api/subject`, config);
};

export const getSubjectById = async (id) => {
  return await axios.get(`${API_URIS.CORE_API}/api/subject/${id}`, config);
};

export const addSubject = async (
  name,
  knowledgeLevel,
  numberOfChapters,
  numberOfChaptersCovered,
  deadline
) => {
  return await axios.post(
    `${API_URIS.CORE_API}/api/subject`,
    {
      name,
      knowledgeLevel,
      numberOfChapters,
      numberOfChaptersCovered,
      deadline,
    },
    config
  );
};

export const editSubject = async (
  id,
  name,
  knowledgeLevel,
  numberOfChapters,
  numberOfChaptersCovered,
  deadline
) => {
  return await axios.put(
    `${API_URIS.CORE_API}/api/subject/${id}`,
    {
      name,
      knowledgeLevel,
      numberOfChapters,
      numberOfChaptersCovered,
      deadline,
    },
    config
  );
};

export const deleteSubject = async (id) => {
  return await axios.delete(`${API_URIS.CORE_API}/api/subject/${id}`, config);
};
