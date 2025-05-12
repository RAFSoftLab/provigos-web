import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChartDashboard from "./pages/ChartDashboard";
import DataDashboard from "./pages/DataDashboard";
import CustomFields from "./pages/CustomFields";

function App() {
  return (
    <div className="App">
      <Router>

        <Routes>
          <Route path="/" element={<ChartDashboard />} />
          <Route path="/chart" element={<ChartDashboard />} />
          <Route path="/data" element={<DataDashboard />} />
          <Route path="/customFields" element={<CustomFields />} />
          <Route path="*" element={<ChartDashboard />} />
        </Routes>
      </Router>
      {/* </header> */}
    </div>
  );
}

export default App;
