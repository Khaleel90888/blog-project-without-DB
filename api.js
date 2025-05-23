import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const posts = [
  {
    id: 1,
    post: "The Rise of AI",
    description: "An overview of how artificial intelligence is transforming industries.",
    writer: "Alice Johnson",
    date: "2025-05-01"
  },
  {
    id: 2,
    post: "Healthy Eating Tips",
    description: "Simple and effective ways to maintain a balanced diet.",
    writer: "David Lee",
    date: "2025-04-28"
  },
  {
    id: 3,
    post: "Traveling on a Budget",
    description: "How to explore the world without breaking the bank.How to explore the world without breaking the bank.How to explore the world without breaking the bank.How to explore the world without breaking the bank.How to explore the world without breaking the bank.How to explore the world without breaking the bank.",
    writer: "Samantha Chen",
    date: "2025-03-15"
  }
];

let lastId = 3;

// Get all posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// Get single post
app.get("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((p) => p.id === id);
  if (post) return res.json(post);
  res.status(404).json({ error: "Post not found" });
});

// Create new post
app.post("/posts", (req, res) => {
  lastId++;
  const newPost = {
    id: lastId,
    post: req.body.post,
    description: req.body.description,
    writer: req.body.writer,
    date: new Date().toISOString().slice(0, 10)
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// Update post (PATCH)
app.patch("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Post not found" });

  const postObj = posts[index];
  const updatedPost = {
    id,
    post: req.body.post || postObj.post,
    description: req.body.description || postObj.description,
    writer: req.body.writer || postObj.writer,
    date: postObj.date
  };
  posts[index] = updatedPost;
  res.json(updatedPost);
});

// Replace post (PUT)
app.put("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Post not found" });

  const updatedPost = {
    id,
    post: req.body.post,
    description: req.body.description,
    writer: req.body.writer,
    date: new Date().toISOString().slice(0, 10)
  };
  posts[index] = updatedPost;
  res.json(updatedPost);
});

// Delete post
app.delete("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).send("Post not found");

  posts.splice(index, 1);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`);
});
