// src/components/MainLayout.jsx
import { NavLink, Outlet } from "react-router-dom";

export default function MainLayout() {
  const navItems = [
    // { name: "Dashboard", path: "/" },
    // { name: "Portfolio", path: "/portfolio" },
    // { name: "Watchlist", path: "/watchlist" },
    { name: "Demo", path: "/demo" },
    { name: "Orders", path: "/orders" },
    // { name: "Charts", path: "/charts" },
    // { name: "Symbol", path: "/symbol" },
    // { name: "Notifications", path: "/notifications" },
  ];

  return (
    <div className="bg-gray-500 h-screen flex flex-col overflow-hidden transition-all duration-500 text-white">
      {/* Navbar */}
      <nav className="bg-gray-500 p-4 flex gap-6 items-center border-b">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `px-4 py-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-800" : ""
              }`
            }
            end={item.path === "/"}
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Content area below navbar */}
      <div className="flex flex-auto overflow-hidden">
        <div className="flex flex-col flex-auto overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
