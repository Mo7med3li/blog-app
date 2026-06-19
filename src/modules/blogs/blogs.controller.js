import router from "express";

import {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} from "./services/blogs.services.js";

const blogRouter = router();
blogRouter.get("/", getAllBlogs);
blogRouter.get("/:id", getSingleBlog);
blogRouter.post("/", createBlog);
blogRouter.put("/:id", updateBlog);
blogRouter.delete("/:id", deleteBlog);
export default blogRouter;
