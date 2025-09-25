// src/context/TradeContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const TradeContext = createContext(null);

const OPTION_CHAIN = [
  { instrument: "NIFTY_18500_CE", symbol: "NIFTY50", strike: 18500, optionType: "CE", premium: 200 },
  { instrument: "NIFTY_18600_CE", symbol: "NIFTY50", strike: 18600, optionType: "CE", premium: 150 },
  { instrument: "BANKNIFTY_43000_PE", symbol: "BANKNIFTY", strike: 43000, optionType: "PE", premium: 300 },
  { instrument: "RELIANCE_2500_CE", symbol: "RELIANCE", strike: 2500, optionType: "CE", premium: 12 },
];

const LOT_MULTIPLIER = {
  NIFTY50: 50,
  BANKNIFTY: 15,
  RELIANCE: 1,
};

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function TradeProvider({ children }) {
  const [virtualBalance, setVirtualBalance] = useState(100000);
  const [transactions, setTransactions] = useState([
    { date: todayISO(), type: "Seed", amount: 100000, note: "Initial demo capital" },
  ]);
  const [market, setMarket] = useState(() => {
    const map = {};
    OPTION_CHAIN.forEach((o) => {
      map[o.instrument] = { ...o, currentPremium: o.premium };
    });
    return map;
  });
  const [activeOrders, setActiveOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);

  // Fetch live price from backend
  async function fetchPrice(symbol) {
    try {
      const res = await fetch(`http://localhost:4000/api/quote/${symbol}`);
      const data = await res.json();
      return data.price;
    } catch (err) {
      console.error("Price fetch error", err);
      return null;
    }
  }

  // Update market premiums every 5s
  useEffect(() => {
    const interval = setInterval(async () => {
      const updated = { ...market };
      for (let inst of OPTION_CHAIN) {
        const live = await fetchPrice(inst.symbol);
        if (live) {
          updated[inst.instrument] = {
            ...inst,
            currentPremium: Math.max(0.5, Math.round((live / 100) * 100) / 100),
          };
        }
      }
      setMarket(updated);
    }, 5000);
    return () => clearInterval(interval);
  }, [market]);

  // --- Utility functions ---
  function pushTransaction(tx) {
    setTransactions((prev) => [{ date: todayISO(), ...tx }, ...prev]);
  }

  function addFunds(amount) {
    setVirtualBalance((b) => Math.round(b + amount));
    pushTransaction({ type: "Deposit", amount, note: "Manual deposit" });
  }

  function resetBalance() {
    setVirtualBalance(100000);
    setTransactions([{ date: todayISO(), type: "Reset", amount: 100000, note: "Reset to default capital" }]);
    setActiveOrders([]);
    setCompletedOrders([]);
  }

  function placeOrder({ instrument, symbol, strike, optionType, orderSide, entryPremium, qty }) {
    const lot = LOT_MULTIPLIER[symbol] ?? 1;
    const cost = Math.round(entryPremium * qty * lot);

    if (orderSide === "Buy" && virtualBalance < cost) {
      return { ok: false, error: `Insufficient balance. Need ₹${cost.toLocaleString()}` };
    }

    if (orderSide === "Buy") {
      setVirtualBalance((b) => b - cost);
      pushTransaction({ type: "Buy (placed)", amount: -cost, note: `${symbol} ${strike}${optionType} x${qty}` });
    } else {
      setVirtualBalance((b) => b + cost);
      pushTransaction({ type: "Sell (placed)", amount: cost, note: `${symbol} ${strike}${optionType} x${qty}` });
    }

    const order = {
      id: `${instrument}_${Date.now()}`,
      instrument,
      symbol,
      strike,
      optionType,
      side: orderSide,
      qty,
      lot,
      entryPremium,
      openedAt: new Date().toISOString(),
    };

    setActiveOrders((arr) => [order, ...arr]);
    return { ok: true, order };
  }

  function closeOrder(orderId) {
    setActiveOrders((prev) => {
      const found = prev.find((o) => o.id === orderId);
      if (!found) return prev;

      const remaining = prev.filter((o) => o.id !== orderId);
      const m = market[found.instrument];
      const currentPremium = m ? m.currentPremium : found.entryPremium;

      let pl = 0;
      if (found.side === "Buy") {
        pl = (currentPremium - found.entryPremium) * found.qty * found.lot;
        setVirtualBalance((b) => b + Math.round(currentPremium * found.qty * found.lot));
        pushTransaction({ type: "Buy (closed)", amount: Math.round(currentPremium * found.qty * found.lot), note: `${found.symbol} ${found.strike}${found.optionType} x${found.qty}` });
      } else {
        pl = (found.entryPremium - currentPremium) * found.qty * found.lot;
        setVirtualBalance((b) => b - Math.round(currentPremium * found.qty * found.lot));
        pushTransaction({ type: "Sell (closed)", amount: -Math.round(currentPremium * found.qty * found.lot), note: `${found.symbol} ${found.strike}${found.optionType} x${found.qty}` });
      }

      const completed = { ...found, closedAt: new Date().toISOString(), exitPremium: currentPremium, realizedPL: Math.round(pl) };
      setCompletedOrders((c) => [completed, ...c]);
      pushTransaction({ type: "P/L", amount: completed.realizedPL, note: `Realized P/L for ${found.instrument}` });

      return remaining;
    });
  }

  const value = {
    virtualBalance,
    transactions,
    market,
    optionList: OPTION_CHAIN,
    activeOrders,
    completedOrders,
    placeOrder,
    closeOrder,
    addFunds,
    resetBalance,
    LOT_MULTIPLIER,
  };

  return <TradeContext.Provider value={value}>{children}</TradeContext.Provider>;
}

export const useTrade = () => {
  const ctx = useContext(TradeContext);
  if (!ctx) throw new Error("useTrade must be used inside TradeProvider");
  return ctx;
};
