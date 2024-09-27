const express = require("express");
const cors = require("cors");
const { connectToDatabase } = require("./db/connection.js");
const { turnToRegex } = require("./utils/turnToRegex.js");
const { createCriteria } = require("./utils/createCriteria.js");
const path = require("path");

process.on("uncaughtException", function (err) {
    console.error(err);
    console.log("Continuing...");
});

const app = express();

const externalUrl = process.env.RENDER_EXTERNAL_URL;
const port = externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 3000;

let coll;
(async function initDB() {
    coll = await connectToDatabase();
})();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "dist")));

app.post("/search", async (req, res) => {
    try {
        let criteria = req.body.criteria;
        let everything = req.body.everything;
        let input = req.body.input;

        if (criteria.length === 0 && !everything) {
            console.log("No search filters applied.");
            res.status(400).send({ error: "No search filters applied." });
            return;
        }

        if (everything) {
            criteria = createCriteria(input);
        }

        criteria = turnToRegex(criteria);

        if (criteria.length === 0) {
            console.log("No valuable search params given.");
            res.status(400).send({ error: "No valuable search params given." });
            return;
        }

        let data = await coll.find({ $or: criteria }, { projection: { _id: 0 } }).toArray();
        res.send(data);
    } catch (error) {
        console.error(error);
        res.sendStatus(error.status);
    }
});

app.get("/data/movies.csv", (req, res) => {
    res.sendFile(path.join(__dirname, "data/movies.csv"));
});

app.get("/data/movies.json", (req, res) => {
    res.sendFile(path.join(__dirname, "data/movies.json"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/index.html"));
});

app.listen(port, () => {
    console.log("Listening on port 3000");
});
