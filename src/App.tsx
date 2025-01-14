import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="App">
      <Router>
        
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </Router>
      {/* </header> */}
    </div>
  );
}

export default App;
