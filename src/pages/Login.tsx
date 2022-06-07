import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import useAuth from "../hooks/useAuth";
import { AuthState } from "../interfaces";

import authService from "../services/auth";
type FormData = {
  user: string;
  password: string;
};

const schema = yup
  .object({
    user: yup.string().required("Required"),
    password: yup.string().required("Required"),
  })
  .required();

export const Login = () => {
  const { setAuth } = useAuth();
  const location: any = useLocation();

  const { from } = location.from || { from: { pathname: "/" } };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    let auth: AuthState = {
      username: data.user,
      _id: "",
      name: "",
      password: data.password,
      roles: [],
      accessToken: "",
      isLoggedIn: false,
    };

    const result = await authService.auth(auth);

    if (result?.message === "ok") {
      const user_res: AuthState = { ...result?.user, isLoggedIn: true };

      setAuth(user_res);
      navigate(from.pathname, { replace: true });
    }
  };
  const paperStyle = {
    padding: 20,
    height: "70vh",
    alignText: "center",
    width: 500,
    margin: "20px auto",
  };
  const btnstyle = { margin: "8px 0" };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid textAlign={"center"}>
              <h2>Sign In</h2>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  error={!!errors.user}
                  helperText={errors.user?.message}
                  fullWidth
                  id="user"
                  label="User"
                  variant="outlined"
                  {...register("user")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  fullWidth
                  id="password"
                  label="Password"
                  variant="outlined"
                  {...register("password")}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  color="primary"
                  size="large"
                  variant="contained"
                  style={btnstyle}
                  fullWidth
                >
                  Sign in
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </form>
    </>
  );
};
