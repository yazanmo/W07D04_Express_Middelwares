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


// Practice
//q1
const usersRouter = express.Router();
usersRouter.use((req, res, next) => {
    res.json(users);
    console.log(users);
    next();
});
app.use("/users",usersRouter)

//q2
const logUser = (req,res,next)=>{
    console.log(req.body);
}
app.post("/users/create",(req,res,next)=>{
    const addUser = req.body.name;
    users.push(addUser)
    next()
},logUser)

//q3
const productsRouter = express.Router();
productsRouter.use((req, res, next) => {
    console.log("hello from products");
});
app.use("/products", productsRouter)

//q4 
const products = [`keyboard`, `mouse`];
app.put("/products/update", (req,res,next)=>{
    const replacement = req.body.product;
    products.splice(1,1,replacement);
    next();
})

app.get("/users", (req, res, next) => {
    res.json(users);
});

//q5
const pRouter = (req,res,next)=>{
    console.log("/products",req.path);
    next()
}
app.use("/products", pRouter);

//q6
app.use("*",(req,res,next)=>{
    const err = new Error("page doesn't exist")
    err.status = 404
    next(err)
    
})
app.use((err,req,res,next)=>{
    res.status(err.status);
    res.json("NOT FOUND");
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});