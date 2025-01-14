import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Typography, Box, Container } from "@mui/material";
// import "./Login.css";
import { REACT_APP_API_ORIGIN } from "../common/Config";
import axios from "axios";
import { useUser } from "../components/UserContext";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const { token, setToken, clearToken } = useUser();
  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    axios
      .post(REACT_APP_API_ORIGIN + "/login", {
        username: data.email,
        password: data.password,
      })
      .then(
        (response) => {
          console.log(response);
          const token = response.data;
          if (token) {
            setToken(token);
          }
        },
        (reason) => {
          console.log(reason);
        }
      );
  };

  return (
    <Container maxWidth="sm" className="login-container">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" gutterBottom>
          Log In
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1, width: "100%" }}
        >
          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Enter a valid email",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          {token}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Log In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
