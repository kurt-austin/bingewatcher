import axios from "axios";

const BASEURL = "https://www.episodate.com/api/search?=";
export default {
    // logout the user
    logout: function () {
        return axios.get("/logout");
    },
    // search for a show to add
    search: function (query) {
        return axios.get(BASEURL + query);
    },
    // Gets all shows
    getShows: function (UserId) {
        return axios.get("api/user_tv_shows/" + UserId);
    },
    // Gets the show with the given id
    loadShow: function (id, UserId) {
        console.log(id, UserId)
        return axios.get("api/user_tv_shows/", { id, UserId });
    },
    // Deletes the user using the user id
    deleteUser: function (UserId) {
        console.log("deleteUser")
        console.log("UserId")
        console.log(UserId)
        return axios.delete("/api/user_data/" + UserId);
    },
    // Deletes the show with the given id
    deleteShow: function (tvShowId) {
        return axios.delete("api/tv_shows/" + tvShowId);
    },
    // Saves user time available selection to userdata
    saveUserSelection: function (user_data) {
        console.log("saveUserSelection");
        console.log("user_data:");
        console.log(user_data);
        return axios.put("api/user_update", user_data);
    },
    // Pulls up user's data
    getUser: function (user_data) {
        return axios.get("api/user_data", user_data);
    },
    // Pulls up user's profile data
    getUserProfile: function (UserId) {
        return axios.get("api/user_info/" + UserId);
    },

    updateUserSelection: function (id, UserId, timeBudgeted, timeLogged) {
        return axios.put("/api/update_tv_show", { id, UserId, timeBudgeted, timeLogged })
    },

    userDetails: function (id, UserId) {
        console.log(id, UserId)
        return axios.get("/api/user_tv_show", { id, UserId })
    }

};