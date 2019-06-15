const express = require('express');

const exphbs = require('express-handlebars');
const mongojs = require('mongojs');
const mongoose = require('mongoose');
const cheerio = require('cheerio');
const axios = require('axios');
const  nprModel = require("./models/npr-model");
const app = express();
const DB = mongojs("Thomas_DB", ['NPR']);


// Set up Handlebars as the default templating engine.

app.use(express.static('public'));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


axios.get("https://www.npr.org/").then(function(response) {
  // cheerio is like jquery
  const $ = cheerio.load(response.data);
  $("h3.title").each(function(i, element) {
    let heading = $(element).text();
    let link = $(element).parent().attr("href");
    let summary = $(element).parent().next().children().text();
    // console.log(heading);

    // const mongoDocument = {
    //   "heading": heading,
    //   "link": link,
    //   "summary": summary
    // };

    const mongooseDocument = {
      "articleTitle": heading,
      "urlLink": link,
      "articleSummary": summary
    };

    const nprData = new nprModel(mongooseDocument);
      nprModel.create(
        nprData
      ).then(function(data){
        res.json(data);
        console.log(data);
      }).catch(function(err){
        res.json({
          "note":"This is bad"
        });
        console.log("This is bad");
      })
  
    console.log("i", i);
    console.log("post", nprData);
    // insert data into mongo database
    db.collection('NPR').insert(
      nprData,
      {w:1},
      function(err, doc) {
        console.log("ERROR",err);
        console.log("DOC", doc);
      }
    );

    // nprData.save( (err, nprData) => {
    //   if (err) return console.error(err);
    //   console.log("Item inserted!");
    // });

  });
  console.log("DONE");
});


app.get("/", (req, res) => {
  DB.NPR.find((err,res) => {
    let hbsObject = {NPR: docs};
    res.render("index", hbsObject);
  });
});

app.put("/:NPR/add-comment", (req, res) => {
  const newComment = req.body;
  NPR.updateOne({
    "ArticleTitle": req.params.articleTitle
  },{
    $set: {
      "name": req.body.name,
      "comment": req.body.comment
    }
  }, () => {
    res.redirect("/:NPR");
    console.log("Comment Added");
  });
});   

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

