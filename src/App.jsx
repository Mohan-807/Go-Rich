// src/App.jsx
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout.jsx";

import DemoAccount from "./components/DemoAccount.jsx";
import Orders from "./components/Orders.jsx";

// Other imports commented out for now
// import Dashboard from "./components/Dashboard.jsx";
// import Portfolio from "./components/Portfolio.jsx";
// import Watchlist from "./components/WatchList.jsx";
// import StockChart from "./components/StockChart.jsx";
// import StockDetails from "./components/StockDetails.jsx";
// import Notifications from "./components/Notifications.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Default route changed to demo */}
        <Route index element={<DemoAccount />} />
        
        {/* Active routes */}
        <Route path="demo" element={<DemoAccount />} />
        <Route path="orders" element={<Orders />} />

        {/* Other routes commented out */}
        {/*
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="watchlist" element={<Watchlist />} />
        <Route path="charts" element={<StockChart />} />
        <Route path="symbol" element={<StockDetails />} />
        <Route path="notifications" element={<Notifications />} />
        */}
      </Route>
    </Routes>
  );
}
