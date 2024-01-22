import axios from "axios";

let refresh = false;
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401 && !refresh) {
      refresh = true;
      console.log(localStorage.getItem("refresh_token"));
      try {
        const response = await axios.post(
              `${BASE_URL}/api/token/refersh/`,
          {
            refresh: localStorage.getItem("refresh_token"),
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data["access"]}`;
          localStorage.setItem("access_token", response.data.access);
          localStorage.setItem("refresh_token", response.data.refresh);
          
          return axios(error.config);
        }
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        throw refreshError;
      } finally {
        refresh = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axios