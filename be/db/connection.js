const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ai3nc8i.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(url);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        const database = client.db("spa");
        return database.collection("movies");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        throw error;
    }
}

module.exports = {
    connectToDatabase,
};
