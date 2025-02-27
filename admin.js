document.getElementById("addCoinForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const response = await fetch("/add-coin", {
        method: "POST",
        body: formData,
    });
    if (response.ok) loadCoins();
});

async function loadCoins() {
    const response = await fetch("/coins");
    const coins = await response.json();
    const coinList = document.getElementById("coinList");
    coinList.innerHTML = "";
    coins.forEach(coin => {
        const coinDiv = document.createElement("div");
        coinDiv.className = "coin-item";
        coinDiv.innerHTML = `
            <h3>${coin.name} (${coin.year})</h3>
            <p>Ціна: ${coin.price}</p>
            <button onclick="deleteCoin('${coin.id}')">Видалити</button>
        `;
        coinList.appendChild(coinDiv);
    });
}

async function deleteCoin(id) {
    await fetch(`/delete-coin/${id}`, { method: "DELETE" });
    loadCoins();
}

document.addEventListener("DOMContentLoaded", loadCoins);
