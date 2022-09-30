const express = require("express");
const bodyParser = require("body-parser");

const app = express();
var items = ["Buy Food", "Cook Food", "Eat Food"];
var workitems = [" "];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  var today = new Date();

  var option = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  var day = today.toLocaleDateString("en-In", option);

  res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", function (req, res) {
  var item = req.body.newitem;

  if (req.body.list === "work") {
    workitems.push(item);
    res.redirect("/work");
  }
   else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", {
    listTitle: "Worrking List",
    newListItems: items,
    workitems,
  });
});

app.post("/work", function (res, req) {
  var item = req.body.newitem;

  workitems.push(item);

  res.redirect("/work");
});

app.listen(3000, function () {
  console.log("server is running port 3000");
});
