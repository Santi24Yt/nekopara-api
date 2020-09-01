const express = require("express");
const app = express();
const path = require('path'); 

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/api", require("./routes/index"))

let port = process.env.PORT || 3000
const listener = app.listen(port, function() {
    console.log("Your app is listening on port " + listener.address().port);
});