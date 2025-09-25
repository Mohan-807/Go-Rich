// src/components/DemoAccount.jsx
import React, { useState } from "react";
import { useTrade } from "../context/TradeContext";
import TradeForm from "./TradeForm";

export default function DemoAccount() {
  const { virtualBalance, transactions, addFunds, resetBalance } = useTrade();
  const [depositAmount, setDepositAmount] = useState(500);
  const [error, setError] = useState("");

  function onAddFunds(amount) {
    if (amount < 500) {
      setError("Minimum deposit amount is ₹500");
      return;
    }
    addFunds(amount);
    setDepositAmount(500);
    setError("");
  }

  function onReset() {
    resetBalance();
    setDepositAmount(500);
    setError("");
  }

  return (
    <div className="flex flex-col bg-gray-300  text-gray-900 p-8 justify-center items-center">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Demo Account</h1>

        <div className="flex gap-8">
          <div className="flex-1">
            <div className="bg-white rounded-lg border p-6 mb-6">
              <div className="mb-4 text-lg">Stocks, F&O balance</div>
              <div className="text-4xl font-bold mb-4">
                ₹{virtualBalance.toLocaleString()}.
                <span className="text-2xl">00</span>
              </div>
              <hr className="mb-4" />
              <div className="flex justify-between">
                <span>Cash</span>
                <span className="font-bold">
                  ₹{virtualBalance.toLocaleString()}.00
                </span>
              </div>
            </div>

            <div className="bg-white rounded-lg border p-6">
              <div className="font-medium mb-2">All transactions</div>
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="text-gray-500 border-b">
                    <th className="py-2">Date</th>
                    <th className="py-2">Type</th>
                    <th className="py-2">Amount</th>
                    <th className="py-2">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length ? (
                    transactions.map((t, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="py-2">{t.date}</td>
                        <td className="py-2">{t.type}</td>
                        <td className="py-2">
                          {t.amount >= 0
                            ? `₹${t.amount.toLocaleString()}`
                            : `-₹${Math.abs(t.amount).toLocaleString()}`}
                        </td>
                        <td className="py-2 text-gray-500">{t.note}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center text-gray-400 py-4"
                      >
                        No transactions yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="w-96">
            <div className="bg-white rounded-lg border p-6 mb-6">
              <div className="flex gap-12 mb-4">
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

              <div className="flex gap-4 mb-4">
                {[100, 500].map((val) => (
                  <button
                    key={val}
                    type="button"
                    className="border border-green-600 rounded-full px-4 py-2 text-green-600 hover:bg-green-50"
                    onClick={() => setDepositAmount((d) => d + val)}
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
                className="bg-green-600 text-white py-3 rounded-lg font-semibold text-lg disabled:opacity-50 w-full"
                disabled={depositAmount < 500}
                onClick={() => onAddFunds(depositAmount)}
              >
                Add money
              </button>

              <button
                type="button"
                className="mt-4 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 font-medium w-full"
                onClick={onReset}
              >
                Reset to default capital
              </button>
            </div>

            {/* Place trade form */}
          </div>

          <div className="w-96">
            <TradeForm />
          </div>
        </div>
      </div>
    </div>
  );
}
