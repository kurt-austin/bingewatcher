// Pie Chart package information: https://www.npmjs.com/package/react-minimal-pie-chart

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Jumbotron from "../components/Jumbotron";
import API from "../components/utils/API.js";
import { PieChart } from 'react-minimal-pie-chart';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';


function Details() {

    const [show, setShow] = useState({})
    const [user, setUser] = useState(null)

    useEffect(() => {
        loadShow()
    }, [])


    const { id } = useParams()
    useEffect(() => {
        API.getUser()
            .then(res => setUser(res.data))
            .catch(err => console.log(err));
    }, [])

    function loadShow() {
        API.loadShow()
            .then(res => {
                console.log(res.data)
                setShow(res.data)
            })
            .catch(err => console.log(err));
    };

    function deleteShow(tvShowId) {
        API.deleteShow(tvShowId)
            .then(res => loadShow())
            .catch(err => console.log(err));
    }
   
    return (
        <div className="container">
            <pre>{JSON.stringify(user, null, 2)} </pre>
            <div className="row">
                <div className="col-xs-6 col-md-6">
                    <Card>
                        <Card.Img variant="top" src={show.image} />
                        <Card.Body>
                            <Card.Title> Show Name: {show.name} </Card.Title>
                            <Card.Text>
                                {show.description}
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>Genre: {show.genre} </ListGroupItem>
                            <ListGroupItem> Number of Episodes: {show.numOfEpisodes}</ListGroupItem>
                            <ListGroupItem> Rating: {show.rating}</ListGroupItem>
                            <ListGroupItem> Runtime: {show.runtime}</ListGroupItem>
                            <ListGroupItem> Time logged: {show.timeLogged} </ListGroupItem>
                            <ListGroupItem> Time budgeted: {show.timeBudgeted}</ListGroupItem>
                        </ListGroup>
                        <Card.Body>
                            <Card.Link onClick= {deleteShow}>Delete Show</Card.Link>
                            <Card.Link >Update Show</Card.Link>
                            
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-xs-6 col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Time Breakdown</h5>
                            <PieChart
                                data={[
                                    // { title: 'How much time left in your week', value: {shows.}, color: '#E38627' },
                                    { title: 'How much time budgeted this show', value: show.timeLeft, color: '#C13C37' },
                                    { title: 'How much time logged for this show', value: show.timeLogged, color: '#6A2135' },
                                ]}
                            />;
                        </div>
                    </div>
                </div>
            </div >
        </div >




    );

};

export default Details; 