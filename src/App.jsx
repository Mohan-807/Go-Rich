// src/App.jsx
import { Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import DemoAccount from "./components/DemoAccount.jsx";
import Notifications from "./components/Notifications.jsx";
import Orders from "./components/Orders.jsx";
import Portfolio from "./components/Portfolio.jsx";
import StockChart from "./components/StockChart.jsx";
import StockDetails from "./components/StockDetails.jsx";
import Watchlist from "./components/WatchList.jsx";

export default function App() {
  // Update these links as needed for your navigation bar
  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Watchlist", path: "/watchlist" },
    { name: "Orders", path: "/orders" },
    { name: "Charts", path: "/charts" },
    { name: "Symbol", path: "/symbol" },
    { name: "Demo", path: "/demo" },
    { name: "Notifications", path: "/notifications" },
  ];

  return (
    <div className="bg-gray-500 h-screen flex flex-col relative overflow-hidden transition-all duration-500 text-white">
      {/* Fixed navbar */}
      <div>
        <nav className="bg-gray-500 p-4 flex gap-6 items-center border-b">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-800' : ''}`
              }
              end={item.path === "/"}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Padding top to avoid overlap with fixed navbar */}
      <div className="flex flex-auto overflow-hidden">
        <div className="flex flex-col flex-auto overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/charts" element={<StockChart />} />
            <Route path="/symbol" element={<StockDetails />} />
            <Route path="/demo" element={<DemoAccount />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </div>
      </div>
    </div>
  );

}
