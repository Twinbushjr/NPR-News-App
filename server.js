
const express = require("express");
const mongoose = require("mongoose");
const expressHandlebars = require("express-handlebars");
const bodyParser = require("body-parser");

//set up port to be either host's designated port or 3000
const PORT = process.env.PORT || 3000;

//Initiate express app
const app = express();

//set up express router
const router = express.Router();

//Require routes files pass router object
require("./config/routes")(router);

//designate public folder as a static directory
app.use(express.static(__dirname + "/public"));

//connect handlebars to express app
app.engine("handlebars", expressHandlebars({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//use bodyparser 
app.use(bodyParser.urlencoded({
  extended: false
}));

//have requests go through router middleware
app.use(router);

//If deployed, use the deployed database; otherwise, use the local mongoHeadlines DB
const db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//Connect mongoose to the database
mongoose.connect(db, {
  useNewUrlParser: true
},
  function (error) {
    if (error) {
      console.log(error);
    }
    else {
      console.log("mongoose connection is successful");
    }
  });

app.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

