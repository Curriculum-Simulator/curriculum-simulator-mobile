import axios from "axios";

/* Creating a new instance of axios with a base url and headers. */
export default axios.create({
    baseURL: "https://curriculum-simulator.onrender.com/api",
    headers: {
        "Content-type": "application/json"
    }
});