import axios from "axios";
const instance = axios.create({
  baseURL: "https://swaggerbankinholland.herokuapp.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
export default instance;