import express from "express";
import * as db from "./data/database.js";

const app = express();
app.use(express.json());
const port = 3080;

app.listen(port, () => {
  console.log("server is running on port " + port);
});

app.get("/posts", (_, res) => {
  res.status(200).json(db.getAllPosts());
});

app.get("/posts/:id", (req, res) => {
  const id = +req.params.id;
  const post =
    db.getPostById(id) ??
    res.status(404).json({ error: "Poszt nem található" });
  res.status(200).json(post[0]);
});

app.post("/posts", (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "Poszt adat hiány" });
  }
  db.createNewPost(title, content);
  res.status(201).json(db.getAllPosts().pop().id);
});

app.delete("/posts/:id", (req, res) => {
  const id = +req.params.id;
  const post = db.getPostById(id);
  if (!post) return res.status(404).json({ error: "Poszt nem található" });

  db.deletePostById(id);
  return res.status(204).json();
});
