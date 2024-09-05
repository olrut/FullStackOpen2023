const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
require("express-async-errors");
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const user = request.user;

  if (!user) {
    return response.status(401).json({
      error: "Unauthorized.",
    });
  }

  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes,
    user: user.id,
    comments: [],
  });

  if (!blog.title || !blog.url) {
    return response.status(400).json({
      error: "Bad Request. Missing title or url.",
    });
  }

  if (!blog.likes) {
    blog.likes = 0;
  }

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const user = request.user;

  if (!user) {
    return response.status(401).json({
      error: "Unauthorized.",
    });
  }

  const blog = await Blog.findById(request.params.id);

  if (blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({
      error: "Unauthorized. Only logged in user can delete blogs.",
    });
  }

  user.blogs = user.blogs.filter(
    (b) => b.id.toString() !== request.params.id.toString(),
  );
  await user.save();

  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    id: body.id,
    comments: body.comments,
  };

  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  const updatedNote = await Blog.findById(request.params.id);
  response.json(updatedNote);
});

module.exports = blogsRouter;