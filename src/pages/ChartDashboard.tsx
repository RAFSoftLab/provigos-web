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
  const [stepsChartData, setStepsChartData] = useState([]);
  const [stepsChartDates, setStepsChartDates] = useState([]);
  const [weightChartData, setWeightChartData] = useState([]);
  const [weightChartDates, setWeightChartDates] = useState([]);
  const [leanBodyMassChartData, setLeanBodyMassChartData] = useState([]);
  const [leanBodyMassChartDates, setLeanBodyMassChartDates] = useState([]);
  const [heartRateChartData, setHeartRateChartData] = useState([]);
  const [heartRateChartDates, setHeartRateChartDates] = useState([]);
  const [caloriesBurnedRateChartData, setCaloriesBurnedRateChartData] =
    useState([]);
  const [caloriesBurnedRateChartDates, setCaloriesBurnedRateChartDates] =
    useState([]);

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
        .get(`${REACT_APP_API_ORIGIN}/healthConnectIntegration`, {
          headers: { Authorization: token },
        })
        .then(
          (response) => {
            //TODO Add loading spinner
            console.log(response.data);
            const values = response.data;

            for (const field of Object.keys(healthConnectKeys)) {
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
                    text: healthConnectLabels[field],
                  },
                };

                const tempOptions = healthConnectChartOptions;
                healthConnectChartOptions[field] = options;
                console.log(healthConnectChartOptions);
                setHealthConnectChartOptions(healthConnectChartOptions);
              }

              setIncomingData(values);
            }

            // //@ts-ignore
            // setStepsChartData([
            //   { name: "Steps", data: Object.values(values.steps) },
            // ]);
            // //@ts-ignore
            // setStepsChartDates(Object.keys(values.steps));

            // //@ts-ignore
            // setWeightChartData([
            //   { name: "Weight (kg)", data: Object.values(values.weight) },
            // ]);
            // //@ts-ignore
            // setWeightChartDates(Object.keys(values.weight));

            // //@ts-ignore
            // setLeanBodyMassChartData([
            //   {
            //     name: "Lean Body Mass (kg)",
            //     data: Object.values(values.leanBodyMass),
            //   },
            // ]);
            // //@ts-ignore
            // setLeanBodyMassChartDates(Object.keys(values.leanBodyMass));

            // //@ts-ignore
            // setHeartRateChartData([
            //   {
            //     name: "Heart Rate (BPM)",
            //     data: Object.values(values.heartRate),
            //   },
            // ]);
            // //@ts-ignore
            // setHeartRateChartDates(Object.keys(values.heartRate));

            // //@ts-ignore
            // setCaloriesBurnedRateChartData([
            //   {
            //     name: "Calories Burned",
            //     data: Object.values(values.caloriesBurned),
            //   },
            // ]);
            // //@ts-ignore
            // setCaloriesBurnedRateChartDates(Object.keys(values.caloriesBurned));
          },
          (reason) => {
            console.log(reason);
          }
        );
    }
  }, [healthConnectChartData, healthConnectChartOptions, token]);

  // Steps data
  // const stepsChartOptions: ApexOptions = {
  //   chart: {
  //     type: "line",
  //     height: 350,
  //   },
  //   xaxis: {
  //     categories: stepsChartDates,
  //   },
  //   stroke: {
  //     curve: "smooth",
  //   },
  //   title: {
  //     text: "Steps Over Time",
  //   },
  // };

  // // Weight data
  // const weightChartOptions: ApexOptions = {
  //   chart: { type: "line", height: 350 },
  //   xaxis: {
  //     categories: weightChartDates,
  //   },
  //   stroke: { curve: "smooth" },
  //   title: { text: "Weight Over Time" },
  // };

  // // Lean Body Mass data
  // const leanBodyMassChartOptions: ApexOptions = {
  //   chart: { type: "line", height: 350 },
  //   xaxis: {
  //     categories: leanBodyMassChartDates,
  //   },
  //   stroke: { curve: "smooth" },
  //   title: { text: "Lean Body Mass Over Time" },
  // };

  // // Calories Burned data
  // const caloriesChartOptions: ApexOptions = {
  //   chart: { type: "line", height: 350 },
  //   xaxis: {
  //     categories: caloriesBurnedRateChartDates,
  //   },
  //   stroke: { curve: "smooth" },
  //   title: { text: "Calories Burned Over Time" },
  // };

  // // Heart Rate data
  // const heartRateChartOptions: ApexOptions = {
  //   chart: { type: "line", height: 350 },
  //   xaxis: {
  //     categories: heartRateChartDates,
  //   },
  //   stroke: { curve: "smooth" },
  //   title: { text: "Heart Rate Over Time" },
  // };

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
          {Object.keys(incomingData).map((fieldKey) => (
            <div className="chart-container" key={fieldKey}>
              <ReactApexChart
                options={healthConnectChartOptions[fieldKey]}
                series={healthConnectChartData[fieldKey]}
                type="line"
                height={350}
              />
            </div>
          ))}

          {/* <div className="chart-container">
            <ReactApexChart
              options={stepsChartOptions}
              series={healthConnectChartData.steps}
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
              series={caloriesBurnedRateChartData}
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
          </div> */}
        </div>
      </Box>
    </Box>
  );
};

export default ChartDashboardPage;
