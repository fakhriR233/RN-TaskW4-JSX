import axios from "axios";

export const API = axios.create({
  baseURL:
    "https://api.kontenbase.com/query/api/v1/f0a21145-1afb-41dd-af7d-598a98d9d626",
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};
