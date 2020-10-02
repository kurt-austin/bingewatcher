import axios from "axios";
const BASEURL = "https://www.episodate.com/api/search?=";
export default {
    search: function (query) {
        return axios.get(BASEURL + query);
    }
};