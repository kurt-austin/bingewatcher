// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
const Sequelize = require('sequelize');

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      userName: req.user.userName,
      id: req.user.id
    });
  });
  
  // // api routes listen on port 8080 test call
  // app.get("/api/login", (req, res) => {
  //   // Sending back a password, even a hashed password, isn't a good idea
  //   console.log("made it to /api/login route");
  //   res.json({});
  // });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
  // app.get("/api/signup", (req, res) => {
    db.User.create({
      userName: req.body.userName,
      password: req.body.password
      // userName: "un_0123456789",
      // password: "pw_0123456789"
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's userName and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        userName: req.user.userName,
        id: req.user.id
      })
    }
  });

  // Route for deleting user
  // app.get("/api/user_data/:id", (req, res) => {
  app.delete("/api/user_data/:id", (req, res) => {
    const id = req.params.id;
    db.User.destroy({
      where: {
        id
      }
    }).then(function(){
      req.logout();
      res.end();
    }).catch(err => {
      res.status(401).json(err);
    });
  });

  // Route for updating user
  // app.get("/api/user_update", (req, res) => {
  //   let id = 1;
  //   let timeAvailable = 5.5;
  app.put("/api/user_update", (req, res) => {
    let id = req.body.id;
    let timeAvailable = req.body.timeAvailable;
    db.User.update({
      timeAvailable
    },{
      where: {
        id
      }
    }).then(function(){
      res.end();
    }).catch(err => {
      console.log(err);
      res.end();
    });
  });

  //route to get user info by id
  app.get("/api/user_info/:id",async (req,res) => {
    const userId = parseInt(req.params.id);
    try {
      if (!isNaN(userId)) {
        const [results, metadata] = await db.sequelize.query(`
        select 
          u.userName userName, 
          u.timeAvailable timeAvailable, 
          coalesce((select sum(timeBudgeted) from Tv_shows where UserId = u.id and ((runtime*numOfEpisodes)/60) > timeLogged),0) totalBudgeted, 
          case
            when coalesce((select sum(timeBudgeted) from Tv_shows where UserId = u.id and ((runtime*numOfEpisodes)/60) > timeLogged),0) > u.timeAvailable then "OVERBUDGETED"
            when coalesce((select sum(timeBudgeted) from Tv_shows where UserId = u.id and ((runtime*numOfEpisodes)/60) > timeLogged),0) = u.timeAvailable then "FULLYBUDGETED"
            else "UNDERBUDGETED"
          end budgetStatus
        from Users u 
        where u.id = ${userId}`);
        res.json(results);
      } else {
        res.json([])
      }
    } catch (error) {
      console.log("" + error);
      res.json([]);
    }
  });

  //route to get user tv shows by id
  app.get("/api/user_tv_shows/:id",async (req,res) => {
    const userId = parseInt(req.params.id);
    try {
      if (!isNaN(userId)) {
        const [results, metadata] = await db.sequelize.query(`
        select 
          *,
          case
            when coalesce((select sum(timeBudgeted) from Tv_shows where UserId = ${userId} and ((runtime*numOfEpisodes)/60) > timeLogged),0) > (select timeAvailable from Users where id = ${userId}) then "OVERBUDGETED"
            when coalesce((select sum(timeBudgeted) from Tv_shows where UserId = ${userId} and ((runtime*numOfEpisodes)/60) > timeLogged),0) = (select timeAvailable from Users where id = ${userId}) then "FULLYBUDGETED"
            else "UNDERBUDGETED"
          end budgetStatus,
          case
            when ((runtime*numOfEpisodes)/60) <= timeLogged then "COMPLETED"
            else "INPROGRESS"
          end showStatus
        from Tv_shows t
        where t.UserId = ${userId}`);
        res.json(results);
      } else {
        res.json([])
      }
    } catch (error) {
      console.log("" + error);
      res.json([]);
    }
  });

  // route for adding tv show to a user
  app.post("/api/add_tv_show", (req, res) => {
    console.log(req.body.result.id)
    console.log(req.body.result.name);
    console.log(req.body.result.description);
    console.log(req.body.result.image);
    console.log(req.body.result.runtime);
    console.log(req.body.result.numOfEpisodes);
    console.log(req.body.result.rating);
    console.log(req.body.result.genre);
    console.log(req.body.result.timeBudgeted);
    console.log(req.body.result.timeLogged);
    console.log(req.body.result.tvShowID);
    console.log(req.body.result.createdAt);
    console.log(req.body.result.updatedAt)
    console.log(req.body.result.UserId);
    db.Tv_show.create({
      name: req.body.result.name,
      description: req.body.result.description,
      image: req.body.result.image,
      runtime: req.body.result.runtime,
      numOfEpisodes: req.body.result.numOfEpisodes,
      rating: req.body.result.rating,
      genre: req.body.result.genre,
      tvShowID: req.body.result.tvShowID,
      UserId: req.body.result.UserId
  // app.get("/api/add_tv_show", (req, res) => {
      // name: "Cheers",
      // description: "Everybody knows your name!",
      // image: "https://static.episodate.com/images/tv-show/full/4228.jpg",
      // runtime: 30,
      // numOfEpisodes: 100,
      // rating: 8.2,
      // genre: "Family",
      // tvShowID: 4228,
      // UserId: 6
    })
      .then(() => {
        console.log("I made it here")
        res.end();
      })
      .catch(err => {
        console.log(err);
        res.end();
      });
  });

  // Route for deleting tv show from user
  // app.get("/api/remove_tv_show", (req, res) => {
    // const id = 6;
    // const UserId = 6;
  app.delete("/api/remove_tv_show", (req, res) => {
    const id = req.body.id;
    const UserId = req.body.UserId;
    db.Tv_show.destroy({
      where: {
        id,
        UserId
      }
    }).then(function(){
      res.end();
    }).catch(err => {
      console.log(err);
      res.end();
    });
  });

  // Route for updating tv_show
  // app.get("/api/update_tv_show", (req, res) => {
  //   const id = 1;
  //   const UserId = 1;
  //   const timeBudgeted = 1.5;
  //   const timeLogged = 27.5; // 27.5
  app.put("/api/update_tv_show", (req, res) => {
    const id = req.body.id;
    const UserId = req.body.UserId;
    const timeBudgeted = req.body.timeBudgeted;
    const timeLogged = req.body.timeLogged;
    db.Tv_show.update({
      timeBudgeted,
      timeLogged
    },{
      where: {
        id,
        UserId
      }
    }).then(function(){
      res.end();
    }).catch(err => {
      console.log(err);
      res.end();
    });
  });

  //route to get a specific tv show's detail for a user
  app.get("/api/user_tv_show",async (req,res) => {
    const id = req.body.id;
    const UserId = req.body.UserId;
    // const id = 1;
    // const UserId = 1;
    try {
      if (!isNaN(id) && !isNaN(UserId)) {
        const [results, metadata] = await db.sequelize.query(`
        select 
          *,
          case
            when (((runtime*numOfEpisodes)/60) - timeLogged) > 0 then (((runtime*numOfEpisodes)/60) - timeLogged)
            else 0
          end timeLeft,
          case
            when (((runtime*numOfEpisodes)/60) - timeLogged) > 0 then date_format(date_add(curdate(), INTERVAL ceiling((((runtime*numOfEpisodes)/60) - timeLogged)/timeBudgeted) WEEK),'%d/%m/%Y')
            else "ALREADY COMPLETED"
          end estimatedCompletionDate
        from Tv_shows t
        where t.UserId = ${UserId}
          and t.id = ${id}`);
        res.json(results);
      } else {
        res.json([])
      }
    } catch (error) {
      console.log("" + error);
      res.json([]);
    }
  });
};