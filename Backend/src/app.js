import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
dotenv.config();


const app = express()


// App/Server Config
app.use(cors({ origin: process.env.CROSS_ORIGIN, credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/avatars", express.static("public/avatar"))
app.use("/thumbnails", express.static("public/thumbnails"))
app.use("/game-folder", express.static("public/game-folder"))


// cookie-parser config
app.use(cookieParser())



// Import Routes
import userRoutes from "./routes/user.routes.js"
import profileRoutes from "./routes/profile.routes.js"
import avatarRoutes from "./routes/avatar.routes.js"
import gameRoutes from "./routes/game.routes.js"
import { errorHandler } from "./middleware/errorHandler.middleware.js";


// Declare Routes

app.use("/api/v1/users", userRoutes);
app.use("/api/v2/profile", profileRoutes);
app.use("/api/v3/avatars", avatarRoutes);
app.use("/api/v4/games", gameRoutes);




app.use(errorHandler);


export { app }