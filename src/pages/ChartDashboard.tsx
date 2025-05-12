// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Box, CssBaseline, Typography, CircularProgress } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import "./ChartDashboard.css";
import Sidebar from "../components/Sidebar";
import { useUser } from "../components/UserContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { REACT_APP_API_ORIGIN } from "../common/Config";
import {
  healthConnectKeys,
  healthConnectLabels,
} from "../common/healthConnect";
import { rejects } from "assert";

type ChartData = {
  name: string;
  data: [];
};

type HealthConnectChartData = {
  steps?: ChartData[];
  weight?: ChartData[];
  leanBodyMass?: ChartData[];
  heartRate?: ChartData[];
  caloriesBurned?: ChartData[];
  bloodPressure?: ChartData[];
  bodyTemperature?: ChartData[];
  bodyFat?: ChartData[];
  height?: ChartData[];
  respiratoryRate?: ChartData[];
  bloodGlucose?: ChartData[];
  oxygenSaturation?: ChartData[];
};

type HealthConnectChartDates = {
  steps?: string[];
  weight?: string[];
  leanBodyMass?: string[];
  heartRate?: string[];
  caloriesBurned?: string[];
  bloodPressure?: string[];
  bodyTemperature?: string[];
  bodyFat?: string[];
  height?: string[];
  respiratoryRate?: string[];
  bloodGlucose?: string[];
  oxygenSaturation?: string[];
};

const ChartDashboardPage: React.FC = () => {
  const { token, setToken, clearToken } = useUser();
  const [currentUser, setCurrentUser] = useState("");
  const [healthConnectChartData, setHealthConnectChartData] =
    useState<HealthConnectChartData>({});
  const [healthConnectChartOptions, setHealthConnectChartOptions] = useState(
    {}
  );
  const [incomingData, setIncomingData] = useState({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      // const decoded = jwtDecode(token) as any;
      // setCurrentUser(decoded["name"]);

      setIsLoading(true);
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

          console.log("CUSTGOMI", customFieldsKeysResponse);
          Promise.all(connectionPromises).then((responses) => {
            const [healthConnectResponse, customFieldsDataResponse] = responses;

            const values = {
              ...healthConnectResponse.data,
              ...customFieldsDataResponse.data,
            };
            console.log(values);

            for (const field of [
              ...Object.keys(healthConnectKeys),
              ...customFieldsKeysResponse.data.customFields?.map((key) => key["name"]),
            ]) {
              if (values[field]) {
                console.log(values[field]);
                const fieldValue = Object.values(values[field]);
                const fieldKeys = Object.keys(values[field]);
                console.log("keys", fieldKeys);
                const tempData = healthConnectChartData;
                tempData[field] = [
                  {
                    name: healthConnectKeys[field],
                    data: fieldValue,
                  },
                ];
                setHealthConnectChartData(tempData);

                console.log(healthConnectChartData);
                const options: ApexOptions = {
                  chart: {
                    type: "line",
                    height: 350,
                  },
                  xaxis: {
                    categories: fieldKeys,
                  },
                  stroke: {
                    curve: "smooth",
                  },
                  title: {
                    text:
                      healthConnectLabels[field] ||
                      customFieldsKeysResponse.data.customFields?.find(
                        (key) => key.name === field
                      )?.label,
                  },
                };

                const tempOptions = healthConnectChartOptions;
                healthConnectChartOptions[field] = options;
                console.log(healthConnectChartOptions);
                setHealthConnectChartOptions(healthConnectChartOptions);
              }

              setIncomingData(values);
              setIsLoading(false);
            }
          }, [currentUser]).catch((reject) => {
            console.log(reject);
            setIsLoading(false);
          });
        }).catch((reject) => {
          console.log(reject);
          setIsLoading(false);
        });
    }
  }, [healthConnectChartData, healthConnectChartOptions, token]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Sidebar */}

      <Sidebar />
      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          PROVIGOS Health Metrics Dashboard
        </Typography>
        {/* Current User: {currentUser !== "" ? currentUser : "Not logged in"} */}
        {/* Grid container for charts */}

        <div className="dashboard-container">
          {isLoading ? <Box
            sx={{
              height: "80vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <CircularProgress size={100} />
          </Box> :

            Object.keys(incomingData).map((fieldKey) => {
              if (healthConnectChartOptions[fieldKey] && healthConnectChartData[fieldKey]) {
                return (<div className="chart-container" key={fieldKey}>
                  <ReactApexChart
                    options={healthConnectChartOptions[fieldKey]}
                    series={healthConnectChartData[fieldKey]}
                    type="line"
                    height={350}
                  />
                </div>)
              }
            }
            )
          }
        </div>
      </Box>
    </Box>
  );
};

export default ChartDashboardPage;
