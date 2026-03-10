import { Edit, Plus, Search, Trash2, UserCheck, UserX, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import "./Users.css";

const UsersPage = ({ isDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    role: "User",
    status: "Active",
  });
  const [isEditing, setIsEditing] = useState(false);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Riya Patel",
      email: "riya@example.com",
      role: "Editor",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Amit Kumar",
      email: "amit@example.com",
      role: "User",
      status: "Active",
    },
    {
      id: 4,
      name: "Sneha Singh",
      email: "sneha@example.com",
      role: "User",
      status: "Active",
    },
  ]);

  const handleAddClick = () => {
    setCurrentUser({ name: "", email: "", role: "User", status: "Active" });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEditClick = (user) => {
    setCurrentUser(user);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    const emailValue = currentUser.email.toLowerCase();
    if (!emailValue.endsWith(".com")) {
      toast.error("please enter a valid email address!");
      return;
    }
    if (isEditing) {
      setUsers(users.map((u) => (u.id === currentUser.id ? currentUser : u)));
    } else {
      setUsers([...users, { ...currentUser, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="container-fluid p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className={`fw-bold m-0 ${isDarkMode ? "text-white" : ""}`}>
          User Management
        </h2>
        <button
          className="btn btn-primary d-flex align-items-center shadow-sm"
          onClick={handleAddClick}
        >
          <Plus size={18} className="me-2" /> Add New User
        </button>
      </div>

      {/* Table Card */}
      <div
        className={`card shadow-sm border-0 ${isDarkMode ? "bg-dark text-white" : "bg-white"}`}
      >
        <div className="card-header bg-transparent border-bottom py-3">
          <div className="input-group" style={{ maxWidth: "350px" }}>
            <span className="input-group-text bg-transparent border-end-0">
              <Search size={18} className="text-muted" />
            </span>
            <input
              type="text"
              className={`form-control border-start-0 ${isDarkMode ? "bg-dark text-white border-secondary shadow-none" : ""}`}
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table
              className={`table table-hover mb-0 ${isDarkMode ? "table-dark" : ""}`}
            >
              <thead>
                <tr>
                  <th className="ps-4 py-3">NAME</th>
                  <th>EMAIL</th>
                  <th>ROLE</th>
                  <th>STATUS</th>
                  <th className="text-end pe-4">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="align-middle">
                    <td className="ps-4 py-3 fw-medium">{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span
                        className={`badge border ${isDarkMode ? "bg-secondary text-white border-secondary" : "bg-light text-dark"}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td>
                      {user.status === "Active" ? (
                        <span className="text-success d-flex align-items-center">
                          <UserCheck size={16} className="me-1" /> Active
                        </span>
                      ) : (
                        <span className="text-danger d-flex align-items-center">
                          <UserX size={16} className="me-1" /> Inactive
                        </span>
                      )}
                    </td>
                    <td className="text-end pe-4">
                      <button
                        className="btn btn-sm btn-link text-info me-2 p-0"
                        onClick={() => handleEditClick(user)}
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        className="btn btn-sm btn-link text-danger p-0"
                        onClick={() => deleteUser(user.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="custom-modal-overlay">
          <div
            className={`custom-modal-content ${isDarkMode ? "bg-dark text-white border border-secondary" : "bg-white"}`}
          >
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
              <h5 className="m-0 fw-bold">
                {isEditing ? "Edit User" : "Add New User"}
              </h5>
              <button
                className="btn btn-link text-muted p-0"
                onClick={() => setShowModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSaveUser}>
              <div className="mb-3">
                <label className="form-label small fw-bold">Full Name</label>
                <input
                  type="text"
                  required
                  className={`form-control ${isDarkMode ? "bg-dark text-white border-secondary" : ""}`}
                  value={currentUser.name}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, name: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  className={`form-control ${isDarkMode ? "bg-dark text-white border-secondary" : ""}`}
                  value={currentUser.email}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, email: e.target.value })
                  }
                />
              </div>
              <div className="row mb-4">
                <div className="col-6">
                  <label className="form-label small fw-bold">Role</label>
                  <select
                    className={`form-select ${isDarkMode ? "bg-dark text-white border-secondary" : ""}`}
                    value={currentUser.role}
                    onChange={(e) =>
                      setCurrentUser({ ...currentUser, role: e.target.value })
                    }
                  >
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="User">User</option>
                  </select>
                </div>
                <div className="col-6">
                  <label className="form-label small fw-bold">Status</label>
                  <select
                    className={`form-select ${isDarkMode ? "bg-dark text-white border-secondary" : ""}`}
                    value={currentUser.status}
                    onChange={(e) =>
                      setCurrentUser({ ...currentUser, status: e.target.value })
                    }
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="d-flex justify-content-end gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-light px-4 border"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary px-4">
                  {isEditing ? "Update User" : "Add User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
