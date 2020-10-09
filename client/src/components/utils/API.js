import axios from "axios";

const BASEURL = "https://www.episodate.com/api/search?=";
export default {
    search: function (query) {
        return axios.get(BASEURL + query);
    },
    // Gets all shows
    getShows: function () {
        return axios.get("api/user_tv_shows/1");
    },
    // Gets the show with the given id
    loadShow: function (tvShowId) {
        return axios.get("api/tv_shows/" + tvShowId);
    },
    // Deletes the user using the user id
    deleteUser: function (UserId) {
        console.log("deleteUser")
        return axios.delete("/api/user_data/" + 1);
    },
    // Deletes the show with the given id
    deleteShow: function (tvShowId) {
        return axios.delete("api/tv_shows/" + tvShowId);
    }, 
    // Saves user time available selection to userdata
    saveUserSelection: function(user_data) {
        return axios.put("api/user_update", user_data);
      },
    // Pulls up user's data
    getUser: function(user_data) {
        return axios.get("api/user_data", user_data);
      },
    

};