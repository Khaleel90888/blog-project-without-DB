import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import path from "path";

const app = express();
const port = 3000;
const api_url = "http://localhost:4000";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${api_url}/posts`);
    res.render("index", { posts: response.data });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.get("/create-post", (req, res) => {
  res.render("modify", {
    heading: "Create New Post",
    submit: "Create Post",
    post: null,
  });
});

app.get("/edit-post/:id", async (req, res) => {
  try {
    const response = await axios.get(`${api_url}/posts/${req.params.id}`);
    res.render("modify", {
      heading: "Edit Post",
      submit: "Update Post",
      post: response.data,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/posts", async (req, res) => {
  try {
    await axios.post(`${api_url}/posts`, req.body);
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/posts/:id", async (req, res) => {
  try {
    await axios.patch(`${api_url}/posts/${req.params.id}`, req.body);
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/posts/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${api_url}/posts/${req.params.id}`);
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Frontend server running on http://localhost:${port}`);
});
