const express = require("express");
const cors = require("cors");
const axios = require("axios").default;
const app = express();
const ctrl = require("./controller");
const path = require("path");


const XSLX = require("xlsx");
const Chartist = require("chartist");

app.use(express.json())
app.use(cors());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.use(express.static(path.join(__dirname, "/client")));
// app.use(express.static(path.join(__dirname, "../")));

const port = process.env.PORT || 5400;

app.get("/main", ctrl.connect);
app.get("/reset", ctrl.reset);
app.put('/formatsids', ctrl.generateClick)
app.get('/getdb', ctrl.db)
app.put('/update', ctrl.update)

app.listen(port, () => {
  console.log(
    `FBI listening on port ${port}. Agents beginning tracking now...`
  );
});
