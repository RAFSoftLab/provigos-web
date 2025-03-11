import React, { useEffect, useState } from "react";
import { Box, CssBaseline, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "../components/Sidebar";
import { useUser } from "../components/UserContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { REACT_APP_API_ORIGIN } from "../common/Config";
import { healthConnectKeys } from "../common/healthConnect";

const DataDashboardPage: React.FC = () => {
  const { token } = useUser();
  const [currentUser, setCurrentUser] = useState("");
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token) as any;
      setCurrentUser(decoded["name"]);

      axios
        .get(REACT_APP_API_ORIGIN + "/customFieldsKeys", {
          headers: { Authorization: token },
        })
        .then((customFieldsKeysResponse) => {
          const connectionPromises = [
            axios.get(REACT_APP_API_ORIGIN + "/healthConnectIntegration", {
              headers: { Authorization: token },
            }),
            axios.get(REACT_APP_API_ORIGIN + "/customFieldsData", {
              headers: { Authorization: token },
            }),
          ];

          Promise.all(connectionPromises).then((responses) => {
            const [healthConnectResponse, customFieldsDataResponse] = responses;
          });
          axios
            .get(REACT_APP_API_ORIGIN + "/healthConnectIntegration", {
              headers: { Authorization: token },
            })
            .then((response) => {
              const values = response.data;
              //TODO Fix this, should not be steps
              const dates = Object.keys(values.steps);

              const formattedRows = dates.map((date, index) => {
                const row = { id: index, date };

                // Loop through each key in the values object to only include existing data
                Object.keys(values).forEach((key) => {
                  if (values[key][date] !== undefined) {
                    //@ts-ignore
                    row[key] = values[key][date];
                  }
                });

                return row;
              });
              //@ts-ignore
              setRows(formattedRows);
            })
            .catch((error) => console.error(error));
        });
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
    { field: "height", headerName: "Height", width: 180 },
    { field: "respiratoryRate", headerName: "Respiratory Rate", width: 180 },
    { field: "bloodGlucose", headerName: "Blood Glucose", width: 180 },
    { field: "oxygenSaturation", headerName: "Oxygen Saturation", width: 180 },
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
          <DataGrid
            rows={rows}
            columns={columns}
            //@ts-ignore
            pageSize={10}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default DataDashboardPage;
