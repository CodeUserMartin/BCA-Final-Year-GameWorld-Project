import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js";


const verifyJWT = async (req, _, next) => {

    try {
        const token = req.cookies?.accessToken || req.headers["authorization"]?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select("-passsword -refreshToken");

        if (!user) {
            throw new ApiError(403, "Invalid Access Token!!");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(400, error?.message || "Invalid Access Token!!")
    }
}

export { verifyJWT }
