import "bootstrap/dist/css/bootstrap.min.css";
import { LogOut, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import TempSidebar from "./components/TempSidebar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Orders from "./pages/Orders.jsx";
import Reports from "./pages/Reports.jsx";
import Settings from "./pages/Settings.jsx";
import UsersPage from "./pages/Users.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("isAuth");
    if (auth === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const confirmLogout = () => {
    localStorage.removeItem("isAuth");
    setIsLoggedIn(false);
    setShowLogoutModal(false);
    toast.success("Logged out successfully!");
  };

  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />

      {showLogoutModal && (
        <div className="logout-overlay">
          <div
            className={`logout-modal-card shadow-lg ${isDarkMode ? "bg-dark text-white border border-secondary" : "bg-white"}`}
          >
            <div className="text-end">
              <button
                className="btn btn-link text-muted p-0"
                onClick={() => setShowLogoutModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="text-center p-2">
              <div className="logout-icon-bg mb-3">
                <LogOut size={32} className="text-danger" />
              </div>
              <h4 className="fw-bold">Are you sure?</h4>
              <p className="text-muted small">Do you really want to logout?</p>

              <div className="d-flex justify-content-center gap-3 mt-4">
                <button
                  className="btn btn-light px-4 border fw-semibold"
                  onClick={() => setShowLogoutModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger px-4 fw-semibold shadow-sm"
                  onClick={confirmLogout}
                >
                  Yes, Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isLoggedIn ? (
        <Routes>
          <Route
            path="/login"
            element={<Login onLogin={() => setIsLoggedIn(true)} />}
          />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </Routes>
      ) : (
        <div
          className={`d-flex ${isDarkMode ? "bg-dark text-white" : "bg-light text-dark"}`}
          style={{ minHeight: "100vh", width: "100vw", overflow: "hidden" }}
        >
          <TempSidebar isopen={isSidebarOpen} isDarkMode={isDarkMode} />

          <div
            className="flex-grow-1"
            style={{
              marginLeft: isSidebarOpen ? "250px" : "70px",
              transition: "margin-left 0.3s ease-in-out",
              backgroundColor: isDarkMode ? "#1a1d20" : "#f4f6f9",
              width: "100%",
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              minWidth: 0,
              overflow: "hidden",
            }}
          >
            <Navbar
              onToggle={toggleSidebar}
              onThemeToggle={toggleTheme}
              isDarkMode={isDarkMode}
              onLogout={() => setShowLogoutModal(true)}
            />

            <div
              className="p-4"
              style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}
            >
              <Routes>
                <Route
                  path="/"
                  element={<Dashboard isDarkMode={isDarkMode} />}
                />
                <Route
                  path="/users"
                  element={<UsersPage isDarkMode={isDarkMode} />}
                />
                <Route
                  path="/orders"
                  element={<Orders isDarkMode={isDarkMode} />}
                />
                <Route
                  path="/reports"
                  element={<Reports isDarkMode={isDarkMode} />}
                />
                <Route
                  path="/settings"
                  element={<Settings isDarkMode={isDarkMode} />}
                />
                <Route path="*" element={<Navigate replace to="/" />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;
