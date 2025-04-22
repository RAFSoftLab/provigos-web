import React from "react";
import { useNavigate } from "react-router-dom";
import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { useUser } from "./UserContext";

const drawerWidth = 240;
// const navigate = useNavigate();



const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { token, setToken, clearToken } = useUser();

  const handleLoginSuccess = (credentialResponse: any) => {
    //console.log("Login Successful!", credentialResponse);
    const token = credentialResponse.credential;
    if (token) {
      setToken(token);
    }
    // navigate("/");
  };

  const handleLoginFailure = () => {
    console.error("Login Failed!");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <div>

        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
        />
      </div>
      <List>
        <ListItemButton
          onClick={() => {
            navigate("/data");
          }}
        >
          <ListItemText primary="Data Dashboard" />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            navigate("/chart");
          }}
        >
          <ListItemText primary="Chart Dashboard" />
        </ListItemButton>

        <ListItemButton
          onClick={() => {
            navigate("/login");
          }}
        >
          <ListItemText primary="Login" />
        </ListItemButton>
        {/* <ListItemButton
          onClick={() => {
            navigate("/register");
          }}
        >
          <ListItemText primary="Register" />
        </ListItemButton> */}
      </List>
    </Drawer>
  );
};

export default Sidebar