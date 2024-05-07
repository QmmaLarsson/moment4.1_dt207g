const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());

//Routes
app.use("/api", authRoutes);

app.get("/api", (req, res) => {
    res.json({ message: "Välkommen till min webbtjänst" })
});

//Skyddad route
app.get("/api/protected", authenticateToken, (req, res) => {
    res.json({ message: "Skyddad route" });
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