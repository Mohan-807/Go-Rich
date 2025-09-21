// StockChart.jsx
import React, { useState } from "react";

const technicalIndicators = ["SMA", "RSI", "MACD", "Bollinger Bands", "Fibonacci Retracements"];
const drawingTools = ["Trend Lines", "Horizontal Lines", "Rectangle", "Ellipse"];

export default function StockChart() {
  const [selectedIndicators, setSelectedIndicators] = useState(["SMA", "RSI", "MACD"]);
  const [selectedDrawingTools, setSelectedDrawingTools] = useState(["Trend Lines", "Horizontal Lines"]);
  const [orderType, setOrderType] = useState("Market");
  const [chartView, setChartView] = useState("1D");
  const [quantity, setQuantity] = useState("");

  const toggleIndicator = (indicator) => {
    setSelectedIndicators(prev =>
      prev.includes(indicator)
        ? prev.filter(i => i !== indicator)
        : [...prev, indicator]
    );
  };

  const toggleDrawingTool = (tool) => {
    setSelectedDrawingTools(prev =>
      prev.includes(tool)
        ? prev.filter(t => t !== tool)
        : [...prev, tool]
    );
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">NIFTY 50</h1>
          <div className="text-4xl font-extrabold">22,500.00</div>
        </div>
        <div>
          <button className="bg-blue-700 px-3 py-1 rounded mr-2">{chartView}</button>
          <button className="bg-blue-700 px-3 py-1 rounded">+0.5%</button>
        </div>
      </div>

      {/* Chart Container */}
      <div className="bg-gradient-to-t from-blue-800 to-blue-900 rounded-lg p-4 mb-6" style={{ height: "300px" }}>
        {/* Placeholder for chart */}
        <div className="w-full h-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 rounded-lg"></div>
      </div>

      {/* Timeframe Buttons */}
      <div className="flex gap-4 mb-6">
        {["1D", "1W", "1M", "3M", "1Y"].map(view => (
          <button
            key={view}
            className={`py-1 px-3 rounded ${chartView === view ? "bg-blue-600" : "bg-gray-800 hover:bg-gray-700"}`}
            onClick={() => setChartView(view)}
          >
            {view}
          </button>
        ))}
      </div>

      {/* Technical Indicators */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Technical Indicators</h3>
        <div className="flex gap-3 flex-wrap">
          {technicalIndicators.map(ind => (
            <button
              key={ind}
              onClick={() => toggleIndicator(ind)}
              className={`py-1 px-3 rounded border ${selectedIndicators.includes(ind) ? "bg-blue-700" : "border-gray-600"}`}
            >
              {ind}
            </button>
          ))}
        </div>
      </div>

      {/* Drawing Tools */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Drawing Tools</h3>
        <div className="flex gap-3 flex-wrap">
          {drawingTools.map(tool => (
            <button
              key={tool}
              onClick={() => toggleDrawingTool(tool)}
              className={`py-1 px-3 rounded border ${selectedDrawingTools.includes(tool) ? "bg-blue-700" : "border-gray-600"}`}
            >
              {tool}
            </button>
          ))}
        </div>
      </div>

      {/* Order Placement */}
      <div className="flex gap-4 mb-6">
        <button className="flex-1 bg-blue-700 py-3 rounded font-semibold hover:bg-blue-600">Buy</button>
        <button className="flex-1 bg-red-600 py-3 rounded font-semibold hover:bg-red-500">Sell</button>
      </div>

      {/* Chart Layouts & Multi-Chart */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Save current layout..."
            className="bg-gray-800 px-4 py-2 rounded w-64"
          />
          <button className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-600">Save</button>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map(num => (
            <button
              key={num}
              className={`px-3 py-1 rounded ${num === 1 ? "bg-blue-700" : "bg-gray-800 hover:bg-gray-700"}`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
