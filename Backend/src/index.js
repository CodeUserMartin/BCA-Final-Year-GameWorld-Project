import dotenv from "dotenv"
import conectionDB from "./db/connection.db.js"
import { app } from "./app.js";

dotenv.config();


conectionDB()
    .then(() => {
        app.listen(process.env.PORT || 4000, () => {
            console.log(`Server is live at: http://localhost:${process.env.PORT}`)
        });
    }).catch((error) => {
        console.error("Connection failed at MongoDb", error);
    })