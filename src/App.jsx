// src/App.jsx
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout.jsx";

import Dashboard from "./components/Dashboard.jsx";
import Portfolio from "./components/Portfolio.jsx";
import Watchlist from "./components/WatchList.jsx";
import Orders from "./components/Orders.jsx";
import StockChart from "./components/StockChart.jsx";
import StockDetails from "./components/StockDetails.jsx";
import DemoAccount from "./components/DemoAccount.jsx";
import Notifications from "./components/Notifications.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="watchlist" element={<Watchlist />} />
        <Route path="orders" element={<Orders />} />
        <Route path="charts" element={<StockChart />} />
        <Route path="symbol" element={<StockDetails />} />
        <Route path="demo" element={<DemoAccount />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>
    </Routes>
  );
}
