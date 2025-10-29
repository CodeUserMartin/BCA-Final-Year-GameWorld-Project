import { Router } from "express"
import { checkUsernameAvailibility, userProfile, updateProflie } from "../controllers/profile.controllers.js";
import { verifyJWT } from "../middleware/auth.middleware.js";


const router = Router();


router.route("/").post(verifyJWT, userProfile);

router.route("/check-username").get(verifyJWT, checkUsernameAvailibility);

router.route("/update-profile").post(verifyJWT, updateProflie);


export default router;
