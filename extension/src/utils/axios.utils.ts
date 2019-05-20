import axios from "axios";

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
    // authorization: `bearer ${accessToken}`
  },
  timeout: 0
});

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.code === "ECONNABORTED") {
      console.log("Request Time Out. Please try again");
    }
    if (typeof error === "undefined") {
      // when backend server is not available at all
      console.log(
        "We cannot seem to reach our servers. Please check your internet connection and try again"
      );
      return Promise.reject(error);
    } else if (typeof error.response === "undefined") {
      // when request is timeout
      console.log(
        "We cannot seem to reach our servers. Please check your internet connection and try again"
      );
      return Promise.reject(error.response);
    } else if (error.response.status === 401) {
      if(location.pathname === '/redirect'){
        return Promise.reject(error.response);
      }
      location.assign("/logout");
      return Promise.reject(error.response);
    } else if (error.response.status === 403) {
      // console.log("You are not authorized to perform that action");
      return Promise.reject(error.response);
    } else if (error.response.status === 500) {
      console.log(
        "Our system is currently facing a problem. Please check back later"
      );

      return Promise.reject(error.response);
    } else {
      // we don't know what's going on
      return Promise.reject(error.response);
    }
  }
);

export default instance;
