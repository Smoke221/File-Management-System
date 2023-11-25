const express = require("express");
const { connection } = require("./configs/db");
const { fileRouter } = require("./routes/file");

const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/home", (req, res) => {
  res.send(
    `<h1>Congratulations! 🎉</h1><p>You've entered file storage application. Enjoy your experience!</p>`
  );
});

app.use("/file", fileRouter);

connection;

module.exports = {
  app,
};
