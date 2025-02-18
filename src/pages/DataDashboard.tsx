import React, { useEffect, useState } from "react";
import { Box, CssBaseline, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "../components/Sidebar";
import { useUser } from "../components/UserContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { REACT_APP_API_ORIGIN } from "../common/Config";

const DataDashboardPage: React.FC = () => {
  const { token } = useUser();
  const [currentUser, setCurrentUser] = useState("");
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token) as any;
      setCurrentUser(decoded["name"]);

      axios
        .get(REACT_APP_API_ORIGIN + "/healthConnectIntegration", {
          headers: { Authorization: token },
        })
        .then((response) => {
          const values = response.data;
          const dates = Object.keys(values.steps);
          const formattedRows = dates.map((date, index) => ({
            id: index,
            date,
            steps: values.steps[date] || 0,
            weight: values.weight[date] || 0,
            leanBodyMass: values.leanBodyMass[date] || 0,
            heartRate: values.heartRate[date] || 0,
            caloriesBurned: values.caloriesBurned[date] || 0,
            bloodPressure: values.bloodPressure[date] || 0,
            bodyTemperature: values.bodyTemperature[date] || 0,
            bodyFat: values.bodyFat[date] || 0,
            height: values.height[date] || 0,
          }));
          //@ts-ignore
          setRows(formattedRows);
        })
        .catch((error) => console.error(error));
    }
  }, [token]);

  const columns = [
    { field: "date", headerName: "Date", width: 150 },
    { field: "steps", headerName: "Steps", width: 150 },
    { field: "weight", headerName: "Weight (kg)", width: 150 },
    { field: "leanBodyMass", headerName: "Lean Body Mass (kg)", width: 180 },
    { field: "heartRate", headerName: "Heart Rate (BPM)", width: 180 },
    { field: "caloriesBurned", headerName: "Calories Burned", width: 180 },
    { field: "bloodPressure", headerName: "Blood Pressure", width: 180 },
    { field: "bodyTemperature", headerName: "Body Temperature", width: 180 },
    { field: "bodyFat", headerName: "Body Fat", width: 180 },
    { field: "height", headerName: "Height", width: 180 }
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          PROVIGOS Health Metrics Dashboard
        </Typography>
        <Typography variant="subtitle1">
          Current User: {currentUser !== "" ? currentUser : "Not logged in"}
        </Typography>
        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} 
          //@ts-ignore
          pageSize={10} />
        </Box>
      </Box>
    </Box>
  );
};

export default DataDashboardPage;
