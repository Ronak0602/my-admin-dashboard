import { BarChart, PieChart, ShoppingCart, UserPlus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Dashboard = ({ isDarkMode }) => {
  const [activeChart, setActiveChart] = useState("Area");

  const stats = [
    {
      title: "New Orders",
      value: "150",
      icon: <ShoppingCart size={40} />,
      color: "bg-info",
    },
    {
      title: "Bounce Rate",
      value: "53%",
      icon: <BarChart size={40} />,
      color: "bg-success",
    },
    {
      title: "User Registrations",
      value: "44",
      icon: <UserPlus size={40} />,
      color: "bg-warning text-dark",
    },
    {
      title: "Unique Visitors",
      value: "65",
      icon: <PieChart size={40} />,
      color: "bg-danger",
    },
  ];

  const data = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 5000 },
    { name: "Apr", sales: 2780 },
    { name: "May", sales: 1890 },
    { name: "Jun", sales: 2390 },
  ];

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
  ];

  return (
    <div className="container-fluid p-0">
      {/* Stat Cards Row */}
      <div className="row mt-4">
        {stats.map((item, index) => (
          <div className="col-lg-3 col-6" key={index}>
            <div
              className={`card ${item.color} text-white mb-4 shadow border-0`}
            >
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="fw-bold">{item.value}</h3>
                  <p className="mb-0">{item.title}</p>
                </div>
                <div className="opacity-25">{item.icon}</div>
              </div>
              <Link
                to="/"
                className="card-footer text-white d-flex justify-content-center text-decoration-none small"
              >
                More info <i className="fas fa-arrow-circle-right ms-2"></i>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Sales Report Chart Row */}
      <div className="row">
        <div className="col-lg-12">
          <div
            className={`card shadow mb-4 border-0 ${isDarkMode ? "bg-secondary text-white" : "bg-white text-dark"}`}
          >
            <div
              className={`card-header py-3 d-flex justify-content-between align-items-center ${isDarkMode ? "bg-dark border-secondary" : "bg-white"}`}
            >
              <h6
                className={`m-0 font-weight-bold ${isDarkMode ? "text-info" : "text-primary"}`}
              >
                Sales Report ({activeChart})
              </h6>
              {/* 3. Buttons ko dynamic banaya */}
              <div className="btn-group btn-group-sm">
                <button
                  className={`btn ${activeChart === "Area" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setActiveChart("Area")}
                >
                  Area
                </button>
                <button
                  className={`btn ${activeChart === "Donut" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setActiveChart("Donut")}
                >
                  Donut
                </button>
              </div>
            </div>
            <div className={`card-body ${isDarkMode ? "bg-dark" : "bg-white"}`}>
              <div style={{ width: "100%", height: 300, minWidth: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                  {/* 4. Conditional Rendering ka use kiya */}
                  {activeChart === "Area" ? (
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient
                          id="colorSales"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#007bff"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#007bff"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke={isDarkMode ? "#444" : "#ccc"}
                      />
                      <XAxis
                        dataKey="name"
                        tick={{ fill: isDarkMode ? "#fff" : "#666" }}
                      />
                      <YAxis tick={{ fill: isDarkMode ? "#fff" : "#666" }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: isDarkMode ? "#333" : "#fff",
                          borderColor: "#007bff",
                          color: isDarkMode ? "#fff" : "#000",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="sales"
                        stroke="#007bff"
                        fillOpacity={1}
                        fill="url(#colorSales)"
                      />
                    </AreaChart>
                  ) : (
                    <RechartsPieChart>
                      <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="sales"
                      >
                        {data.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div
            className={`card shadow mb-4 border-0 ${isDarkMode ? "bg-secondary text-white" : "bg-white text-dark"}`}
          >
            <div
              className={`card-header py-3 ${isDarkMode ? "bg-dark border-secondary" : "bg-white"}`}
            >
              <h6
                className={`m-0 font-weight-bold ${isDarkMode ? "text-info" : "text-primary"}`}
              >
                Recent Orders
              </h6>
            </div>
            <div className={`card-body ${isDarkMode ? "bg-dark" : "bg-white"}`}>
              <div className="table-responsive">
                <table
                  className={`table table-hover mb-0 ${isDarkMode ? "table-dark" : ""}`}
                >
                  <thead className={isDarkMode ? "table-dark" : "table-light"}>
                    <tr>
                      <th>Order ID</th>
                      <th>Product</th>
                      <th>Status</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#OR-1234</td>
                      <td>iPhone 15 Pro</td>
                      <td>
                        <span className="badge bg-success">Shipped</span>
                      </td>
                      <td>$999</td>
                    </tr>
                    <tr>
                      <td>#OR-1235</td>
                      <td>MacBook Air</td>
                      <td>
                        <span className="badge bg-warning text-dark">
                          Pending
                        </span>
                      </td>
                      <td>$1,200</td>
                    </tr>
                    <tr>
                      <td>#OR-1236</td>
                      <td>Airpods Pro</td>
                      <td>
                        <span className="badge bg-danger">Cancelled</span>
                      </td>
                      <td>$249</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
