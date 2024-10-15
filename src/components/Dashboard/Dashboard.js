import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js"; // Import Chart and registerables
import "bootstrap/dist/css/bootstrap.min.css";

// Register all necessary components
Chart.register(...registerables);

// Sample data for demonstration
const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Sales",
      data: [300, 500, 200, 400, 600, 800, 700],
      fill: false,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
    },
  ],
};

const Dashboard = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to take the specified width and height
  };

  return (
    <div className="container">
      <h1 className="my-4">FMCG Dashboard</h1>

      <div className="row">
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Total Sales</h5>
              <p className="card-text">$10,000</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Total Customers</h5>
              <p className="card-text">1,200</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Products Sold</h5>
              <p className="card-text">3,500</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="card mb-4 shadow-sm">
            <div className="card-body" style={{ height: "400px" }}>
              {" "}
              {/* Set a specific height */}
              <h5 className="card-title">Sales Trends</h5>
              <div
                style={{ position: "relative", height: "100%", width: "100%" }}
              >
                <Line data={data} options={options} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
