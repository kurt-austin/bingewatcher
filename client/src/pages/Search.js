import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from "../components/jumbotron/";
import API from "../utils/API.js";
function Search() {
    // const [shows, setShows] = useState([])
    // useEffect(() => {
    //     searchShow()
    // }, [])
    // const searchShow = () => {
    //     API.search(query)
    //         .then(res => setShows(shows.filter(shows => shows.name.includes(`${search}`))))
    //         .catch(err => console.log(err))
    return (
        <div className="container">
            <Jumbotron />
            <p> Kurt
                    {/* <input onChange={event => setShows(event.target.value)} />
                    <button onClick={searchShow}> Search</button> */}
            </p>
        </div>
    )
    // }
}
export default Search;