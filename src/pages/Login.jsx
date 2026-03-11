import { ArrowRight, Lock, Mail, ShieldCheck } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (email === "admin@ronak.com" && password === "admin123") {
      localStorage.setItem("isAuth", "true");
      toast.success("Login successful!");
      onLogin();
    } else {
      toast.error("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card shadow-lg border-0">
        <div className="text-center mb-4">
          <div className="login-icon-box mb-3">
            <ShieldCheck size={40} className="text-primary" />
          </div>
          <h2 className="fw-bold text-dark">Login Here</h2>
          <p className="text-muted small">Please enter your details to login</p>
        </div>

        <form onSubmit={handleLoginSubmit}>
          <div className="mb-3">
            <label className="form-label small fw-bold text-secondary">
              Email Address
            </label>
            <div className="input-group custom-input-group">
              <span className="input-group-text bg-transparent border-end-0">
                <Mail size={18} className="text-muted" />
              </span>
              <input
                type="email"
                className="form-control border-start-0 ps-1"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label small fw-bold text-secondary">
              Password
            </label>
            <div className="input-group custom-input-group">
              <span className="input-group-text bg-transparent border-end-0">
                <Lock size={18} className="text-muted" />
              </span>
              <input
                type="password"
                className="form-control border-start-0 ps-1"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-3 fw-bold btn-login"
          >
            Sign In <ArrowRight size={18} className="ms-2" />
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-muted small mb-0">
            Forgot your password?{" "}
            <a href="#" className="text-primary text-decoration-none fw-bold">
              Reset here
            </a>
          </p>
        </div>
      </div>

      <div className="bg-circle circle-1"></div>
      <div className="bg-circle circle-2"></div>
    </div>
  );
};

export default Login;
