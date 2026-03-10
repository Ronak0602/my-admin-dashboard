import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, ShoppingBag, TrendingUp, Users } from "lucide-react";
import { useRef } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./Reports.css";

const Reports = ({ isDarkMode }) => {
  const reportRef = useRef();

  const salesData = [
    { name: "Jan", sales: 4000, orders: 240 },
    { name: "Feb", sales: 3000, orders: 198 },
    { name: "Mar", sales: 5000, orders: 305 },
    { name: "Apr", sales: 2780, orders: 150 },
    { name: "May", sales: 1890, orders: 120 },
    { name: "Jun", sales: 2390, orders: 190 },
  ];

  const pieData = [
    { name: "Electronics", value: 400 },
    { name: "Fashion", value: 300 },
    { name: "Groceries", value: 300 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  const handleExportPDF = () => {
    const element = reportRef.current;
    html2canvas(element, {
      scale: 2,
      backgroundColor: isDarkMode ? "#1a1d20" : "#ffffff",
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Business_Report.pdf");
    });
  };

  return (
    <div className="container-fluid p-4" ref={reportRef}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className={`fw-bold m-0 ${isDarkMode ? "text-white" : ""}`}>
          Analytics Reports
        </h2>
        <button
          className="btn btn-primary d-flex align-items-center shadow-sm"
          onClick={handleExportPDF}
        >
          <Download size={18} className="me-2" /> Export PDF
        </button>
      </div>

      <div className="row mb-4">
        {[
          {
            title: "Total Revenue",
            value: "₹2,45,000",
            icon: <TrendingUp className="text-success" />,
            trend: "+12%",
          },
          {
            title: "Active Users",
            value: "1,240",
            icon: <Users className="text-info" />,
            trend: "+5%",
          },
          {
            title: "New Orders",
            value: "85",
            icon: <ShoppingBag className="text-warning" />,
            trend: "+18%",
          },
        ].map((stat, i) => (
          <div className="col-md-4" key={i}>
            <div
              className={`card border-0 shadow-sm p-3 ${isDarkMode ? "bg-dark text-white border-secondary" : "bg-white"}`}
            >
              <div className="d-flex justify-content-between">
                <div>
                  <p className="text-muted small mb-1">{stat.title}</p>
                  <h3 className="fw-bold mb-0">{stat.value}</h3>
                  <span className="text-success small">
                    {stat.trend} than last month
                  </span>
                </div>
                <div className="p-3 bg-light-subtle rounded-circle h-50">
                  {stat.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col-md-8 mb-4">
          <div
            className={`card border-0 shadow-sm p-4 h-100 ${isDarkMode ? "bg-dark text-white" : "bg-white"}`}
          >
            <h5 className="mb-4 fw-bold">Sales Overview</h5>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d6efd" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#0d6efd" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={isDarkMode ? "#444" : "#eee"}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    stroke={isDarkMode ? "#adb5bd" : "#666"}
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke={isDarkMode ? "#adb5bd" : "#666"}
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDarkMode ? "#212529" : "#fff",
                      borderColor: "#444",
                      color: isDarkMode ? "#fff" : "#000",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#0d6efd"
                    fillOpacity={1}
                    fill="url(#colorSales)"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div
            className={`card border-0 shadow-sm p-4 h-100 ${isDarkMode ? "bg-dark text-white" : "bg-white"}`}
          >
            <h5 className="mb-4 fw-bold">Top Categories</h5>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
