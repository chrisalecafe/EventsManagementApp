import { useContext } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import {
  AppBar,
  Box,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import { Logout, MenuOutlined } from "@mui/icons-material";
import { UIContext } from "../../context/ui/UIContext";
import { AuthContext } from "../../context/authentication";
import useAuth from "../../hooks/useAuth";
import { AuthState } from "../../interfaces";

export const Navbar = () => {
  const { toggleSideMenu } = useContext(UIContext);
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const HandleClick = () => {
    let auth: AuthState = {
      username: "",
      name: "",
      password: "",
      roles: [],
      accessToken: "",
      isLoggedIn: false,
    };
    setAuth(auth);
    navigate(`/Login`);
  };
  return (
    <AppBar>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="secondary"
          aria-label="menu"
          sx={{ mr: 0 }}
          onClick={toggleSideMenu}
        >
          <MenuOutlined />
        </IconButton>

        <Link component={RouterLink} to="/" display="flex" alignItems="center">
          <Typography color="white" variant="h6">
            Events Management
          </Typography>
        </Link>

        <Box flex={1} />
        <Box flex={1} />
        <IconButton onClick={HandleClick} color="secondary">
          <Logout />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
