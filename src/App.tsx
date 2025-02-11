import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Register";
import ChartDashboard from "./pages/ChartDashboard";
import DataDashboard from "./pages/DataDashboard";

function App() {
  return (
    <div className="App">
      <Router>
        
        <Routes>
          <Route path="/" element={<ChartDashboard />} />
          <Route path="/chart" element={<ChartDashboard />} />
          <Route path="/data" element={<DataDashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="*" element={<ChartDashboard />} />
        </Routes>
      </Router>
      {/* </header> */}
    </div>
  );
}

export default App;
