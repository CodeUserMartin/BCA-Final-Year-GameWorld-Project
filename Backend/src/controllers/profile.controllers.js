import { User } from "../models/user.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";




// Check username

const checkUsernameAvailibility = async (req, res) => {

    try {
        const { username } = req.query;

        if (!username) {
            throw new ApiError(401, "Username field cannot be empty");
        }

        const dbUsernameexist = await User.findOne({ username });

        if (dbUsernameexist) {
            return res
                .status(200)
                .json({ available: false, message: "Username already taken" });
        }

        return res
            .status(200)
            .json({ available: true, message: "Username is avaiable" });
    } catch (error) {
        console.error("Error checking username", error);
        return res.status(500).json({ available: false, message: "Internal server error" });
    }
};


// User Profile
// Username
// Take profile data from the frontend
// check if username is not empty
// check for the username weather it's unique or not
// check for the logged in user and set the recieved username to their db
// return the username to the frontend once as success save in the db  

// Avatar
//Revieing the selected avatar data-attrubute
// saving that specific avatar to the logged in user in thier db  

// Theme
// Recieving the selected theme data-attribute
// Saving that sepcific selected theme to the logged in user db


// Profile - setup
const userProfile = async (req, res, next) => {


    try {

        // Username

        // Recieving all 3 data from the frontend
        const { username, avatar, theme } = req.body;


        // Check for usernaem empty field
        if (!username) {
            throw new ApiError(401, "Username field is empty");
        }

        // check for username already taken
        const findUserName = await User.findOne({ username });
        if (findUserName) {
            throw new ApiError(403, "Username already Taken");
        }



        // Avatar 

        const validAvatars = ["AI_Companion_(F)", "Cyber_Gladiator_(M)", "Cyber_Samurai_(F)", "Cyberpunk_Hacker_(F)", "Digital_Rogue_(M)", "Digital_Sorceress_(F)", "Mecha_Pilot_(M)", "Mecha_Racer_(F)", "Neon_Brawler_(M)", "Shadow_Rogue_(M)", "Techno_Samurai_(M)", "Turbo_Gamer_(F)"]

        if (!validAvatars.includes(avatar)) {
            throw new ApiError(401, "Invalid Avatar!");
        }


        // Theme

        const validTheme = ["Crimson_Abyss", "Royal_Eclipse", "Midnight_Void", "Mystic_Aurora"];

        if (!validTheme.includes(theme)) {
            throw new ApiError(401, "Invalid Theme!");
        }


        await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    username: username,
                    avatar: avatar,
                    theme: theme
                }
            },
        )

        return res
            .status(200)
            .json(new ApiResponse(200, "Profile set Succesfully"));

    } catch (error) {
        console.error("Error while setting user profile!");
        next(error);
    }
}


// Update profile

const updateProflie = async (req, res, next) => {


    // data coming from the frontend

    try {
        const { avatar, theme } = req.body;


        if (!avatar && !theme) {
            return res.status(400).json(new ApiResponse(400, "No Changes made"));
        }


        // check for valid avatar selection
        const validAvatars = ["AI_Companion_(F)", "Cyber_Gladiator_(M)", "Cyber_Samurai_(F)", "Cyberpunk_Hacker_(F)", "Digital_Rogue_(M)", "Digital_Sorceress_(F)", "Mecha_Pilot_(M)", "Mecha_Racer_(F)", "Neon_Brawler_(M)", "Shadow_Rogue_(M)", "Techno_Samurai_(M)", "Turbo_Gamer_(F)"];

        if (avatar && !validAvatars.includes(avatar)) {
            throw new ApiError(400, "Invalid Avatar Selected");
        }

        // check for valid theme selection
        const validTheme = ["Crimson_Abyss", "Royal_Eclipse", "Midnight_Void", "Mystic_Aurora"];

        if (theme && !validTheme.includes(theme)) {
            throw new ApiError(400, "Invalid Theme selected");
        }

        const updates = {}

        if (avatar) updates.avatar = avatar;
        if (theme) updates.theme = theme;


        // Update the user profile
        await User.updateOne(
            {
                _id: req.user._id
            },
            {
                $set: updates
            }
        )

        return res.status(200)
            .json(new ApiResponse(200, "Profile updated successfully"));
    } catch (error) {
        console.error("Something went wrong during profile Update");
        next(error);
    }
}


export { checkUsernameAvailibility, userProfile, updateProflie }

