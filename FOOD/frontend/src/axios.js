// import axios from "axios";

// const instance = axios.create({
//     baseURL: "http://localhost:8080",
// });

// export default instance;

import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080", // Fallback to localhost if the env variable is missing
});

export default instance;
