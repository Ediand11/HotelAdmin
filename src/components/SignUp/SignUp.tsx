"use client";

import { signUpAdminUser } from "@/api/auth/signUp";
import {
  validatorEmail,
  validatorPassword,
  validatorPasswordRepeat,
  validatorUsername,
} from "@/helper/validators";
import { Box, Button, Container, CssBaseline, Grid, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import style from "./SignUp.module.scss";

const SignUp = () => {
  const router = useRouter();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    repeatPass: "",
    username: "",
    response: "",
    name: "",
    role: "",
  });
  const [role, setRole] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userData = {
      email: formData.get("email") as string,
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      name: formData.get("name") as string,
      role: role,
    };
    const repeatPassword = formData.get("rep_password") as string;

    let isValid = true;
    const errorMessages = {
      email: "",
      password: "",
      repeatPass: "",
      username: "",
      name: "",
      role: "",
    };

    isValid =
      validatorEmail(userData.email, (emailError) => {
        errorMessages.email = emailError;
      }) && isValid;

    isValid =
      validatorPassword(userData.password, (passwordError) => {
        errorMessages.password = passwordError;
      }) && isValid;

    isValid =
      validatorPasswordRepeat(userData.password, repeatPassword, (repeatPassError) => {
        errorMessages.repeatPass = repeatPassError;
      }) && isValid;

    isValid =
      validatorUsername(userData.username, (usernameError) => {
        errorMessages.username = usernameError;
      }) && isValid;

    setErrors((prev) => ({ ...prev, ...errorMessages }));

    if (!isValid) {
      return;
    }

    setErrors({
      email: "",
      password: "",
      repeatPass: "",
      username: "",
      name: "",
      response: "",
      role: "",
    });

    const response = await signUpAdminUser({
      email: userData.email,
      username: userData.username,
      password: userData.password,
      name: userData.name,
      role: userData.role,
    });

    if (!response.error && response.username && response.email) {
      router.replace("/");
    } else if (response.error) {
      setErrors((prev) => ({ ...prev, response: "Email is already taken" }));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className={style.root}>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              color={"secondary"}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={!!errors.email || !!errors.response}
              helperText={errors.email || errors.response}
            />
            <TextField
              color={"secondary"}
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              error={!!errors.username}
              helperText={errors.username}
            />
            <TextField
              color={"secondary"}
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              error={!!errors.name}
              helperText={errors.name}
            />

            <TextField
              select
              color="secondary"
              margin="normal"
              required
              fullWidth
              id="role"
              label="Role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              SelectProps={{
                native: true,
              }}
              error={!!errors.role}
            >
              <option value=""></option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="housekeeping">Housekeeping</option>
              <option value="financial">Financial</option>
              <option value="reception">Reception</option>
              <option value="guest">Guest</option>
            </TextField>

            <TextField
              color={"secondary"}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password}
            />
            <TextField
              color={"secondary"}
              margin="normal"
              required
              fullWidth
              name="rep_password"
              label="Repeat Password"
              type="password"
              id="passwordRepeat"
              autoComplete="current-password"
              error={!!errors.repeatPass}
              helperText={errors.repeatPass}
            />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href={"/"}>{"Already have an account? Sign In!"}</Link>
              </Grid>
            </Grid>
          </Box>
        </div>
      </Box>
    </Container>
  );
};

export default SignUp;
