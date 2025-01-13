import { Button } from "@mui/material";
import "./App.css";
import { useNavigate } from "react-router-dom";
import DashboardPage from "./pages/Dashboard";

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <DashboardPage />
      <Button
        onClick={() => {
          navigate("/login");
        }}
      >
        Login
      </Button>
      <Button
        onClick={() => {
          navigate("/register");
        }}
      >
        Register
      </Button>
      {/* </header> */}
    </div>
  );
}

export default App;
