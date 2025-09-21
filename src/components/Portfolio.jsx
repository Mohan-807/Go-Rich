// Portfolio.jsx
import React from "react";

const holdings = [
  { symbol: "INFY", quantity: 100, avgPrice: 1200, currentPrice: 1350, unrealizedPnl: 15000, realizedPnl: 5000 },
  { symbol: "TCS", quantity: 50, avgPrice: 3500, currentPrice: 3450, unrealizedPnl: -2500, realizedPnl: 2500 },
  { symbol: "HDFCBANK", quantity: 200, avgPrice: 1500, currentPrice: 1600, unrealizedPnl: 20000, realizedPnl: 0 },
  { symbol: "RELIANCE", quantity: 75, avgPrice: 2800, currentPrice: 2900, unrealizedPnl: 7500, realizedPnl: 3750 },
  { symbol: "ICICIBANK", quantity: 150, avgPrice: 1000, currentPrice: 1050, unrealizedPnl: 7500, realizedPnl: 3750 },
];

export default function Portfolio() {
  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      <h1 className="text-2xl font-bold mb-6">Portfolio & Holdings</h1>

      {/* Account Performance */}
      <div className="grid grid-cols-2 gap-6 mb-12">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="text-sm text-gray-400">Equity Curve</div>
          <div className="mt-2 text-3xl font-bold flex items-center gap-2">
            +18.5% <span className="text-green-400 text-lg">(+₹2,50,320)</span>
          </div>
          {/* Placeholder for Equity curve chart */}
          <div className="mt-4 h-32 bg-gradient-to-t from-blue-900 to-blue-700 rounded-lg"></div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex justify-between">
            <div>
              <div className="text-sm text-gray-400">Allocation by Sector</div>
              <div className="text-lg font-semibold">Current Portfolio</div>
            </div>
            <button className="text-blue-500 text-sm">View All</button>
          </div>
          {/* Pie chart placeholder */}
          <div className="flex items-center gap-6 mt-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500 via-blue-400 to-yellow-400 flex justify-center items-center text-xl font-bold">
              9
            </div>
            <div className="flex flex-col space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-600"></div> Technology 40%
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-400"></div> Finance 30%
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div> Healthcare 20%
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-500"></div> Others 10%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Holdings */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Current Holdings</h2>
        <table className="w-full text-sm text-left border-collapse border border-gray-700 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-gray-400">
              <th className="p-3 border border-gray-700">SYMBOL</th>
              <th className="p-3 border border-gray-700">QUANTITY</th>
              <th className="p-3 border border-gray-700">AVG. PRICE</th>
              <th className="p-3 border border-gray-700">CURRENT PRICE</th>
              <th className="p-3 border border-gray-700">UNREALIZED P&L</th>
              <th className="p-3 border border-gray-700">REALIZED P&L</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map(({ symbol, quantity, avgPrice, currentPrice, unrealizedPnl, realizedPnl }) => (
              <tr key={symbol} className="border-b border-gray-700 hover:bg-gray-800">
                <td className="p-3 border border-gray-700">{symbol}</td>
                <td className="p-3 border border-gray-700">{quantity}</td>
                <td className="p-3 border border-gray-700">₹{avgPrice.toFixed(2)}</td>
                <td className="p-3 border border-gray-700">₹{currentPrice.toFixed(2)}</td>
                <td className={`p-3 border border-gray-700 ${unrealizedPnl >= 0 ? "text-green-400" : "text-red-500"}`}>
                  {unrealizedPnl >= 0 ? "+" : "-"}₹{Math.abs(unrealizedPnl).toFixed(2)}
                </td>
                <td className={`p-3 border border-gray-700 ${realizedPnl >= 0 ? "text-green-400" : "text-red-500"}`}>
                  {realizedPnl >= 0 ? "+" : "-"}₹{Math.abs(realizedPnl).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
