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

  async saveToList ({result}) {
   console.log({result})
   console.log(result.name);
   result.UserId=1;
   console.log(result.UserId);
   
  //  Here is where I call the API and then I need to create a post/create method
  // in that file.
    await axios.post("/api/add_tv_show", {result})
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
      
    });

    
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
                      <>
                      <h3>{result.name}</h3>
                      <li key={result.id} className="list-group-item">
                        <p>{result.description}</p>
                        {/* <p>{result.rating}</p>
                        <p>{result.genre}</p>
                        <p>{result.runtime}</p>
                        <p>{result.numOfEpisodes}</p>
                        <p>{result.UserId}</p> */}
                        <img src={result.image_thumbnail_path} />
                        <br/>
                        <br/>
                        <button onClick={() => this.saveToList({result})}>Save</button>
                      </li>
                      </>))}
                  </ul>
                </div>


              ) : (
                  <h3>No Results to Display</h3>
                )}
            </Card>
              <br/>
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
