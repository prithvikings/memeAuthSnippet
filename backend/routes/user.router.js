import { Router } from "express";
import  {registerUser,loginUser, logoutUser}  from "../controllers/auth.controllers.js";
import {getProfile}  from "../controllers/user.controllers.js";
import {checkAuth} from "../middleware/checkauth.js"

const userRouter = Router();

// Example route
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout",logoutUser);
userRouter.get("/profile", checkAuth ,getProfile);

export default userRouter;