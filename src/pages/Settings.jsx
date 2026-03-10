import { Camera, Mail, Save, User } from "lucide-react";
import { useRef, useState } from "react";
import "./Settings.css";

const Settings = ({ isDarkMode }) => {
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [profile, setProfile] = useState({
    name: "Ronak",
    email: "ronak@example.com",
    role: "Administrator",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    alert("Profile Updated Successfully!");
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password Changed Successfully!");
  };

  return (
    <div className="container-fluid p-4">
      <h2 className={`fw-bold mb-4 ${isDarkMode ? "text-white" : ""}`}>
        Settings
      </h2>

      <div className="row">
        <div className="col-lg-8">
          <div
            className={`card border-0 shadow-sm mb-4 ${isDarkMode ? "bg-dark text-white border-secondary" : "bg-white"}`}
          >
            <div className="card-header bg-transparent border-bottom py-3">
              <h5 className="mb-0 fw-bold">Profile Information</h5>
            </div>
            <div className="card-body">
              <div className="d-flex align-items-center mb-4">
                <div className="position-relative">
                  {image ? (
                    <img
                      src={image}
                      alt="profile"
                      className="rounded-circle object-fit-cover"
                      style={{
                        width: "80px",
                        height: "80px",
                        border: "2px solid #0d6efd",
                      }}
                    />
                  ) : (
                    <div
                      className="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white fw-bold"
                      style={{
                        width: "80px",
                        height: "80px",
                        fontSize: "24px",
                      }}
                    >
                      {profile.name.charAt(0)}
                    </div>
                  )}

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="d-none"
                  />

                  <button
                    onClick={triggerFileInput}
                    className="btn btn-sm btn-primary position-absolute bottom-0 end-0 rounded-circle p-1 shadow"
                  >
                    <Camera size={16} />
                  </button>
                </div>

                <div className="ms-4">
                  <h5 className="mb-1 fw-bold">{profile.name}</h5>
                  <p className="text-muted small mb-0">{profile.role}</p>
                </div>
              </div>

              <form onSubmit={handleProfileSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label small fw-bold">
                      Full Name
                    </label>
                    <div className="input-group">
                      <span
                        className={`input-group-text ${isDarkMode ? "bg-dark border-secondary text-white" : "bg-light"}`}
                      >
                        <User size={18} />
                      </span>
                      <input
                        type="text"
                        className={`form-control ${isDarkMode ? "bg-dark border-secondary text-white" : ""}`}
                        value={profile.name}
                        onChange={(e) =>
                          setProfile({ ...profile, name: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label small fw-bold">
                      Email Address
                    </label>
                    <div className="input-group">
                      <span
                        className={`input-group-text ${isDarkMode ? "bg-dark border-secondary text-white" : "bg-light"}`}
                      >
                        <Mail size={18} />
                      </span>
                      <input
                        type="email"
                        className={`form-control ${isDarkMode ? "bg-dark border-secondary text-white" : ""}`}
                        value={profile.email}
                        onChange={(e) =>
                          setProfile({ ...profile, email: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary mt-2">
                  <Save size={18} className="me-2" /> Save Changes
                </button>
              </form>
            </div>
          </div>

          <div
            className={`card border-0 shadow-sm ${isDarkMode ? "bg-dark text-white border-secondary" : "bg-white"}`}
          >
            <div className="card-header bg-transparent border-bottom py-3">
              <h5 className="mb-0 fw-bold">Change Password</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handlePasswordSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-bold">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className={`form-control ${isDarkMode ? "bg-dark border-secondary text-white" : ""}`}
                    onChange={(e) =>
                      setPasswords({ ...passwords, current: e.target.value })
                    }
                  />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label small fw-bold">
                      New Password
                    </label>
                    <input
                      type="password"
                      className={`form-control ${isDarkMode ? "bg-dark border-secondary text-white" : ""}`}
                      onChange={(e) =>
                        setPasswords({ ...passwords, new: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label small fw-bold">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className={`form-control ${isDarkMode ? "bg-dark border-secondary text-white" : ""}`}
                      onChange={(e) =>
                        setPasswords({ ...passwords, confirm: e.target.value })
                      }
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-outline-primary mt-2">
                  Update Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
