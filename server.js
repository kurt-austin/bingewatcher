// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies

const express = require("express");
const path = require("path");
const app = express()
const PORT = process.env.PORT || 3001;
// var bodyParse = require("body-parse");


// Requiring passport as we've configured it
//var passport = require("./config/passport");


// Sets up the Express App

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
 
// Requiring our models for syncing

var db = require("./models");

app.use((req,res,next)=>{
  console.log(req.url, req.method, res.statusCode)
  next()
})
app.use(compression())

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// We need to use sessions to keep track of our user's login status
//app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
//app.use(passport.initialize());
//app.use(passport.session());




// Static directory
app.use(express.static("public"));

// Routes

// require("./routes/html-routes.js")(app);
// require("./routes/api-routes.js")(app);
// require("./routes/")(app);

// Syncing our sequelize models and then starting our Express app

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening at http://localhost:" + PORT);
  });
});