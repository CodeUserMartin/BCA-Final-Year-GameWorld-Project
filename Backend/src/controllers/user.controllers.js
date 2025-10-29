import { User } from "../models/user.models.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"



// AccessToken and RefreshToken Generation Function
const generateAccessTokenAndRefreshToken = async (userId) => {

    try {

        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };

    } catch (error) {
        console.error("Error while generating Access Token and Refresh Token!!");
        throw new ApiError(401, "Error while generating AccessToken and RefreshToken");
    }
}


// Signup Handler
const userSignUp = async (req, res, next) => {

    try {

        // Getting Sign up data from frontend
        const { name, email, password } = req.body;

        // Check if the data recieved in not empty
        if (!name || !email || !password) {
            throw new ApiError(400, "All Fields are Required");
        }


        // Check for if user already exisits
        const exisitingUser = await User.findOne({ email })
        if (exisitingUser) {
            throw new ApiError(401, "User Already Exists");
        }

        // // Create an User Object in the database.
        const newUser = await User.create({
            name,
            email,
            password,
        });

        const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(newUser._id);


        const { password: userPassword, refreshToken: userRefreshToken, ...userDetails } = newUser.toObject();

        const options = {
            httpOnly: true,
            secure: true,
        }

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(new ApiResponse(200, "Account created!", userDetails));
    }
    catch (error) {
        next(error);
    }
}



// Login Handler
const userLogin = async (req, res, next) => {

    try {

        const { email, password } = req.body;

        // Check for empty data
        if (!email || !password) {
            throw new ApiError(400, "All fields are required");
        }


        // Finding, if user exists 
        const findUser = await User.findOne({ email });
        if (!findUser) {
            throw new ApiError(404, "User not found");
        }


        // Compare Password
        const comparePassword = await findUser.isPasswordCorrect(password);

        if (!comparePassword) {
            throw new ApiError(401, "Invalid Password");
        }

        const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(findUser._id);


        // Return the user as logged in.
        const { password: userPassword, refreshToken: userRefreshToken, ...userDetails } = findUser.toObject();

        const options = {
            httpOnly: true,
            secure: true,
        }

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(new ApiResponse(200,
                {
                    user: userDetails, accessToken, refreshToken
                },
                "User Logged In Successfully"
            ))
    }
    catch (error) {
        next(error);
    }
}

// Logout handler
const userLogout = async (req, res, next) => {

    try {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    refreshToken: ""
                }
            },
        )

        const options = {
            httpOnly: true,
            secure: false,
        }

        return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json(new ApiResponse(200, {}, "User Logged out!"))
    } catch (error) {
        next(error);

    }
}


export { userSignUp, userLogin, userLogout }


