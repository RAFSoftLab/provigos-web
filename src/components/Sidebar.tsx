import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Button, Drawer, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { useUser } from "./UserContext";
import { jwtDecode } from "jwt-decode";

const drawerWidth = 240;
// const navigate = useNavigate();



const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { token, setToken, clearToken, googleUser } = useUser();

  const handleLoginSuccess = (credentialResponse: any) => {
    //console.log("Login Successful!", credentialResponse);
    const token = credentialResponse.credential;
    if (token) {
      setToken(token);
    }
  };

  const handleLogout = () => {
    clearToken();
    window.location.reload();
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

        <Box sx={{ p: 2, textAlign: "center" }}>
          {!googleUser ? (
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginFailure}
            />
          ) : (
            <Box>
              <Avatar src={googleUser.picture} sx={{ width: 56, height: 56, mx: "auto", mb: 1 }} />
              <Typography variant="subtitle1">{googleUser.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {googleUser.email}
              </Typography>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleLogout}
                sx={{ mt: 2 }}
              >
                Logout
              </Button>
            </Box>
          )}
        </Box>
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
            navigate("/customFields");
          }}
        >
          <ListItemText primary="Custom Fields" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar