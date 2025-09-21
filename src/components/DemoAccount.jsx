// DemoAccount.jsx
import React, { useState } from "react";

const demoActivity = [
  { date: "2023-09-20", type: "Deposit", amount: 5000 },
  { date: "2023-09-15", type: "Deposit", amount: 2000 },
  { date: "2023-09-10", type: "Deposit", amount: 7000 },
];

export default function DemoAccount() {
  const [virtualBalance, setVirtualBalance] = useState(10000);
  const [activity, setActivity] = useState(demoActivity);
  const [depositAmount, setDepositAmount] = useState(500);
  const [error, setError] = useState("");

  function addFunds(amount) {
    if (amount < 500) {
      setError("Minimum deposit amount is ₹500");
      return;
    }
    setVirtualBalance((prev) => prev + amount);
    setActivity((prev) => [
      { date: new Date().toISOString().slice(0, 10), type: "Deposit", amount },
      ...prev,
    ]);
    setDepositAmount(500);
    setError("");
  }

  function resetBalance() {
    setVirtualBalance(10000);
    setActivity([]);
    setDepositAmount(500);
    setError("");
  }

  return (
    <div className="flex flex-col bg-gray-300  text-gray-900 p-8 justify-center items-center">
      <div className="flex-1">
        <div className="flex gap-8">
          <div>
            <div className="flex flex-col justify-between">
              <div className="bg-gray-50 rounded-lg border p-8 mb-6 w-md">
                <div className="mb-4 text-center text-lg">
                  Stocks, F&O balance
                </div>
                <div className="text-center text-4xl font-bold mb-6">
                  ₹{virtualBalance.toLocaleString()}.
                  <span className="text-2xl">00</span>
                </div>
                <hr className="mb-6" />
                <div className="flex justify-between items-center py-3">
                  <span>Cash</span>
                  <span className="font-bold">
                    ₹{virtualBalance.toLocaleString()}.00
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-lg border p-6 mt-2 w-md">
                <div className="font-medium mb-2">All transactions</div>
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="text-gray-500 border-b">
                      <th>Date</th>
                      <th>Type</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activity.map(({ date, type, amount }, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="py-2">{date}</td>
                        <td className="py-2">{type}</td>
                        <td className="py-2">₹{amount.toLocaleString()}</td>
                      </tr>
                    ))}
                    {activity.length === 0 && (
                      <tr>
                        <td
                          colSpan={3}
                          className="text-center text-gray-400 py-2"
                        >
                          No transactions yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="bg-white rounded-lg border p-8 w-md flex flex-col">
              <div className="flex gap-12 mb-6">
                <div className="text-green-600 font-semibold border-b-2 border-green-600 pb-1">
                  Add money
                </div>
                <div className="text-gray-500 cursor-not-allowed pb-1">
                  Withdraw
                </div>
              </div>
              <label className="mb-2 block text-gray-600">Enter Amount</label>
              <div className="flex items-center mb-4">
                <span className="mr-2 text-green-600 text-lg font-semibold">
                  ₹
                </span>
                <input
                  type="number"
                  min={500}
                  className="border rounded px-4 py-2 w-32 focus:outline-none focus:border-green-600"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                />
              </div>
              <div className="flex gap-4 mb-6">
                {[100, 500].map((val) => (
                  <button
                    key={val}
                    type="button"
                    className="border border-green-600 rounded-full px-4 py-2 text-green-600 hover:bg-green-50"
                    onClick={() => setDepositAmount(depositAmount + val)}
                  >
                    + ₹{val}
                  </button>
                ))}
              </div>
              {error && (
                <div className="text-red-500 text-sm mb-2">{error}</div>
              )}
              <button
                type="button"
                className="bg-green-600 text-white py-3 rounded-lg font-semibold text-lg disabled:opacity-50"
                disabled={depositAmount < 500}
                onClick={() => addFunds(depositAmount)}
              >
                Add money
              </button>
              <button
                type="button"
                className="mt-4 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 font-medium"
                onClick={resetBalance}
              >
                Reset to default capital
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
