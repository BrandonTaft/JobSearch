import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:8001/api",
  headers: {
    //"Content-type": "application/json",
    //"x-access-token": "Bearer " + localStorage.getItem("jsonwebtoken")
  }
});

// only affects the global instance and instances created afterwards
//axios.defaults.headers.common["x-access-token"] = localStorage.getItem("jsonwebtoken"); 

// immediately affects this instance
axiosInstance.defaults.headers["x-access-token"] = localStorage.getItem("jsonwebtoken");

export default axiosInstance