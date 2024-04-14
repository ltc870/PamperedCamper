import axios from "axios";
const API_URL = "/api/campgrounds/";

const getCampgrounds = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const addCampground = async (campgroundData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, campgroundData, config);
  return response.data;
};

const getMyCampgrounds = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}mycampgrounds`, config);
  console.log(response.data);
  return response.data;
};

const deleteCampground = async (id, token) => {
  console.log(`ID: ${id}`);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}${id}`, config);
  console.log(response);
  return { _id: id };
};

const campgroundService = {
  getCampgrounds,
  addCampground,
  getMyCampgrounds,
  deleteCampground,
};

export default campgroundService;
