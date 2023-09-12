import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

export const signup = (name, username, password, role) => {
    return axios.post(API_URL + "signup", {
        name,
        username,
        password,
        roles: [role],
    });
};

export const signin = (username, password) => {
    return axios
        .post(API_URL + "signin", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
}

export const signout = () => {
    localStorage.removeItem("user");
}

