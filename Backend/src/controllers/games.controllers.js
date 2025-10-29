import { Games } from "../models/game.models.js";
import ApiResponse from "../utils/ApiResponse.js";

const getAllGames = async (req, res, next) => {
    try {
        const games = await Games.find();

        return res
            .status(200)
            .json(new ApiResponse(200, games, "Games fetched sucessfully"));
    } catch (error) {
        next(error);
    }
};

export { getAllGames }