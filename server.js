const express = require("express");
const multer = require("multer");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const upload = multer({ dest: "uploads/" });

// Загружаем сохраненные монеты при запуске сервера
let coins = [];
if (fs.existsSync("coins.json")) {
    coins = JSON.parse(fs.readFileSync("coins.json", "utf8"));
}

app.get("/coins", (req, res) => {
    res.json(coins);
});

app.post("/add-coin", upload.array("imageFiles"), (req, res) => {
    const { name, year, price, imageLinks } = req.body;
    
    const images = req.files.map(file => `/uploads/${file.filename}`);
    if (imageLinks && typeof imageLinks === "string" && imageLinks.trim() !== "") {
        images.push(...imageLinks.split(","));
    }

    const newCoin = { id: Date.now().toString(), name, year, price, images };
    coins.push(newCoin);

    // Сохраняем монеты в файл
    fs.writeFileSync("coins.json", JSON.stringify(coins, null, 2));

    res.sendStatus(200);
});

app.delete("/delete-coin/:id", (req, res) => {
    coins = coins.filter(coin => coin.id !== req.params.id);
    
    // Обновляем файл после удаления
    fs.writeFileSync("coins.json", JSON.stringify(coins, null, 2));

    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
});
