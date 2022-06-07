import { useContext } from "react";

import {
  Avatar,
  Box,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
} from "@mui/material";
import {
  AccountCircleOutlined,
  SearchOutlined,
  AddBox,
  Event,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { UIContext } from "../../context/ui/UIContext";
import { SideMenuItem } from "./SideMenuItem";
export const Sidemenu = () => {
  const { isMenuOpen, toggleSideMenu } = useContext(UIContext);

  return (
    <Drawer
      open={isMenuOpen}
      anchor="left"
      sx={{ backdropFilter: "blur(4px)", transition: "all 0.5s ease-out" }}
      onClose={toggleSideMenu}
    >
      <Box sx={{ width: 250, paddingTop: 2 }}>
        <List>
          {/* <SideMenuItem
            sendTo={"/register"}
            icon={<AccountCircleOutlined />}
            text={"Register"}
          ></SideMenuItem> */}
          <SideMenuItem
            sendTo={"/"}
            icon={<Event />}
            text={"Envents"}
          ></SideMenuItem>

          <SideMenuItem
            sendTo={"/eventRegister"}
            icon={<AddBox />}
            text={"Add Envents"}
          ></SideMenuItem>
        </List>
      </Box>
    </Drawer>
  );
};
