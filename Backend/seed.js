import mongoose from "mongoose";
import dotenv from "dotenv";
import { Games } from "./src/models/game.models.js";

dotenv.config();

const games = [{
  
  "gameName": "Flappy-Bird",
  "gameDescription": "Fly between pipes without hitting them!",
  "gameFileName": "/games/flappy-birds/index.html",
  "gameCoverImage": "thumbnails/flappy-bird.jpg",
  "gameType": "custom"
},
{
  
  "gameName": "Shape-Dodger",
  "gameDescription": "Dodge the falling shapes and survive!",
  "gameFileName": "/games/Shape-dodger/index.html",
  "gameCoverImage": "thumbnails/shape-dodger.jpg",
  "gameType": "custom"
},
{
 
  "gameName": "Catch-the-Falling-Apples",
  "gameDescription": "Move the basket to catch all the apples!",
  "gameFileName": "/games/Catch-the-falling-apples/index.html",
  "gameCoverImage": "thumbnails/catch-the-falling-apples.jpg",
  "gameType": "custom"
},
{
  
  "gameName": "Ball-bounce",
  "gameDescription": "Keep the ball bouncing and don’t let it drop!",
  "gameFileName": "/games/Ball-bounce/index.html",
  "gameCoverImage": "thumbnails/ball-bounce.jpg",
  "gameType": "custom"
},
{
  
  "gameName": "Pac-Man",
  "gameDescription": "Classic maze arcade game with ghosts.",
  "gameFileName": "https://www.retrogames.cc/embed/9409-pac-man-plus.html",
  "gameCoverImage": "thumbnails/pac-man.jpg",
  "gameType": "embedded"
},
{
  
  "gameName": "Racing Beat World",
  "gameDescription": "Fast-paced retro racing arcade game.",
  "gameFileName": "https://www.retrogames.cc/embed/9607-racing-beat-world.html",
  "gameCoverImage": "thumbnails/racing-beat-world.jpeg",
  "gameType": "embedded"
},
{
 
  "gameName": "Power Rangers Dino Thunder",
  "gameDescription": "Action-packed Power Rangers adventure.",
  "gameFileName": "https://www.retrogames.cc/embed/27872-power-rangers-dino-thunder-u-venom.html",
  "gameCoverImage": "thumbnails/power-rangers-dino-thunder.jpeg",
  "gameType": "embedded"
},
{
  
  "gameName": "Legends of Iron Fist",
  "gameDescription": "Classic fighting game with powerful characters.",
  "gameFileName": "https://www.retrogames.cc/embed/7830-art-of-fighting-ryuuko-no-ken-ngm-044-ngh-044.html",
  "gameCoverImage": "thumbnails/Legends-of-iron-fist.jpg",
  "gameType": "embedded"
},
{
 
  "gameName": "Super Bike Hero",
  "gameDescription": "Speed your way to glory in this retro bike race.",
  "gameFileName": "https://www.retrogames.cc/embed/9608-racing-hero-fd1094-317-0144.html",
  "gameCoverImage": "thumbnails/super-bike-hero.jpg",
  "gameType": "embedded"
},
{
  
  "gameName": "Sonic the Hedgehog",
  "gameDescription": "Speedy blue hedgehog saving the world!",
  "gameFileName": "https://www.retrogames.cc/embed/30899-sonic-the-hedgehog-usa-europe.html",
  "gameCoverImage": "thumbnails/sonic-the-hedgehog.jpg",
  "gameType": "embedded"
},
{
  
  "gameName": "Pokemon AlteRed",
  "gameDescription": "A wild Pokémon shooter twist!",
  "gameFileName": "https://www.retrogames.cc/embed/46746-pokemon-altered-with-gun-v2-5.html",
  "gameCoverImage": "thumbnails/pokemon-altered.jpg",
  "gameType": "embedded"
},
{
 
  "gameName": "Track Field 2000",
  "gameDescription": "Summer Olympics track and field simulator.",
  "gameFileName": "https://www.retrogames.cc/embed/27318-international-track-field-summer-games-europe.html",
  "gameCoverImage": "thumbnails/track-field-2000.jpg",
  "gameType": "embedded"
}];

async function seedGames() {
  try {
    console.log("🚀 Connecting to MongoDB...");
    await mongoose.connect(`${process.env.DATABASE_URL}/game-world`);

    const count = await Games.countDocuments();
    if (count === 0) {
      await Games.insertMany(games);
    //   console.log("🌱 Game data seeded successfully!");
    } else {
    //   console.log(`✅ ${count} games already exist — skipping seeding.`);
    }

    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seedGames();
