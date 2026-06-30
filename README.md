# EconSite
A simple website that shows real-time stock prices. You type in a stock code (like AAPL for Apple or TSLA for Tesla) and see its current price, details, and a live chart.

## What it Does
* **Finds Live Prices:** Uses the Finnhub API to get the newest stock prices and company logos.
* **Changes Colors:** Automatically turns text green if the stock price went up today, or red if it went down.
* **Keeps Keys Safe:** Uses Vite to hide your private API password so nobody can steal it on GitHub.

## Made With
* HTML and CSS (for the look and layout)
* JavaScript (for fetching the live data)
* Vite (the software runner)
* GitHub Codespaces (for coding in the browser)
* GitHub Pages (for hosting the website live)

## How to Set It Up

### 1. Get a Free Key
Go to [Finnhub.io](https://finnhub.io/), sign up for a free account, and copy your API key token.

### 2. Hide Your Key
1. Inside your GitHub Codespace, create a new file named `.env`.
2. Paste your key inside it like this:
   ```env
   VITE_FINNHUB_API_KEY=your_actual_key_here
   ```
# 1. Install the project files
npm install

# 2. Start the website server
npm run dev