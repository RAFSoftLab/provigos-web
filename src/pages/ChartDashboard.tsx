// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Box, CssBaseline, Typography } from "@mui/material";
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
  // const [stepsChartData, setStepsChartData] = useState([]);
  // const [stepsChartDates, setStepsChartDates] = useState([]);
  // const [weightChartData, setWeightChartData] = useState([]);
  // const [weightChartDates, setWeightChartDates] = useState([]);
  // const [leanBodyMassChartData, setLeanBodyMassChartData] = useState([]);
  // const [leanBodyMassChartDates, setLeanBodyMassChartDates] = useState([]);
  // const [heartRateChartData, setHeartRateChartData] = useState([]);
  // const [heartRateChartDates, setHeartRateChartDates] = useState([]);
  // const [caloriesBurnedRateChartData, setCaloriesBurnedRateChartData] =
  //   useState([]);
  // const [caloriesBurnedRateChartDates, setCaloriesBurnedRateChartDates] =
  //   useState([]);

  const [healthConnectChartData, setHealthConnectChartData] =
    useState<HealthConnectChartData>({});
  const [healthConnectChartOptions, setHealthConnectChartOptions] = useState(
    {}
  );
  const [incomingData, setIncomingData] = useState({});

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

              console.log("INCOMING DATA", values)
              setIncomingData(values);
            }
          });

          // axios
          //   .get(`${REACT_APP_API_ORIGIN}/healthConnectIntegration`, {
          //     headers: { Authorization: token },
          //   })
          //   .then(
          //     (response) => {
          //       //TODO Add loading spinner
          //       console.log(response.data);
          //       const values = response.data;
          //       console.log(customFieldsKeysResponse);

          //       for (const field of [
          //         ...Object.keys(healthConnectKeys),
          //         ...customFieldsKeysResponse.data.map((key) => key["name"]),
          //       ]) {
          //         if (values[field]) {
          //           console.log(values[field]);
          //           const fieldValue = Object.values(values[field]);
          //           const fieldKeys = Object.keys(values[field]);
          //           console.log("keys", fieldKeys);
          //           const tempData = healthConnectChartData;
          //           tempData[field] = [
          //             {
          //               name: healthConnectKeys[field],
          //               data: fieldValue,
          //             },
          //           ];
          //           setHealthConnectChartData(tempData);

          //           console.log(healthConnectChartData);
          //           const options: ApexOptions = {
          //             chart: {
          //               type: "line",
          //               height: 350,
          //             },
          //             xaxis: {
          //               categories: fieldKeys,
          //             },
          //             stroke: {
          //               curve: "smooth",
          //             },
          //             title: {
          //               text: healthConnectLabels[field],
          //             },
          //           };

          //           const tempOptions = healthConnectChartOptions;
          //           healthConnectChartOptions[field] = options;
          //           console.log(healthConnectChartOptions);
          //           setHealthConnectChartOptions(healthConnectChartOptions);
          //         }

          //         setIncomingData(values);
          //       }
          //     },
          //     (reason) => {
          //       console.log(reason);
          //     }
          //   );
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
        Current User: {currentUser !== "" ? currentUser : "Not logged in"}
        {/* Grid container for charts */}
        <div className="dashboard-container">
          {Object.keys(incomingData).map((fieldKey) => {
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
          )}
        </div>
      </Box>
    </Box>
  );
};

export default ChartDashboardPage;
