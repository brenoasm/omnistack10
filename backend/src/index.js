const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

const port = 3333;

mongoose.connect(
  "mongodb+srv://admin:admin@cluster0-rim2k.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(routes);

app.listen(port);
