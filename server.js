const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());

//Schema för jobb
const jobSchema = new mongoose.Schema({
    companyname: {
        type: String,
        required: [true, "Du måste fylla i företagsnamn."]
    },
    jobtitle: {
        type: String,
        required: [true, "Du måste fylla i jobbtitel."]
    },
    location: {
        type: String,
        required: [true, "Du måste fylla i plats."]
    },
    description: {
        type: String,
        required: [true, "Du måste fylla i beskrivning."]
    }
});

const Job = mongoose.model("Job", jobSchema);

//Routes
app.use("/api", authRoutes);

app.get("/api", (req, res) => {
    res.json({ message: "Välkommen till min webbtjänst" })
});

//Posta jobb till skyddad route
app.post("/api/jobs", authenticateToken, async (req, res) => {
    try {
        const { companyname, jobtitle, location, description } = req.body;

        //Validera input
        if (!companyname || !jobtitle || !location || !description) {
            return res.status(400).json({ error: "Ogiltig inmatning, fyll i användarnamn och lösenord" });
        }

        //Korrekt input - Skapa användare
        const newJob = new Job({ companyname, jobtitle, location, description });
        await newJob.save();
        res.status(201).json({ message: "Nytt jobb tillagt" });

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

//Hämta jobb från skyddad route
app.get("/api/jobs", authenticateToken, async (req, res) => {
    try {
        // Hämta jobbdata från databasen
        const jobs = await Job.find({});

        // Skicka jobbdata tillbaka till klienten
        res.json(jobs);
    } catch (error) {
        // Hantera eventuella fel
        console.error("Det uppstod ett fel vid hämtning av jobb:", error);
        res.status(500).json({ message: "Det uppstod ett fel vid hämtning av jobb." });
    }
});

//Validering av token
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) res.status(401).json({ message: "Token saknas - du har ej tillgång till denna route" });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) => {
        if (err) return res.status(403).json({ message: "Felaktigt JWT-token" });
        req.username = username;
        next();
    });
}

//Starta applikation
app.listen(port, () => {
    console.log(`Severn är startad på http://localhost:${port}`);
});