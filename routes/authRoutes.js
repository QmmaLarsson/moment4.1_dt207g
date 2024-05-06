const express = require("express");
const router = express.Router();

//Lägg till ny användare
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        //Validera input
        if (!username || !password) {
            return res.status(400).json({ error: "Ogiltig inmatning, fyll i användarnamn och lösenord" })
        }

        //Korrekt input - Skapa användare
        res.status(201).json({ message: "Användare skapad" })

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

//Logga in användare
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        //Validera input
        if (!username || !password) {
            return res.status(400).json({ error: "Ogiltig inmatning, fyll i användarnamn och lösenord" })
        }

        //Kontrollera username och password
        if (username === "Emma" && password === "Anton") {
            res.status(200).json({ message: "Inloggningen lyckades" });
        } else {
            res.status(401).json({ error: "Ogitligt användarnamn och lösenord" });
        }

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;