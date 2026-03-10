import { RefreshCw, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import "./Orders.css";

const Orders = ({ isDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([
    {
      id: "49488",
      customer: "Rahul Sharma",
      item: "Laptop",
      amount: 55000,
      status: "Pending",
    },
    {
      id: "47794",
      customer: "Amit Kumar",
      item: "iPhone 15",
      amount: 72000,
      status: "Delivered",
    },
    {
      id: "48833",
      customer: "Sonu Singh",
      item: "Headphones",
      amount: 2500,
      status: "Cancelled",
    },
  ]);

  const toggleStatus = (id) => {
    setOrders(
      orders.map((o) =>
        o.id === id
          ? { ...o, status: o.status === "Pending" ? "Delivered" : "Pending" }
          : o,
      ),
    );
  };

  const deleteOrder = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrders(orders.filter((o) => o.id !== id));
    }
  };

  const filteredOrders = orders.filter(
    (o) =>
      o.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.id.includes(searchTerm),
  );

  return (
    <div className="container-fluid p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className={`fw-bold m-0 ${isDarkMode ? "text-white" : ""}`}>
          Orders Management
        </h2>
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
              placeholder="Search by ID or Customer..."
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
                  <th className="ps-4 py-3">ORDER ID</th>
                  <th>CUSTOMER</th>
                  <th>ITEM</th>
                  <th>AMOUNT</th>
                  <th>STATUS</th>
                  <th className="text-end pe-4">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="align-middle">
                    <td className="ps-4 py-3 fw-bold">#{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.item}</td>
                    <td>₹{order.amount.toLocaleString()}</td>
                    <td>
                      <span
                        className={`badge border ${
                          order.status === "Delivered"
                            ? "bg-success-subtle text-success border-success"
                            : order.status === "Pending"
                              ? "bg-warning-subtle text-warning border-warning"
                              : "bg-danger-subtle text-danger border-danger"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="text-end pe-4">
                      <button
                        className="btn btn-sm btn-link text-info me-2 p-0"
                        onClick={() => toggleStatus(order.id)}
                      >
                        <RefreshCw size={18} />
                      </button>
                      <button
                        className="btn btn-sm btn-link text-danger p-0"
                        onClick={() => deleteOrder(order.id)}
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
    </div>
  );
};

export default Orders;
