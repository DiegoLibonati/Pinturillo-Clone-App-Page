import axios from "axios";

const pinturilloApi = axios.create({
  baseURL: "http://localhost:3001/",
});

export default pinturilloApi;
