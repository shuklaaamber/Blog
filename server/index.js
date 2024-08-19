const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const UserModel = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");
const PostModel = require("./models/Post");

const app = express();

const upload = multer({ dest: "uploads" });

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(express.json());
app.use(cookieParser());

const salt = bcrypt.genSaltSync(1);
const secret = "amber";

mongoose.connect("mongodb://127.0.0.1:27017");

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json({ data: user });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  const loggedIn = bcrypt.compareSync(password, user.password);
  //   res.json({ data: loggedIn });
  if (loggedIn) {
    jwt.sign({ username, id: user._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: user._id,
        username,
      });
    });
  } else {
    res.status(400).json("Wrong credentials!");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/post", upload.single("files"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  const { title, summary, content } = req.body;
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    const postDoc = await PostModel.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json(postDoc);
  });
});

app.put("/post/:id", upload.single("files"), async (req, res) => {
  let newPath;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    const { title, summary, content } = req.body;
    const { id } = req.params;

    const postDoc = await PostModel.findById(id);

    const isAuthor =
      JSON.stringify(postDoc?.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json("Unauthorised", postDoc, info);
    }
    await postDoc.updateOne({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });
    res.json(postDoc);
  });
});

app.get("/post", async (req, res) => {
  const posts = await PostModel.find().populate("author", ["username"]);
  res.json(posts);
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await PostModel.findById(id).populate("author", ["username"]);
  res.json(postDoc);
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
