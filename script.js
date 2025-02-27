async function loadCoins() {
    const response = await fetch("/coins");
    const coins = await response.json();
    const catalog = document.getElementById("catalog");
    catalog.innerHTML = "";
    coins.forEach(coin => {
        const coinDiv = document.createElement("div");
        coinDiv.className = "coin-item";
        coinDiv.innerHTML = `
            <h3>${coin.name} (${coin.year})</h3>
            <p>Ціна: ${coin.price}</p>
            <div class="coin-images">
                ${coin.images.map(img => `<img src="${img}" onclick="this.parentElement.querySelector('img').src='${img}'">`).join(" ")}
            </div>
        `;
        catalog.appendChild(coinDiv);
    });
}

document.addEventListener("DOMContentLoaded", loadCoins);
