const express = require("express");
const { connection } = require("./configs/db");
const { fileRouter } = require("./routes/file");

const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(
    `<h1>Congratulations! 🎉</h1><p>You've entered our secure zone. Enjoy your experience!</p>`
  );
});

app.use("/file", fileRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log(err.message);
  }
  console.log(`Server is running at port ${process.env.PORT}`);
});
