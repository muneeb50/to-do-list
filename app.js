//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const utilityModule = require(__dirname + "/utilityModule.js");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


var itemsList = ['Eat', 'Sleep', 'Code'];
var workItems = [];

app.get("/", (req, res) => {
  console.log('Request GET : /');

  let currentDay = utilityModule.getDate();

  res.render('list', {
    listTitle: currentDay,
    itemsList: itemsList
  });
});

app.post("/", (req, res) => {
  console.log('Request POST : /');

  let item = req.body.newItem;

  if (req.body.list === "Work List") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    itemsList.push(item);
    res.redirect("/");
  }
});

app.get("/work", (req, res) => {
  console.log('Request GET : /work');

  res.render("list", {
    listTitle: "Work List",
    itemsList: workItems
  });
});

app.post("/work", (req, res) => {
  conole.log('Request POST : /work');

  let workItem = req.body.newItem;
  workItems.push(workItem);

  res.redirect("/work");
});

app.listen(3000, function() {
  console.log('Server started on port 3000');
});
