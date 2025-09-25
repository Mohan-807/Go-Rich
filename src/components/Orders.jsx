// src/components/Orders.jsx
import React from "react";
import { useTrade } from "../context/TradeContext";

export default function Orders() {
  const { activeOrders, completedOrders, market, closeOrder } = useTrade();

  const totalActivePL = activeOrders.reduce((acc, o) => {
    const m = market[o.instrument];
    const cp = m ? m.currentPremium : o.entryPremium;
    const pl = o.side === "Buy" ? (cp - o.entryPremium) * o.qty * o.lot : (o.entryPremium - cp) * o.qty * o.lot;
    return acc + pl;
  }, 0);

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      <section className="mb-10 p-6 bg-gray-800 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="text-gray-400 uppercase text-sm font-semibold mb-1">Active Trades P&L</div>
            <div className={`text-3xl font-bold ${totalActivePL >= 0 ? "text-green-400" : "text-red-400"}`}>
              {totalActivePL >= 0 ? `+${Math.round(totalActivePL).toLocaleString()}` : `-${Math.abs(Math.round(totalActivePL)).toLocaleString()}`}
            </div>
          </div>
        </div>

        {/* Active Trades List */}
        <table className="w-full text-sm text-left border-collapse border border-gray-700 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-gray-300">
              <th className="p-2 border border-gray-600">Symbol</th>
              <th className="p-2 border border-gray-600">Instrument</th>
              <th className="p-2 border border-gray-600">Side</th>
              <th className="p-2 border border-gray-600">Qty (lots)</th>
              <th className="p-2 border border-gray-600">Entry Prem</th>
              <th className="p-2 border border-gray-600">Current Prem</th>
              <th className="p-2 border border-gray-600">Unrealized P/L</th>
              <th className="p-2 border border-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {activeOrders.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center text-gray-400 py-4">No active orders</td>
              </tr>
            )}
            {activeOrders.map((o) => {
              const m = market[o.instrument];
              const cp = m ? m.currentPremium : o.entryPremium;
              const unrealized = o.side === "Buy" ? (cp - o.entryPremium) * o.qty * o.lot : (o.entryPremium - cp) * o.qty * o.lot;
              return (
                <tr key={o.id} className="border-b border-gray-700 hover:bg-gray-800">
                  <td className="p-2 border border-gray-600">{o.symbol}</td>
                  <td className="p-2 border border-gray-600">{o.instrument}</td>
                  <td className={`p-2 border border-gray-600 ${o.side === "Buy" ? "text-green-400" : "text-red-400"}`}>{o.side}</td>
                  <td className="p-2 border border-gray-600">{o.qty}</td>
                  <td className="p-2 border border-gray-600">₹{o.entryPremium}</td>
                  <td className="p-2 border border-gray-600">₹{cp}</td>
                  <td className={`p-2 border border-gray-600 ${unrealized >= 0 ? "text-green-400" : "text-red-400"}`}>
                    {unrealized >= 0 ? `+${Math.round(unrealized).toLocaleString()}` : `-${Math.abs(Math.round(unrealized)).toLocaleString()}`}
                  </td>
                  <td className="p-2 border border-gray-600">
                    <button onClick={() => closeOrder(o.id)} className="px-3 py-1 rounded bg-blue-600">Close</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {/* Completed Orders */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Completed Trades</h2>
        <table className="w-full text-sm text-left border-collapse border border-gray-700 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-gray-400">
              <th className="p-3 border border-gray-700">Instrument</th>
              <th className="p-3 border border-gray-700">Side</th>
              <th className="p-3 border border-gray-700">Qty</th>
              <th className="p-3 border border-gray-700">Entry</th>
              <th className="p-3 border border-gray-700">Exit</th>
              <th className="p-3 border border-gray-700">Realized P/L</th>
            </tr>
          </thead>
          <tbody>
            {completedOrders.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-gray-400 py-4">No completed trades</td>
              </tr>
            )}
            {completedOrders.map((c) => (
              <tr key={c.id} className="border-b border-gray-700 hover:bg-gray-800">
                <td className="p-3 border border-gray-700">{c.instrument}</td>
                <td className={`p-3 border border-gray-700 ${c.side === "Buy" ? "text-green-400" : "text-red-400"}`}>{c.side}</td>
                <td className="p-3 border border-gray-700">{c.qty}</td>
                <td className="p-3 border border-gray-700">₹{c.entryPremium}</td>
                <td className="p-3 border border-gray-700">₹{c.exitPremium}</td>
                <td className={`p-3 border border-gray-700 ${c.realizedPL >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {c.realizedPL >= 0 ? `+${c.realizedPL.toLocaleString()}` : `-${Math.abs(c.realizedPL).toLocaleString()}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
