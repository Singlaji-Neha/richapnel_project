const express = require("express");
// const bodyParser = require("body-parser");
// const session = require("express-session");
// var MemoryStore = require("memorystore")(session);
// const Strip = require("./db/stripe");
const Register = require("./models/registration");
// const { json } = require("express");
// const userService = require("./users/userService");
// const hasPlan = require("./middleware/plan");

const path = require("path");
const hbs = require("hbs");
require("dotenv").config();

require("./db/conn");

const port = process.env.PORT || 3000;

const app = express();
// app.use(
//   session({
//     cookie: { maxAge: 86400000 },
//     saveUninitialized: false,
//     store: new MemoryStore({
//       checkPeriod: 86400000,
//     }),
//     resave: false,
//     secret: "keyboard cat",
//   })
// );
// app.use("/webhook", bodyParser.raw({ type: "application/json" }));
// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));

const public_path = path.join(__dirname, "../public");
const componentsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(public_path));
app.set("view engine", "hbs");
app.set("views", componentsPath);
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/payment",(req,res) => {
  res.render("payment");
});
app.get("/complete", (req, res) => {
  res.render("complete");
});
app.get("/cancel", (req, res) => {
  res.render("cancel");
});

// create new user in db

app.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;
    if (password === cpassword) {
      const newUser = new Register({
        name: req.body.name,
        email: req.body.email,
        password: password,
        confirmpassword: cpassword,
      });

      const registered = await newUser.save();
      res.status(201).render("home");
    } else {
      res.send("Wrong Password");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// login check

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await Register.findOne({ email: email });
    if (user.password === password) {
      res.status(200).render("home");
    } else {
      res.status(400).send("Invalid Email or Password");
    }
  } catch (error) {
    res.status(400).send("Invalid Email Details");
  }
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});


