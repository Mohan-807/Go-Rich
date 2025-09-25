import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = 4000;

const SYMBOL_MAP = {
  NIFTY50: "^NSEI",
  BANKNIFTY: "^NSEBANK",
  RELIANCE: "RELIANCE.NS",
};

async function getPrice(symbol) {
  try {
    const res = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1m`
    );
    const data = await res.json();
    const last = data?.chart?.result?.[0]?.meta?.regularMarketPrice;
    return last ?? null;
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
}

app.get("/api/quote/:symbol", async (req, res) => {
  const sym = req.params.symbol;
  const yahooSym = SYMBOL_MAP[sym];
  if (!yahooSym) {
    return res.status(400).json({ error: "Unknown symbol" });
  }
  const price = await getPrice(yahooSym);
  if (!price) {
    return res.status(500).json({ error: "Failed to fetch price" });
  }
  res.json({ symbol: sym, price });
});

app.listen(PORT, () => {
  console.log(`✅ Proxy running at http://localhost:${PORT}`);
});
