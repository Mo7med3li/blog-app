import router from "express";
import { signupService, loginService } from "./services/auth.services.js";
const authRouter = router();
authRouter.post("/signup", signupService);
authRouter.post("/login", loginService);
export default authRouter;
