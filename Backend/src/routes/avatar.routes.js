import { Router } from "express"
import { getAvatar } from "../controllers/avatar.controllers.js"

const router = Router()


router.route("/").get(getAvatar);


export default router