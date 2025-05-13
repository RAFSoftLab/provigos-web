import React from "react";
import Sidebar from "../components/Sidebar";

const styles = {
  container: {
    height: "100vh",
    marginLeft: "240px", // Offset for drawer
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f2f5",
  },
  card: {
    padding: "40px 60px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
  },
  message: {
    fontSize: "1.75rem",
    color: "#333",
    margin: 0,
    fontWeight: 500,
    //textAlign: "center",
  },
};

const NoUser: React.FC = () => {
  return (
    <div>
      <Sidebar />
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.message}>
            Welcome to Provigos.
            <h5>Please sign in to access your dashboard.</h5>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default NoUser;
