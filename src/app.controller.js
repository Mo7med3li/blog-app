import express from "express";
import authRouter from "./modules/auth/auth.controller.js";
import blogRouter from "./modules/blogs/blogs.controller.js";
import userRouter from "./modules/users/users.controller.js";
export default function bootstrap() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // api routes
  app.use("/auth", authRouter);
  app.use("/blogs", blogRouter);
  app.use("/users", userRouter);

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}
