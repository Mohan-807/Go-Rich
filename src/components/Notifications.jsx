// Notifications.jsx
import React, { useState } from "react";

const alertConditions = [
  "Price is greater than",
  "Price is less than",
  "Volume is greater than",
  "Volume is less than",
];

const frequencies = ["Once", "Daily", "Weekly"];

const initialNotifications = [
  {
    type: "success",
    title: "Order Executed: BUY NIFTY 50",
    detail: "Your order to buy 50 units of NIFTY 50 at market price has been filled at ₹18,550.25.",
    time: "2 minutes ago",
  },
  {
    type: "info",
    title: "Price Alert Triggered: EUR/USD",
    detail: "EUR/USD has crossed above your alert price of 1.0750. Current price: 1.0752.",
    time: "1 hour ago",
  },
  {
    type: "warning",
    title: "Margin Call Warning",
    detail: "Your account margin level is at 30%. Please deposit more funds or close positions to avoid liquidation.",
    time: "Yesterday",
  },
  {
    type: "info",
    title: "Platform Maintenance",
    detail: "Scheduled maintenance will occur on Sunday from 2:00 AM to 4:00 AM. Trading may be temporarily unavailable.",
    time: "2 days ago",
  },
];

function NotificationIcon({ type }) {
  switch (type) {
    case "success":
      return <span className="text-green-400">✔️</span>;
    case "info":
      return <span className="text-blue-400">ℹ️</span>;
    case "warning":
      return <span className="text-yellow-400">⚠️</span>;
    default:
      return null;
  }
}

export default function Notifications() {
  const [instrument, setInstrument] = useState("");
  const [condition, setCondition] = useState(alertConditions[0]);
  const [value, setValue] = useState("");
  const [frequency, setFrequency] = useState(frequencies[0]);
  const [notifications, setNotifications] = useState(initialNotifications);

  const createAlert = () => {
    if (!instrument || !value) return;
    const newAlert = {
      type: "info",
      title: `Alert Created for ${instrument}`,
      detail: `Condition: ${condition} ${value}, Frequency: ${frequency}`,
      time: "Just now",
    };
    setNotifications([newAlert, ...notifications]);
    setInstrument("");
    setValue("");
    setCondition(alertConditions[0]);
    setFrequency(frequencies[0]);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Notifications & Alerts</h1>

      {/* Alert Setup */}
      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Alerts Setup</h2>
        <p className="mb-4">Create custom alerts to stay on top of market movements.</p>
        <div className="flex flex-col gap-4 max-w-md">
          <input
            type="text"
            placeholder="e.g., NIFTY 50, EUR/USD"
            value={instrument}
            onChange={e => setInstrument(e.target.value)}
            className="bg-gray-900 rounded px-4 py-2"
          />
          <select
            value={condition}
            onChange={e => setCondition(e.target.value)}
            className="bg-gray-900 rounded px-4 py-2"
          >
            {alertConditions.map(cond => (
              <option key={cond} value={cond}>{cond}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Value"
            value={value}
            onChange={e => setValue(e.target.value)}
            className="bg-gray-900 rounded px-4 py-2"
          />
          <select
            value={frequency}
            onChange={e => setFrequency(e.target.value)}
            className="bg-gray-900 rounded px-4 py-2"
          >
            {frequencies.map(freq => (
              <option key={freq} value={freq}>{freq}</option>
            ))}
          </select>
          <button
            onClick={createAlert}
            className="bg-blue-700 py-2 rounded hover:bg-blue-600"
          >
            Create Alert
          </button>
        </div>
      </div>

      {/* Notifications Center */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Notifications Center</h2>
        <ul className="space-y-4 max-w-xl">
          {notifications.map(({ type, title, detail, time }, i) => (
            <li
              key={i}
              className="flex gap-4 bg-gray-900 p-4 rounded items-start justify-between"
            >
              <div className="flex gap-3 items-center">
                <NotificationIcon type={type} />
                <div>
                  <div className="font-semibold">{title}</div>
                  <div className="text-gray-400 text-sm">{detail}</div>
                  <div className="text-gray-600 text-xs">{time}</div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-white">✖️</button>
            </li>
          ))}
        </ul>
        <button className="mt-4 text-blue-500 hover:underline">Load More</button>
      </div>
    </div>
  );
}
