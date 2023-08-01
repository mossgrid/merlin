import dotenv from 'dotenv'
dotenv.config()

export const ENV = {
    TOKEN: process.env.DISCORD_BOT_TOKEN,
    AI_TOKEN: process.env.OPENAI_API_KEY,
    CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    GUILD_ID: process.env.GUILD_ID
}
