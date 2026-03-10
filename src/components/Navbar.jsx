import { Bell, LogOut, Menu, Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import "../App.css";

const notificationsData = [
  { id: 1, text: "4 new messages", time: "3 mins", icon: "fas fa-envelope" },
  { id: 2, text: "8 friend requests", time: "12 hours", icon: "fas fa-users" },
  { id: 3, text: "3 new reports", time: "2 days", icon: "fas fa-file" },
  { id: 4, text: "Server Rebooted", time: "5 mins", icon: "fas fa-server" },
  {
    id: 5,
    text: "New Login detected",
    time: "1 hour",
    icon: "fas fa-shield-alt",
  },
];

const Navbar = ({ onToggle, onThemeToggle, isDarkMode, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`navbar navbar-expand border-bottom ${isDarkMode ? "bg-dark navbar-dark border-secondary" : "bg-white"}`}
    >
      <button
        className={`btn border-0 me-3 ${isDarkMode ? "btn-dark text-white" : "btn-light"}`}
        onClick={onToggle}
      >
        <Menu size={20} />
      </button>

      <div className="ms-auto d-flex align-items-center">
        <button
          className="btn btn-link nav-link me-3 p-0 border-0"
          onClick={onThemeToggle}
        >
          {isDarkMode ? (
            <Sun size={20} className="text-warning" />
          ) : (
            <Moon size={20} className="text-muted" />
          )}
        </button>

        <div className="dropdown me-3" ref={dropdownRef}>
          <div
            style={{ cursor: "pointer", position: "relative" }}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <Bell
              className={isDarkMode ? "text-light" : "text-muted"}
              size={20}
            />
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: "10px" }}
            >
              {notificationsData.length}
            </span>
          </div>

          <div
            className={`dropdown-menu dropdown-menu-end p-0 shadow border-0 ${isDarkMode ? "dropdown-menu-dark" : ""} ${showDropdown ? "show" : ""}`}
            style={{
              width: "300px",
              display: showDropdown ? "block" : "none",
              position: "absolute",
              right: 0,
              marginTop: "10px",
              zIndex: 1050,
            }}
          >
            <span className="dropdown-item dropdown-header text-center py-3 fw-bold border-bottom">
              {notificationsData.length} Notifications
            </span>
            <div style={{ maxHeight: "350px", overflowY: "auto" }}>
              {notificationsData.map((note) => (
                <a
                  key={note.id}
                  href="#"
                  className="dropdown-item d-flex align-items-center py-3 border-bottom"
                  onClick={() => setShowDropdown(false)}
                >
                  <i
                    className={`${note.icon} me-3 text-secondary`}
                    style={{ width: "20px", textAlign: "center" }}
                  ></i>
                  <div className="flex-grow-1 text-wrap">
                    <span className="small d-block">{note.text}</span>
                  </div>
                  <span
                    className="text-muted small ms-2"
                    style={{ minWidth: "50px", textAlign: "right" }}
                  >
                    {note.time}
                  </span>
                </a>
              ))}
            </div>

            <button
              className="dropdown-item dropdown-footer text-center py-2 small text-primary fw-bold border-0 bg-transparent w-100"
              onClick={() => setShowDropdown(false)}
            >
              See All Notifications
            </button>
          </div>
        </div>

        <div className="d-flex align-items-center border-start ps-3">
          <span
            className={`me-2 fw-semibold small d-none d-md-inline ${isDarkMode ? "text-white" : "text-dark"}`}
          >
            Admin User
          </span>
          <img
            src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff"
            className="rounded-circle me-2"
            width="30"
            alt="user"
          />
          <button
            className="btn btn-link text-danger p-0 ms-2 border-0"
            onClick={onLogout}
            style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
