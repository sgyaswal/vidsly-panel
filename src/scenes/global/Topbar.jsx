import { Box, IconButton, useTheme } from "@mui/material";
import * as React from "react";
import { useContext } from "react";

import { ColorModeContext, tokens } from "../../theme";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LogoutIcon from "@mui/icons-material/Logout";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonPinOutlinedIcon from "@mui/icons-material/PersonPinOutlined";
import Login from "../login/login";
import { ArrowDropDownCircle } from "@mui/icons-material";
import AuthContext from "../../context/AuthContext";

const Topbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { logoutUser } = useContext(AuthContext);

  let token ,username , name, parsedData

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    console.log(`${key}: ${value}`);

    if(key=="authTokens"){
    parsedData = JSON.parse(value);  // Parse the JSON string
  }
    token = parsedData?.data?.token;
    name =  parsedData?.data?.first_name + " " + parsedData?.data?.last_name;
    username  = parsedData?.data?.username;
    console.log("Token:", name);
  }
  const authToken = token
  const userName = username
  const Name = name


  return (
    <Box display="flex" justifyContent="space-between"   >
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        {/* <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" /> */}
        {/* <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton> */}
      </Box>

      {/* ICONS */}
      <Box display="flex" sx={{ marginTop:'2%',marginRight:'2%'}}   >
        {/* <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton> */}
        {/* <IconButton>
        <LogoutIcon />
        
        

        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonPinOutlinedIcon />
        </IconButton> */}

        <div  >
          <Button 

            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            className="top-right-button"
          >
            {userName} <ArrowDropDownCircle></ArrowDropDownCircle>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>
              <a className="myprofile" href="/myprofile">
                Profile
              </a>
            </MenuItem>
            <MenuItem onClick={handleClose}>Settings</MenuItem>
            <MenuItem onClick={logoutUser}>
              <a className="myprofile" href="/login">
                Logout
              </a>
            </MenuItem>
          </Menu>
        </div>
      </Box>
    </Box>
  );
};

export default Topbar;
