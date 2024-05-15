// backend/server.js
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const db = require("./db");
require("express-async-errors");
const userRoutes = require("./controllers/user.controller");
const cors = require("cors");

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);

app.use((err, req, res, next) => {
  //even if the req and next params are not used you need to declare

  res.status(err.status || 500).send("Something went wrong!");
});

db.query("SELECT 1")
  .then(() => {
    console.log("db connection succeded");
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
