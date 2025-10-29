import { Router } from "express"
import { getAllGames } from "../controllers/games.controllers.js"

const router = Router()

router.get("/", getAllGames);

export default router;