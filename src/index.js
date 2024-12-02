const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = 3000;
const collection = require("./config");
//use EJS as view engine
app.set("view engine", "ejs");

//use static files
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("login");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.name,
    password: req.body.password,
  };
  const existingUser = await collection.findOne({ name: data.name });
  if (existingUser) {
    console.log("User already exists");
    res.send("User already exists");
  } else {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    const userData = await collection.insertMany(data);
    console.log(userData);
  }
});

app.post("/login", async (req, res) => {
  try {
    const checkUser = await collection.findOne({ name: req.body.name });
    if (!checkUser) {
      console.log("User not found");
      res.send("User not found");
    } else {
      const result = await bcrypt.compare(
        req.body.password,
        checkUser.password
      );
      if (result) {
        res.render("home");
      } else {
        res.send("Invalid password, try again");
      }
    }
  } catch {
    res.send("Something went wrong");
  }
});
app.listen(port, () => {
  console.log(`Server is running on : ${port}`);
});
