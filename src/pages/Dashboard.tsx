import React from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  // Steps data
  const stepsChartOptions: ApexOptions = {
    chart: {
      type: "line",
      height: 350,
    },
    xaxis: {
      categories: ["2025-01-08", "2025-01-09", "2025-01-10", "2025-01-11"],
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Steps Over Time",
    },
  };

  const stepsChartData = [
    {
      name: "Steps",
      data: [10000, 12000, 8000, 14000],
    },
  ];

  // Weight data
  const weightChartOptions: ApexOptions = {
    chart: { type: "line", height: 350 },
    xaxis: {
      categories: ["2025-01-08", "2025-01-09", "2025-01-10", "2025-01-11"],
    },
    stroke: { curve: "smooth" },
    title: { text: "Weight Over Time" },
  };

  const weightChartData = [
    { name: "Weight (kg)", data: [70, 69.8, 70.1, 69.7] },
  ];

  // Lean Body Mass data
  const leanBodyMassChartOptions: ApexOptions = {
    chart: { type: "line", height: 350 },
    xaxis: {
      categories: ["2025-01-08", "2025-01-09", "2025-01-10", "2025-01-11"],
    },
    stroke: { curve: "smooth" },
    title: { text: "Lean Body Mass Over Time" },
  };

  const leanBodyMassChartData = [
    { name: "Lean Body Mass (kg)", data: [62, 61.9, 62.1, 61.8] },
  ];

  // Calories Burned data
  const caloriesChartOptions: ApexOptions = {
    chart: { type: "line", height: 350 },
    xaxis: {
      categories: ["2025-01-08", "2025-01-09", "2025-01-10", "2025-01-11"],
    },
    stroke: { curve: "smooth" },
    title: { text: "Calories Burned Over Time" },
  };

  const caloriesChartData = [
    { name: "Calories Burned", data: [2500, 2700, 2600, 2800] },
  ];

  // Heart Rate data
  const heartRateChartOptions: ApexOptions = {
    chart: { type: "line", height: 350 },
    xaxis: {
      categories: ["2025-01-08", "2025-01-09", "2025-01-10", "2025-01-11"],
    },
    stroke: { curve: "smooth" },
    title: { text: "Heart Rate Over Time" },
  };

  const heartRateChartData = [
    { name: "Heart Rate (BPM)", data: [70, 72, 71, 73] },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <List>
          <ListItemButton>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              navigate("/login");
            }}
          >
            <ListItemText primary="Login" />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              navigate("/login");
            }}
          >
            <ListItemText primary="Register" />
          </ListItemButton>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Health Metrics Dashboard
        </Typography>

        {/* Grid container for charts */}
        <div className="dashboard-container">
          <div className="chart-container">
            <ReactApexChart
              options={stepsChartOptions}
              series={stepsChartData}
              type="line"
              height={350}
            />
          </div>
          <div className="chart-container">
            <ReactApexChart
              options={weightChartOptions}
              series={weightChartData}
              type="line"
              height={350}
            />
          </div>
          <div className="chart-container">
            <ReactApexChart
              options={leanBodyMassChartOptions}
              series={leanBodyMassChartData}
              type="line"
              height={350}
            />
          </div>
          <div className="chart-container">
            <ReactApexChart
              options={caloriesChartOptions}
              series={caloriesChartData}
              type="line"
              height={350}
            />
          </div>
          <div className="chart-container">
            <ReactApexChart
              options={heartRateChartOptions}
              series={heartRateChartData}
              type="line"
              height={350}
            />
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default DashboardPage;
