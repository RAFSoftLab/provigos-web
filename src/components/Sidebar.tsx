import React from "react";
import { useNavigate } from "react-router-dom";
import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";

const drawerWidth = 240;

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

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
      <List>
        <ListItemButton
          onClick={() => {
            navigate("/");
          }}
        >
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            navigate("/login");
          }}
        >
          <ListItemText primary="Login" />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            navigate("/register");
          }}
        >
          <ListItemText primary="Register" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
