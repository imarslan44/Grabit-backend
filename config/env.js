import { config } from "dotenv";

const envFile= process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";

config({path: envFile})

export const { PORT, DB_URI, JWT_SECRET, JWT_EXPIRATION, CLOUDINARY_API_KEY, CLOUDINARY_SECRET_KEY, CLOUDINARY_NAME} = process.env;
