import React, { Component } from "react";
import Container from "./Container";
import Row from "./Row";
import Col from "./Col";
import Card from "./Card";
import SearchForm from "./SearchForm";
import axios from "axios";

class Search extends Component {
  state = {
    result: [{}],
    search: ""
  };

  async searchTVshows(value) {
   this.setState({result: []} )
   await axios.get("https://episodate.com/api/search?=" + value)
      .then(res => {
        const tvShowFound = res.data.tv_shows.filter(tvShows => tvShows.name.includes(`${value}`));
        const tvId = tvShowFound.map(result => result.id)
        for (let i = 0; i < tvId.length; i++) {
          this.searchDetail(tvId[i]);
        }
      })
      .catch(err => console.log(err));
  };
  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;


    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, search the Episodate API for the value of `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    this.searchTVshows(this.state.search);
  };

  reDirecttoProfile = ()=>{
    window.location.href = "/Profile"
  }


  async searchDetail (id) {
    var newArray = this.state.result;
    

    await axios.get("https://episodate.com/api/show-details?q=" + id)
    .then(res=>{
      newArray.push(res.data.tvShow)     
      this.setState({result: newArray})

    })
  }

  render() {
    const result = this.state.result;

    return (
      <Container>
        <Row>
          <Col size="md-8">
            <Card
              heading={this.state.result.tv_shows || "Search for a TV show to Begin"}
            >


              {this.state.result ? (
                <div className="text-center">
                  <ul className="list-group search-results">
                    {result.map(result => (
                      <li key={result.id} className="list-group-item">{result.name}
                        <p>{result.description}</p>
                        <p>{result.rating}</p>
                        <p>{result.genre}</p>
                        <p>{result.runtime}</p>
                        <img src={result.image_thumbnail_path} />
                        <button onClick={() => this.searchDetail(result.id)}>Detail</button>
                      </li>))}
                  </ul>
                </div>


              ) : (
                  <h3>No Results to Display</h3>
                )}
            </Card>
              <button onClick={this.reDirecttoProfile}>Profile</button>
          </Col>
          <Col size="md-4">
            <Card heading="Search">
              <SearchForm
                value={this.state.search}
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Search;
