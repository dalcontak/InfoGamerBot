export const validateEnv = () => {
    if (!process.env.BOT_TOKEN) {
        console.warn("Missing Discrod bot token.");
        return false;
    }

    if (!process.env.MONGO_URI) {
        console.warn("Missing MongoDB connection.");
        return false;
    }

    return true;
}