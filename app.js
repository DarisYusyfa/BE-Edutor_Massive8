if (process.env.NODE_ENV !== "production") require("dotenv").config();
const express = require("express");
const router = require("./routes/index");
const app = express();
const port = 5190;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log("listening on port:", port);
});
