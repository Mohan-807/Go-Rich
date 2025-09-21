// StockDetails.jsx
import React, { useState } from "react";

const timeFrames = ["1m", "5m", "15m", "1H", "4H", "1D"];
const orderTypes = ["Market", "Limit", "Stop", "OCO"];
const indicators = ["SMA", "RSI", "MACD"];

export default function StockDetails() {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("1H");
  const [selectedOrderType, setSelectedOrderType] = useState("Market");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8 flex gap-8">
      {/* Chart Section */}
      <div className="flex-1 bg-gray-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold">RELIANCE</h2>
            <p className="text-gray-400">Reliance Industries Ltd.</p>
          </div>
          <div>
            <div>Price</div>
            <div className="text-2xl font-bold">₹2,958.10</div>
            <div className="text-green-400">+₹45.60 (+1.56%)</div>
            <div>Volume 8.2M</div>
          </div>
        </div>

        {/* Timeframe Buttons */}
        <div className="flex gap-3 mb-4">
          {timeFrames.map(tf => (
            <button
              key={tf}
              className={`px-2 py-1 rounded ${selectedTimeFrame === tf ? "bg-blue-700" : "bg-gray-700"}`}
              onClick={() => setSelectedTimeFrame(tf)}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* Indicators */}
        <div className="flex gap-3 mb-6">
          {indicators.map(ind => (
            <button key={ind} className={`px-3 py-1 rounded bg-gray-700`}>{ind}</button>
          ))}
        </div>

        {/* Chart Placeholder */}
        <div className="bg-black rounded-lg" style={{ height: "350px" }}>
          {/* Ideally a candlestick chart library goes here */}
          <img
            src="https://images.unsplash.com/photo-1612832021026-0fd917247418?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
            alt="Candlestick Chart"
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
      </div>

      {/* Order Entry and Book */}
      <div className="w-96 flex flex-col gap-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex gap-3 mb-4">
            {orderTypes.map(type => (
              <button
                key={type}
                className={`flex-1 py-2 rounded ${selectedOrderType === type ? "bg-blue-700" : "bg-gray-700"}`}
                onClick={() => setSelectedOrderType(type)}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="mb-4">
            <label className="block mb-1">Quantity</label>
            <input
              type="number"
              min="0"
              className="w-full rounded px-3 py-2 bg-gray-900 text-white"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Price</label>
            <input
              type="text"
              placeholder={selectedOrderType === "Market" ? "Market" : ""}
              className="w-full rounded px-3 py-2 bg-gray-900 text-white"
              value={price}
              onChange={e => setPrice(e.target.value)}
              disabled={selectedOrderType === "Market"}
            />
          </div>

          <div className="flex gap-4">
            <button className="flex-1 bg-blue-700 py-2 rounded hover:bg-blue-600">Buy</button>
            <button className="flex-1 bg-red-600 py-2 rounded hover:bg-red-500">Sell</button>
          </div>
        </div>

        {/* Order Book */}
        <div className="bg-gray-800 rounded-lg p-4 text-sm">
          <h3 className="font-semibold mb-2">Order Book</h3>
          <table className="w-full border-collapse border border-gray-700 mb-4">
            <thead>
              <tr className="bg-gray-700">
                <th className="border border-gray-600 px-2 py-1">Bid Price</th>
                <th className="border border-gray-600 px-2 py-1">Quantity</th>
                <th className="border border-gray-600 px-2 py-1">Ask Price</th>
              </tr>
            </thead>
            <tbody>
              {[
                { bid: 2957.50, qty: 150, ask: "-" },
                { bid: 2957.45, qty: 95, ask: "-" },
                { bid: 2957.40, qty: 210, ask: "-" },
                { bid: 2957.35, qty: 180, ask: "-" },
                { bid: 2957.55, qty: "-", ask: 2957.65 },
              ].map(({ bid, qty, ask }, i) => (
                <tr key={i} className={i === 4 ? "font-bold" : ""}>
                  <td className={`border border-gray-600 px-2 py-1 ${i === 4 ? "text-green-400" : "text-white"}`}>{bid}</td>
                  <td className="border border-gray-600 px-2 py-1">{qty}</td>
                  <td className={`border border-gray-600 px-2 py-1 ${i === 4 ? "text-red-400" : "text-white"}`}>{ask}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-center text-xs text-gray-400">Spread: 0.10</div>
        </div>

        {/* Trade Tape */}
        <div className="bg-gray-800 rounded-lg p-4 text-sm">
          <h3 className="font-semibold mb-2">Trade Tape</h3>
          <table className="w-full border-collapse border border-gray-700">
            <thead>
              <tr className="bg-gray-700">
                <th className="border border-gray-600 px-2 py-1">Time</th>
                <th className="border border-gray-600 px-2 py-1">Price</th>
                <th className="border border-gray-600 px-2 py-1">Volume</th>
              </tr>
            </thead>
            <tbody>
              {[
                { time: "14:30:05", price: 2958.10, volume: 100 },
                { time: "14:30:04", price: 2958.05, volume: 50 },
                { time: "14:30:04", price: 2958.10, volume: 200 },
                { time: "14:30:02", price: 2958.10, volume: 75 },
                { time: "14:30:01", price: 2958.00, volume: 125 },
                { time: "14:29:59", price: 2958.05, volume: 30 },
                { time: "14:29:58", price: 2957.95, volume: 150 },
              ].map(({ time, price, volume }, i) => (
                <tr key={i} className="hover:bg-gray-700">
                  <td className="border border-gray-600 px-2 py-1">{time}</td>
                  <td className={`border border-gray-600 px-2 py-1 ${price >= 2958 ? "text-green-400" : "text-red-400"}`}>
                    {price}
                  </td>
                  <td className="border border-gray-600 px-2 py-1">{volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
