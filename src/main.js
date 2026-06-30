const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;

document.addEventListener('DOMContentLoaded', () => {
  
  const searchBtn = document.getElementById('search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const symbol = document.getElementById('ticker-input').value.trim().toUpperCase();
      if (symbol) {
        fetchStockData(symbol);
      }
    });
  }

  fetchStockData('AAPL');
});

function fetchStockData(ticker) {
  const displayArea = document.getElementById('stock-display');
  if (!displayArea) return;
  displayArea.innerHTML = `<p class="loading">Fetching market metrics for ${ticker}...</p>`;

  const quoteUrl = `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${API_KEY}`;
  const profileUrl = `https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${API_KEY}`;

  Promise.all([
    fetch(quoteUrl).then(res => res.json()),
    fetch(profileUrl).then(res => res.json())
  ])
  .then(([quoteData, profileData]) => {
    if (!quoteData.c || Object.keys(profileData).length === 0) {
      displayArea.innerHTML = `<p class="error">Ticker "${ticker}" not found. Try entering AAPL, TSLA, or MSFT.</p>`;
      return;
    }

    const currentPrice = quoteData.c.toFixed(2);
    const priceChange = quoteData.d.toFixed(2);
    const percentChange = quoteData.dp.toFixed(2);

    let movementClass = 'neutral';
    let directionalSign = '';
    
    if (quoteData.d > 0) {
      movementClass = 'bullish';
      directionalSign = '+';
    } else if (quoteData.d < 0) {
      movementClass = 'bearish';
    }

    displayArea.innerHTML = `
      <div class="card">
        <div class="card-header">
          <img src="${profileData.logo || 'https://placehold.co/60'}" alt="${profileData.name} Logo" class="stock-logo"/>
          <div>
            <h2>${profileData.name} (${profileData.ticker})</h2>
            <p class="industry-tag">Sector: ${profileData.finnhubIndustry || 'N/A'}</p>
          </div>
        </div>
        
        <div class="price-block">
          <div class="main-price">$${currentPrice}</div>
          <div class="price-indicator ${movementClass}">
            ${directionalSign}${priceChange} (${directionalSign}${percentChange}%) Today
          </div>
        </div>

        <table class="metrics-table">
          <tr>
            <td><strong>Day High:</strong> $${quoteData.h.toFixed(2)}</td>
            <td><strong>Day Low:</strong> $${quoteData.l.toFixed(2)}</td>
          </tr>
          <tr>
            <td><strong>Market Cap:</strong> $${(profileData.marketCapitalization / 1000).toFixed(2)}B</td>
            <td><strong>Prev. Close:</strong> $${quoteData.pc.toFixed(2)}</td>
          </tr>
        </table>
      </div>
    `;
  })
  .catch(err => {
    console.error(err);
    displayArea.innerHTML = `<p class="error">Network error encountered: ${err.message}</p>`;
  });
}