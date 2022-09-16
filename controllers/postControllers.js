import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("No post id with this id!");
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { ...post, _id },
      { new: true }
    );

    res.status(201).json(updatedPost);
  } catch (error) {
    res.status(409).json({ message: error });
  }
};

//delete
//findByIdAndRemove(id)
export const deletePost = async (req, res) => {
  try {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("No post id with this id!");
    }

    await PostMessage.findByIdAndRemove(_id);

    res.status(201).json({ message: "Post deleted!" });
  } catch (error) {
    res.status(409).json({ message: error });
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params; //123

  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: id`);

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    //like post
    post.likes.push(req.userId);
  } else {
    //dislije the post
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const likedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(likedPost);
};
