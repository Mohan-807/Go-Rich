// Dashboard.jsx
import React, { useState } from "react";

const initialOrders = [
  { symbol: "Reliance", side: "Buy", quantity: 10, avgPrice: 2500, ltp: 2550, pnl: 500 },
  { symbol: "TCS", side: "Sell", quantity: 5, avgPrice: 3500, ltp: 3450, pnl: -250 },
  { symbol: "HDFC Bank", side: "Buy", quantity: 8, avgPrice: 1500, ltp: 1520, pnl: 160 },
];

const initialGainersLosers = [
  { symbol: "Infosys", ltp: 1200, change: 50, pct: "+4.3%" },
  { symbol: "Wipro", ltp: 450, change: 20, pct: "+4.6%" },
  { symbol: "ICICI Bank", ltp: 800, change: -30, pct: "-3.6%" },
];

const initialFeeds = [
  "Order filled: Buy 10 Reliance @ ₹2,500",
  "Alert: Nifty 50 crosses 18,000",
  "Funds added: ₹50,000",
];

export default function Dashboard() {
  const [orders, setOrders] = useState(initialOrders);
  const [feeds, setFeeds] = useState(initialFeeds);
  const [balance, setBalance] = useState(100000);
  const [invested, setInvested] = useState(50000);
  const [currentValue, setCurrentValue] = useState(52500);
  const [trade, setTrade] = useState({ symbol: "", side: "Buy", amount: "" });

  const symbols = ["Reliance", "TCS", "HDFC Bank", "Infosys", "Wipro", "ICICI Bank"];
  const orderTypes = ["Buy", "Sell"];

  function handleTrade(e) {
    e.preventDefault();
    if (!trade.symbol || !trade.amount || isNaN(trade.amount)) return;

    // Simulate price and pnl update
    const ltp = Math.floor(2000 + Math.random() * 1000);
    const avgPrice = ltp;
    const quantity = Number(trade.amount);
    const pnl = trade.side === "Buy" ? 20 * quantity : -10 * quantity;

    setOrders([
      {
        symbol: trade.symbol,
        side: trade.side,
        quantity,
        avgPrice,
        ltp,
        pnl,
      },
      ...orders,
    ]);
    setFeeds([
      `Order filled: ${trade.side} ${quantity} ${trade.symbol} @ ₹${avgPrice}`,
      ...feeds,
    ]);
    setInvested(invested + (trade.side === "Buy" ? avgPrice * quantity : 0));
    setCurrentValue(currentValue + pnl);
    setBalance(balance + (trade.side === "Sell" ? avgPrice * quantity : 0));
    setTrade({ symbol: "", side: "Buy", amount: "" });
  }

  return (
    <div className="bg-gray-500 min-h-screen text-white">
      <div className="flex flex-row px-8 pt-8 gap-8">
        {/* Left Sidebar */}
        <div className="w-72 flex-shrink-0">
          <div className="flex flex-col items-center gap-2 mb-8">
            <div className="w-24 h-24 rounded-full bg-gray-700 mb-2" />
            <div className="text-lg font-semibold">Alex Sharma</div>
            <div className="text-gray-400 text-sm">Demo Balance</div>
            <div className="text-xl font-bold">₹ 1,00,000</div>
            <button className="mt-4 w-full px-4 py-2 bg-blue-800 rounded transition hover:bg-blue-600">
              Top-up Funds
            </button>
          </div>
          {/* Quick Trade */}
          <div className="bg-gray-800 rounded p-5 mb-8">
            <div className="font-semibold mb-3">Quick Trade</div>
            <form onSubmit={handleTrade} className="flex flex-col gap-3">
              <select
                className="bg-gray-900 rounded px-2 py-1"
                value={trade.symbol}
                onChange={e => setTrade(trade => ({ ...trade, symbol: e.target.value }))}
              >
                <option value="">Select Stock</option>
                {symbols.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <select
                className="bg-gray-900 rounded px-2 py-1"
                value={trade.side}
                onChange={e => setTrade(trade => ({ ...trade, side: e.target.value }))}
              >
                {orderTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <input
                type="number"
                min="1"
                className="bg-gray-900 rounded px-2 py-1"
                placeholder="Enter amount"
                value={trade.amount}
                onChange={e => setTrade(trade => ({ ...trade, amount: e.target.value }))}
              />
              <div className="flex gap-3 mt-2">
                <button type="submit" className="flex-1 bg-blue-700 py-2 rounded text-white hover:bg-blue-600">Buy</button>
                <button type="button" className="flex-1 bg-red-600 py-2 rounded text-white hover:bg-red-500"
                  onClick={() => setTrade(trade => ({ ...trade, side: "Sell" }))}>
                  Sell
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1">
          <div className="text-3xl font-bold mb-6">Dashboard</div>
          {/* Portfolio Summary */}
          <div className="flex gap-6 mb-6">
            <div className="bg-gray-800 rounded-lg p-6 flex-1 flex flex-col items-center">
              <div className="text-gray-400 mb-1">Invested</div>
              <div className="text-2xl font-bold mb-1">₹ {invested.toLocaleString()}</div>
              <div className="text-green-400 font-semibold">+5%</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 flex-1 flex flex-col items-center">
              <div className="text-gray-400 mb-1">Current Value</div>
              <div className="text-2xl font-bold mb-1">₹ {currentValue.toLocaleString()}</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 flex-1 flex flex-col items-center">
              <div className="text-gray-400 mb-1">P&L</div>
              <div className="text-2xl font-bold mb-1 text-green-400">+ ₹ {(currentValue - invested).toLocaleString()}</div>
            </div>
          </div>
          {/* Tables Section */}
          <div className="flex gap-6 mb-6">
            {/* Recent Orders & Trades */}
            <div className="bg-gray-800 rounded-lg p-6 flex-1">
              <div className="font-semibold mb-4">Recent Orders & Trades</div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-400 border-b border-gray-600">
                    <th>Symbol</th>
                    <th>Side</th>
                    <th>Quantity</th>
                    <th>Avg. Price</th>
                    <th>LTP</th>
                    <th>P&L</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 3).map((order, i) => (
                    <tr key={i} className="border-b border-gray-700">
                      <td className="py-1">{order.symbol}</td>
                      <td className="py-1">{order.side}</td>
                      <td className="py-1">{order.quantity}</td>
                      <td className="py-1">₹ {order.avgPrice}</td>
                      <td className="py-1">₹ {order.ltp}</td>
                      <td className="py-1" style={{color: order.pnl >= 0 ? "#22c55e" : "#ef4444"}}>
                        ₹ {order.pnl}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Top Gainers & Losers */}
            <div className="bg-gray-800 rounded-lg p-6 flex-1">
              <div className="font-semibold mb-4">Top Gainers & Losers</div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-400 border-b border-gray-600">
                    <th>Symbol</th>
                    <th>LTP</th>
                    <th>Change</th>
                    <th>% Change</th>
                  </tr>
                </thead>
                <tbody>
                  {initialGainersLosers.map((item, i) => (
                    <tr key={i} className="border-b border-gray-700">
                      <td className="py-1">{item.symbol}</td>
                      <td className="py-1">₹ {item.ltp}</td>
                      <td className="py-1" style={{color: item.change >= 0 ? "#22c55e" : "#ef4444"}}>
                        ₹ {item.change}
                      </td>
                      <td className="py-1" style={{color: item.pct.startsWith("+") ? "#22c55e" : "#ef4444"}}>
                        {item.pct}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Activity Feed */}
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <div className="font-semibold mb-4">Activity Feed</div>
            <ul className="text-sm space-y-2">
              {feeds.slice(0, 3).map((feed, i) => (
                <li key={i} className="bg-gray-900 p-2 rounded">{feed}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
