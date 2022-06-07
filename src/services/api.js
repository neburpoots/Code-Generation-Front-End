import axios from "axios";
const instance = axios.create({
  baseURL: "https://swaggerbankinholland.herokuapp.com/",
  headers: {
    "Content-Type": "application/json",
  },
});
export default instance;