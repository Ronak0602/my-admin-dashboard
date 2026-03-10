import {
  BarChart3,
  LayoutDashboard,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const TempSidebar = ({ isopen }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: "/", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { path: "/users", icon: <Users size={20} />, label: "Users" },
    { path: "/orders", icon: <ShoppingCart size={20} />, label: "Orders" },
    { path: "/reports", icon: <BarChart3 size={20} />, label: "Reports" },
    {
      path: "/settings",
      icon: <Settings size={20} />,
      label: "Settings",
      borderTop: true,
    },
  ];

  return (
    <div
      className="bg-dark text-white shadow"
      style={{
        width: isopen ? "250px" : "70px",
        height: "100vh",
        position: "fixed",
        transition: "width 0.3s ease-in-out",
        overflowX: "hidden",
        zIndex: 1000,
      }}
    >
      <div className="sidebar-header border-bottom border-secondary">
        <h4 className="fw-bold m-0 text-nowrap">
          {isopen ? "AdminLTE React" : "ALR"}
        </h4>
      </div>

      <div className="mt-3">
        <ul className="nav flex-column">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`nav-item ${item.borderTop ? "border-top border-secondary mt-2" : ""}`}
            >
              <Link
                to={item.path}
                className={`nav-link text-white p-3 d-flex align-items-center ${
                  isActive(item.path) ? "bg-primary active" : ""
                }`}
                style={{ transition: "background 0.2s" }}
              >
                <div
                  style={{ minWidth: "25px" }}
                  className="d-flex justify-content-center"
                >
                  {item.icon}
                </div>

                <span
                  className={`ms-3 ${isopen ? "d-inline" : "d-none"}`}
                  style={{ whiteSpace: "nowrap" }}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TempSidebar;
