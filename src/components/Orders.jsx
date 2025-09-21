// Orders.jsx
import React, { useState } from "react";

const initialOpenOrders = [
  { symbol: "NIFTY50", orderType: "Buy", quantity: 100, price: 18500, status: "Pending" },
  { symbol: "BANKNIFTY", orderType: "Sell", quantity: 50, price: 43000, status: "Open" },
  { symbol: "RELIANCE", orderType: "Buy", quantity: 200, price: 2500, status: "Cancelled" },
];

const initialTradeHistory = [
  { symbol: "NIFTY50", orderType: "Buy", quantity: 100, price: 18500, date: "2023-10-26", status: "Executed" },
  { symbol: "BANKNIFTY", orderType: "Sell", quantity: 50, price: 43000, date: "2023-10-25", status: "Executed" },
  { symbol: "RELIANCE", orderType: "Buy", quantity: 200, price: 2500, date: "2023-10-24", status: "Executed" },
];

export default function Orders() {
  const [activeTab, setActiveTab] = useState("Orders");

  const statusClasses = {
    Pending: "bg-yellow-600 text-white px-2 py-1 rounded",
    Open: "bg-green-600 text-white px-2 py-1 rounded",
    Cancelled: "bg-gray-600 text-white px-2 py-1 rounded",
    Executed: "bg-green-500 text-white px-2 py-1 rounded",
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      <h1 className="text-2xl font-bold mb-6">Orders & Trades</h1>
      <div className="mb-6 flex gap-6 border-b border-gray-700">
        <button
          onClick={() => setActiveTab("Orders")}
          className={`py-2 px-6 font-semibold ${activeTab === "Orders" ? "border-b-2 border-blue-600" : "text-gray-400"}`}
        >
          Orders
        </button>
        <button
          onClick={() => setActiveTab("Trade History")}
          className={`py-2 px-6 font-semibold ${activeTab === "Trade History" ? "border-b-2 border-blue-600" : "text-gray-400"}`}
        >
          Trade History
        </button>
      </div>

      {activeTab === "Orders" && (
        <>
          <h2 className="text-xl font-semibold mb-4">Open Orders</h2>
          <table className="w-full text-sm text-left border-collapse border border-gray-700 rounded-lg overflow-hidden mb-10">
            <thead>
              <tr className="bg-gray-800 text-gray-400">
                <th className="p-3 border border-gray-700">Symbol</th>
                <th className="p-3 border border-gray-700">Order Type</th>
                <th className="p-3 border border-gray-700">Quantity</th>
                <th className="p-3 border border-gray-700">Price</th>
                <th className="p-3 border border-gray-700">Status</th>
                <th className="p-3 border border-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {initialOpenOrders.map(({ symbol, orderType, quantity, price, status }) => (
                <tr key={symbol} className="border-b border-gray-700 hover:bg-gray-800">
                  <td className="p-3 border border-gray-700">{symbol}</td>
                  <td className="p-3 border border-gray-700">
                    <span className={orderType === "Buy" ? "text-green-400" : "text-red-400"}>
                      {orderType}
                    </span>
                  </td>
                  <td className="p-3 border border-gray-700">{quantity}</td>
                  <td className="p-3 border border-gray-700">{price.toLocaleString()}</td>
                  <td className="p-3 border border-gray-700">
                    <span className={statusClasses[status]}>{status}</span>
                  </td>
                  <td className="p-3 border border-gray-700">
                    {status === "Pending" && <button className="text-blue-500 hover:underline">Cancel</button>}
                    {status === "Open" && <button className="text-blue-500 hover:underline">Edit</button>}
                    {status === "Cancelled" && <button className="text-blue-500 hover:underline">View</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {activeTab === "Trade History" && (
        <>
          <h2 className="text-xl font-semibold mb-4">Trade History</h2>
          <div className="mb-4 flex gap-4">
            <input
              type="text"
              placeholder="Search by symbol..."
              className="bg-gray-800 text-white rounded px-4 py-2 flex-1"
            />
            <select className="bg-gray-800 text-white rounded px-4 py-2">
              <option>Date</option>
            </select>
            <select className="bg-gray-800 text-white rounded px-4 py-2">
              <option>Order Type</option>
            </select>
          </div>
          <table className="w-full text-sm text-left border-collapse border border-gray-700 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-800 text-gray-400">
                <th className="p-3 border border-gray-700">Symbol</th>
                <th className="p-3 border border-gray-700">Order Type</th>
                <th className="p-3 border border-gray-700">Quantity</th>
                <th className="p-3 border border-gray-700">Price</th>
                <th className="p-3 border border-gray-700">Date</th>
                <th className="p-3 border border-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {initialTradeHistory.map(({ symbol, orderType, quantity, price, date, status }) => (
                <tr key={symbol} className="border-b border-gray-700 hover:bg-gray-800">
                  <td className="p-3 border border-gray-700">{symbol}</td>
                  <td className="p-3 border border-gray-700">
                    <span className={orderType === "Buy" ? "text-green-400" : "text-red-400"}>
                      {orderType}
                    </span>
                  </td>
                  <td className="p-3 border border-gray-700">{quantity}</td>
                  <td className="p-3 border border-gray-700">{price.toLocaleString()}</td>
                  <td className="p-3 border border-gray-700">{date}</td>
                  <td className="p-3 border border-gray-700">
                    <span className="bg-green-500 text-white px-2 py-1 rounded">{status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
