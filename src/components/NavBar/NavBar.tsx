import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React from "react";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Название сайта
        </Typography>
        <Button color="inherit" href="/main">
          Главная
        </Button>
        <Button color="inherit" href="/admin">
          Админ-панель
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
