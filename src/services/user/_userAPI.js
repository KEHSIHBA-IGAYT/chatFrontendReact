import axios from "axios";
import config from "../../config/config.json";

const APP_URL = config.SERVER_BASE_URL;
const APP_API_VERSON = config.SERVER_API_VER;

const userAPI = {
    getUser: async () => {
        const headers = [];
        headers["Content-Type"] = "application/json";
        const options = {
            method: "GET",
            headers,
            url: `${APP_URL}/${APP_API_VERSON}/user/getUser`
        };
        const response = await axios(options);

        return handleResponse(response);
    },

    setUser: async ({ userID, userName }) => {
        console.log(userID);
        console.log(userName);
        const headers = [];
        headers["Content-Type"] = "application/json";
        const options = {
            method: "POST",
            data: { userID, userName },
            url: `${APP_URL}/${APP_API_VERSON}/user/setUser`
        };
        const response = await axios(options);

        return handleResponse(response);


    },

    clearUser: async () => {
        const headers = [];
        headers["Content-Type"] = "application/json";
        const options = {
            method: "DELETE",
            headers,
            url: `${APP_URL}/${APP_API_VERSON}/user/clearUser`
        };
        const response = await axios(options);

        return handleResponse(response);


    }
};

const handleResponse = (response) => {
    const data = response.data;

    if (response.status === 404) {
        //window.location.reload(true);
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    return data;
}

export default userAPI;