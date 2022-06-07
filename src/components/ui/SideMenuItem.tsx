import React, { Component, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { UIContext } from "../../context/ui/UIContext";

interface IProps {
  sendTo: string;
  icon: JSX.Element;
  text: string;
}
export const SideMenuItem = ({ sendTo, icon, text }: IProps) => {
  const { toggleSideMenu } = useContext(UIContext);

  return (
    <Link component={RouterLink} to={sendTo}>
      <ListItem button onClick={toggleSideMenu}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    </Link>
  );
};
