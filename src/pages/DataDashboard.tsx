import React, { useEffect, useState } from "react";
import { Box, CssBaseline, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "../components/Sidebar";
import { useUser } from "../components/UserContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { REACT_APP_API_ORIGIN } from "../common/Config";

const COLUMN_WIDTH = 140

const healthConnectColumns = [
  { field: "date", headerName: "Date", width: COLUMN_WIDTH },
  { field: "steps", headerName: "Steps", width: COLUMN_WIDTH },
  { field: "weight", headerName: "Weight (kg)", width: COLUMN_WIDTH },
  { field: "leanBodyMass", headerName: "Lean Body Mass (kg)", width: COLUMN_WIDTH },
  { field: "heartRate", headerName: "Heart Rate (BPM)", width: COLUMN_WIDTH },
  { field: "caloriesBurned", headerName: "Calories Burned", width: COLUMN_WIDTH },
  { field: "bloodPressure", headerName: "Blood Pressure", width: COLUMN_WIDTH },
  { field: "bodyTemperature", headerName: "Body Temperature", width: COLUMN_WIDTH },
  { field: "bodyFat", headerName: "Body Fat", width: COLUMN_WIDTH },
  { field: "height", headerName: "Height", width: COLUMN_WIDTH },
  { field: "respiratoryRate", headerName: "Respiratory Rate", width: COLUMN_WIDTH },
  { field: "bloodGlucose", headerName: "Blood Glucose", width: COLUMN_WIDTH },
  { field: "oxygenSaturation", headerName: "Oxygen Saturation", width: COLUMN_WIDTH },
];

const DataDashboardPage: React.FC = () => {
  const { token } = useUser();
  const [currentUser, setCurrentUser] = useState("");
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);


  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token) as any;
      setCurrentUser(decoded["name"]);

      axios
        .get(REACT_APP_API_ORIGIN + "/customFieldsKeys", {
          headers: { Authorization: token },
        })
        .then((customFieldsKeysResponse) => {

          setColumns([
            ...healthConnectColumns,
            ...customFieldsKeysResponse.data.customFields?.map((customField) => {
              return {
                field: customField.name,
                headerName: customField.label,
                width: COLUMN_WIDTH,
              }
            })
          ])

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
            const values = { ...healthConnectResponse.data, ...customFieldsDataResponse.data };

            const allDates = Array.from(new Set(Object.values(values).map((i) => Object.keys(i)).flat()))


            const formattedRows = allDates.map((date, index) => {
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
            // })
            //.catch((error) => console.error(error));
          });
        });
    }
  }, [token]);

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
        <Box sx={{ height: 900, width: 2000 }}>
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
