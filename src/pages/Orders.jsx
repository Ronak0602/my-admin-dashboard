import { Plus, RefreshCw, Search, Trash2, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import "./Orders.css";

const Orders = ({ isDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState({
    customer: "",
    item: "",
    amount: "",
    status: "Pending",
  });

  const [orders, setOrders] = useState([
    {
      id: "49488",
      customer: "Hiten Sharma",
      item: "Laptop",
      amount: 55000,
      status: "Pending",
    },
    {
      id: "47794",
      customer: "Raju Kumar",
      item: "iPhone 15",
      amount: 72000,
      status: "Delivered",
    },
    {
      id: "48833",
      customer: "Ramesh Singh",
      item: "Headphones",
      amount: 2500,
      status: "Cancelled",
    },
  ]);

  const handleAddOrder = (e) => {
    e.preventDefault();
    const newOrder = {
      ...currentOrder,
      id: Math.floor(10000 + Math.random() * 90000).toString(),
      amount: Number(currentOrder.amount),
    };
    setOrders([newOrder, ...orders]);
    setShowModal(false);
    setCurrentOrder({ customer: "", item: "", amount: "", status: "Pending" });
    toast.success("Order added successfully!");
  };

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
      toast.error("Order deleted!");
    }
  };

  const filteredOrders = orders.filter(
    (o) =>
      o.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.id.includes(searchTerm),
  );

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className={`fw-bold m-0 ${isDarkMode ? "text-white" : ""}`}>
          Orders Management
        </h2>
        <button
          className="btn btn-primary d-flex align-items-center shadow-sm"
          onClick={() => setShowModal(true)}
        >
          <Plus size={18} className="me-2" /> Add New Order
        </button>
      </div>

      <div
        className={`card shadow-sm border-0 ${isDarkMode ? "bg-dark text-white" : "bg-white"}`}
      >
        <div className="card-header bg-transparent border-bottom py-3">
          <div className="input-group" style={{ maxWidth: "350px" }}>
            <span
              className={`input-group-text bg-transparent border-end-0 ${isDarkMode ? "border-secondary" : ""}`}
            >
              <Search
                size={18}
                className={isDarkMode ? "text-white" : "text-muted"}
              />
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

      {showModal && (
        <div className="custom-modal-overlay">
          <div
            className={`custom-modal-content ${isDarkMode ? "bg-dark text-white border border-secondary" : "bg-white"}`}
          >
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
              <h5 className="m-0 fw-bold">Add New Order</h5>
              <button
                className="btn btn-link text-muted p-0"
                onClick={() => setShowModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddOrder}>
              <div className="mb-3">
                <label className="form-label small fw-bold">
                  Customer Name
                </label>
                <input
                  type="text"
                  required
                  className={`form-control ${isDarkMode ? "bg-dark text-white border-secondary" : ""}`}
                  value={currentOrder.customer}
                  onChange={(e) =>
                    setCurrentOrder({
                      ...currentOrder,
                      customer: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold">Item Name</label>
                <input
                  type="text"
                  required
                  className={`form-control ${isDarkMode ? "bg-dark text-white border-secondary" : ""}`}
                  value={currentOrder.item}
                  onChange={(e) =>
                    setCurrentOrder({ ...currentOrder, item: e.target.value })
                  }
                />
              </div>
              <div className="row mb-4">
                <div className="col-6">
                  <label className="form-label small fw-bold">Amount (₹)</label>
                  <input
                    type="number"
                    required
                    className={`form-control ${isDarkMode ? "bg-dark text-white border-secondary" : ""}`}
                    value={currentOrder.amount}
                    onChange={(e) =>
                      setCurrentOrder({
                        ...currentOrder,
                        amount: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-6">
                  <label className="form-label small fw-bold">Status</label>
                  <select
                    className={`form-select ${isDarkMode ? "bg-dark text-white border-secondary" : ""}`}
                    value={currentOrder.status}
                    onChange={(e) =>
                      setCurrentOrder({
                        ...currentOrder,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
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
                <button
                  type="submit"
                  className="btn btn-primary px-4 shadow-sm"
                >
                  Create Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
