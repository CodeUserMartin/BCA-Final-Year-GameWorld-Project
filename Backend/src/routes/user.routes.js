import { Router } from "express"
import { userSignUp, userLogin, userLogout } from "../controllers/user.controllers.js"
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()


router.route("/signup").post(userSignUp);
router.route("/login").post(userLogin);
router.route("/logout").post(verifyJWT, userLogout);

export default router
