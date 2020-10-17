import React from "react";
import searchStyles from "./searchStyles.css";
import { Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

function SearchForm(props) {
  return (
    <form>
      <div className="form-group search-text">
        <label htmlFor="search">Search:</label>
        <input
          onChange={props.handleInputChange}
          value={props.value}
          name="search"
          type="text"
          className="form-control"
          // placeholder="Search For a Movie"
          placeholder="Search for a TV Show"
          id="search"
        />
        <br />
        <Button className="button-pink" onClick={props.handleFormSubmit}>
          Search
        </Button>
      </div>
    </form>
  );
}

export default SearchForm;
