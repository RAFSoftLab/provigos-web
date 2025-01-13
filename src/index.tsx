import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from '@toolpad/core';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CredentialsSignInPage from './components/Login';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import SignupPage from './components/Register';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

root.render(
  <React.StrictMode>
    <AppProvider>
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <Router>
      <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<CredentialsSignInPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="*" element={<App />} />
        </Routes>
      </Router>
      </ThemeProvider>
    </AppProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
