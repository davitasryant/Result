var express = require("express");
var app = express();

app.use(express.static("programming-3"));

app.get("/", function (req, res) {
    res.redirect("index.html");
});

app.listen(3000, function () {
    console.log("Eji");
});

