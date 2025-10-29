const avatarPath = [
    "AI_Companion_(F)", "Cyber_Gladiator_(M)", "Cyber_Samurai_(F)", "Cyberpunk_Hacker_(F)", "Digital_Rogue_(M)", "Digital_Sorceress_(F)", "Mecha_Pilot_(M)", "Mecha_Racer_(F)", "Neon_Brawler_(M)", "Shadow_Rogue_(M)", "Techno_Samurai_(M)", "Turbo_Gamer_(F)"
];


const getAvatar = async (req, res) => {

    const avatarBaseURL = "http://localhost:4000/avatars"

    const avatars = avatarPath.map(name => ({
        name: name,
        url: `${avatarBaseURL}/${name}.jpg`
    }));

    res.status(200).json(avatars);

}


export { getAvatar }