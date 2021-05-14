const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 3000;


const logMethod = (req, res, next) => {
  console.log("Welcome To Logger");
  next();
};

app.use("/users", morgan("combined"));

const users = [];

app.get("/users", logMethod, (req, res, next) => {
  if (users.length === 0) {
    const err = new Error("No Users Found");
    err.status = 404;
    next(err);
  }
});


const logUsers = (req, res, next) => {
  console.log(users);
  next();
};


app.use(logUsers);

app.use(express.json());


app.use((err, req, res, next) => {
  res.status(err.status);
  res.json({
    error: {
      status: err.status,
      message: err.message,
    },
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});