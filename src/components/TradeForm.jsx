// src/components/TradeForm.jsx
import React, { useState } from "react";
import { useTrade } from "../context/TradeContext";

export default function TradeForm() {
  const { optionList, market, placeOrder, LOT_MULTIPLIER } = useTrade();

  const [instrument, setInstrument] = useState(optionList[0].instrument);
  const selected = market[instrument] ?? optionList[0];
  const [side, setSide] = useState("Buy");
  const [qty, setQty] = useState(1); // lots

  function onPlace() {
    const payload = {
      instrument: selected.instrument,
      symbol: selected.symbol,
      strike: selected.strike,
      optionType: selected.optionType,
      orderSide: side,
      entryPremium: selected.currentPremium,
      qty,
    };
    const res = placeOrder(payload);
    if (!res.ok) {
      alert(res.error);
    } else {
      // reset qty
      setQty(1);
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg mb-6">
      <h3 className="text-lg font-semibold mb-4">Place Option Trade (Demo)</h3>

      <div className="flex gap-4 flex-wrap">
        <select
          value={instrument}
          onChange={(e) => setInstrument(e.target.value)}
          className="px-3 py-2 rounded bg-gray-300 border-2 border-gray-300"
        >
          {optionList.map((o) => (
            <option value={o.instrument} key={o.instrument}>
              {o.symbol} {o.strike}{o.optionType} — ₹{o.premium}
            </option>
          ))}
        </select>

        <div className="px-3 py-2 rounded bg-gray-300 border-2 border-gray-300">
          <div className="text-xs text-gray-900">Current Premium</div>
          <div className="font-semibold">₹{(selected && market[selected.instrument]?.currentPremium) ?? selected.premium}</div>
        </div>

        <div className="px-3 py-2 rounded bg-gray-300 border-2 border-gray-300">
          <div className="text-xs text-gray-900">Lot Size</div>
          <div className="font-semibold">{LOT_MULTIPLIER[selected.symbol] ?? 1}</div>
        </div>

        <div className="px-3 py-2 rounded bg-gray-300 border-2 border-gray-300 flex items-center">
          <label className="mr-2 text-sm">Qty (lots)</label>
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="w-20 px-2 py-1 rounded bg-gray-300"
          />
        </div>

        <div className="flex gap-2 items-center">
          <button
            onClick={() => setSide("Buy")}
            className={`px-4 py-2 rounded font-semibold ${side === "Buy" ? "bg-green-600" : "bg-gray-300 border-2 border-gray-300"}`}
          >
            Buy
          </button>
          <button
            onClick={() => setSide("Sell")}
            className={`px-4 py-2 rounded font-semibold ${side === "Sell" ? "bg-red-600" : "bg-gray-300 border-2 border-gray-300"}`}
          >
            Sell
          </button>
          <button onClick={onPlace} className="px-4 py-2 bg-blue-600 rounded font-semibold">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
