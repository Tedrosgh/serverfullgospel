import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/postControllers.js";

import auth from "../middleware/auth.js";

const router = express.Router();

//http://localhost:5000/posts/

router.get("/", getPosts);
router.post("/", auth, createPost);

router.patch("/:id", auth, updatePost);

//delete route - router.delete
router.delete("/:id", auth, deletePost);

//likePost
router.patch("/:id/likepost", auth, likePost);

export default router;
