import router from "express";
import {
  deleteUserProfile,
  getAllUsers,
  getUserProfile,
  updateUserProfile,
} from "./services/users.services.js";
import { checkUserExist } from "../../middlewares/check_user_exist.middleware.js";
const userRouter = router();
userRouter.get("/", getAllUsers);
userRouter.get("/:id/profile", checkUserExist, getUserProfile);
userRouter.patch("/:id", updateUserProfile);
userRouter.delete("/:id", deleteUserProfile);
export default userRouter;
