import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import PaymentIcon from '@mui/icons-material/Payment';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import Userlogo from "../../assets/flogo.jpeg"

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  let name , staff, parsedData

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    if(key== "authTokens"){
      parsedData = JSON.parse(value);  // Parse the JSON string
    }
    name =  parsedData.data.first_name + " " + parsedData.data.last_name;
    staff = parsedData.data.is_staff;
  }
  const Name = name
  const Staff = staff

  const SelectContact = () => {
    navigate("/contacts");
  }


  return (
    <Box
      sx={{
        // position: "fixed",
        
        height: "100vh",
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed} sx={{}}   >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <img
                  alt="profile-user"
                  width="50px"
                  height="50px"
                  src={Userlogo}
                  style={{ cursor: "pointer", borderRadius: "50%", marginRight: "3%" }}
                />
                <Typography variant="h3" color={colors.grey[100]} style={{marginRight:'20px'}}>
                  Creator
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={Userlogo}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {Name}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Vidsly Platform
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {Staff === true ? (null):(
               <Item
               title="Dashboard"
               to="/"
               icon={<HomeOutlinedIcon />}
               selected={selected}
               setSelected={setSelected}
             />
            )}
           

            <Item
              title="Payments"
              to="/payments"
              icon={<PaymentIcon />}
              selected={selected}
              setSelected={setSelected}
            />
               {/* <Item
              title="My Profile"
              to="/myprofile"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
              <Item
              title="Manage Team"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {Staff === true ? (
              <Item
              title="User Information"
              to="/contacts"
              // onClick={SelectContact()}
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            ):(null)}
            
            <Item
              title="Invoices Balances"
              to="/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* {Staff === true ? (
              <Item
              title="Profile Form"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            ):(null)}
             */}
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
           Log Out
            </Typography> */}
            {/* <Item
              title="Logout"
              to="/logout"
              icon={<LogoutIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            {/* <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
