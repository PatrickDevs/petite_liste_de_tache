const express   = require("express");
const app       = express();


//Appel aux librairires librairies bootstrap, jquery, et autres fichier static personnaliser.

app.use("/lib/css-0", (req, res) => {
    res.sendFile(__dirname + "/bootstrap/bootstrap.min.css")
} );

app.use("/lib/css-1", (req, res) => {
    res.sendFile(__dirname + "/stylePerso/style.css")
} );

app.use("/lib/js-1", (req, res) => {
    res.sendFile(__dirname + "/JS_Total/bootstrap.min.js")
} );

app.use("/lib/js-2", (req, res) => {
    res.sendFile(__dirname + "/jquery/jquerry.min.js")
} );







module.exports = app;