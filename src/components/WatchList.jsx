// Watchlist.jsx
import React, { useState } from "react";

const favorites = [
  { symbol: "BTC/USD", name: "Bitcoin", lastPrice: "$68,430.50", change: 2.5, chartTrend: [1, 1.1, 1, 1.05, 1.08, 1.1] },
  { symbol: "ETH/USD", name: "Ethereum", lastPrice: "$3,560.18", change: -1.2, chartTrend: [1, 0.98, 0.95, 0.96, 0.94, 0.9] },
  { symbol: "AAPL", name: "Apple Inc.", lastPrice: "$190.29", change: 0.8, chartTrend: [1, 1.02, 1.04, 1.03, 1.05, 1.07] },
  { symbol: "GOOGL", name: "Alphabet Inc.", lastPrice: "$177.85", change: 1.5, chartTrend: [1, 1.05, 1.1, 1.08, 1.07, 1.06] },
];

// Simple green/red line chart based on values
function MiniChart({ data, positive }) {
  const color = positive ? "stroke-green-400" : "stroke-red-500";
  return (
    <svg width="80" height="30" viewBox="0 0 80 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polyline
        points={data.map((d, i) => [i * 16, 30 - d * 20].join(",")).join(" ")}
        className={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function WatchList() {
  const [selectedCategory, setSelectedCategory] = useState("Favorites");

  const categories = ["Favorites", "Crypto", "Stocks", "Forex"];

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8 flex">
      {/* Sidebar */}
      <aside className="w-64 p-4 bg-gray-800 rounded-lg mr-8">
        <h2 className="text-lg font-semibold mb-4">Watchlists</h2>
        <ul>
          {categories.map(cat => (
            <li
              key={cat}
              className={`py-2 px-3 rounded cursor-pointer mb-1 ${
                selectedCategory === cat ? "bg-blue-700" : "hover:bg-gray-700"
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1">
        <h1 className="text-2xl font-bold mb-6">Favorites</h1>
        <p className="mb-6 text-gray-400">Track your favorite assets and stay ahead of the market.</p>

        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="py-2 px-4">SYMBOL</th>
              <th className="py-2 px-4">LAST PRICE</th>
              <th className="py-2 px-4">CHANGE</th>
              <th className="py-2 px-4">CHART (7D)</th>
              <th className="py-2 px-4">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map(({ symbol, name, lastPrice, change, chartTrend }) => (
              <tr key={symbol} className="border-b border-gray-700 hover:bg-gray-800">
                <td className="py-2 px-4 flex items-center gap-3">
                  <div className="w-6 h-6 bg-gray-600 rounded"></div>
                  <div>
                    <div className="font-semibold">{symbol}</div>
                    <div className="text-xs text-gray-400">{name}</div>
                  </div>
                </td>
                <td className="py-2 px-4">{lastPrice}</td>
                <td className={`py-2 px-4 ${change >= 0 ? "text-green-400" : "text-red-500"}`}>
                  {change >= 0 ? "+" : ""}
                  {change}%
                </td>
                <td className="py-2 px-4">
                  <MiniChart data={chartTrend} positive={change >= 0} />
                </td>
                <td className="py-2 px-4 flex gap-3">
                  <button className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-500">Buy</button>
                  <button className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600">Sell</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
