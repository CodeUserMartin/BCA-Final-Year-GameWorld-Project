import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
    {
        gameName: {
            type: String,
            required: true,
            unique: true
        },
        gameDescription: {
            type: String,
            required: true
        },
        gameFileName: {
            type: String,
            required: true
        },
        gameCoverImage: {
            type: String,
            required: true
        },
        gameType: {
            type: String,
            enum: ["embedded", "custom"],
            required: true
        }
    },
    {
        timestamps: true
    }
);


export const Games = mongoose.model("Games", gameSchema)