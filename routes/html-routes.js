// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
const { runInNewContext } = require("vm");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      console.log("req.user1 "+ req.user)
      // res.redirect("/members");
      // res.redirect("/index");
       res.redirect("/beersearch");
    }
    res.render("signup")
    // .catch(function() {
    //   console.log("catch");
    // })
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      console.log("req.user2 "+ req.user)
      // res.redirect("/members");
      // res.redirect("/index");
       res.redirect("/beersearch");
    }
    res.render("login")
  });