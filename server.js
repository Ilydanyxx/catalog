const express = require("express");
const multer = require("multer");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({ dest: "uploads/" });

let coins = [];

app.get("/coins", (req, res) => {
    res.json(coins);
});

app.post("/add-coin", upload.array("imageFiles"), (req, res) => {
    const { name, year, price, imageLinks } = req.body;
    const images = req.files.map(file => `/uploads/${file.filename}`);
    if (imageLinks) {
        images.push(...imageLinks.split(","));
    }
    coins.push({ id: Date.now().toString(), name, year, price, images });
    res.sendStatus(200);
});

app.delete("/delete-coin/:id", (req, res) => {
    coins = coins.filter(coin => coin.id !== req.params.id);
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
});
