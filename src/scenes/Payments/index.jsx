import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
// import { mockTransactions } from "../../data/mockData";
// import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
// import EmailIcon from "@mui/icons-material/Email";
// import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import * as React from 'react';
import StatBox from "../../components/StatBox";
import './payments.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Modal from '@mui/material/Modal';
import Form from 'react-bootstrap/Form';
import Button from '@mui/material/Button';
import NetBankingForm from "./netBankingwidraw";

const Payments = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = React.useState(false);

  let token , staff, parsedData

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    // console.log(`${key}: ${value}`);
    if(key == "authTokens"){
    parsedData = JSON.parse(value);  // Parse the JSON string
    }
    token = parsedData.data.token;
    staff = parsedData.data.is_staff;
    // staff = parsedData.data.is_staff;
    console.log("token:", token);
  }
  const authToken = token
  const Staff = staff



  const PopupContent = ({ onClose }, { first_name }) => {
    console.log("Update button clicked for zxcvbnm, Name:", first_name);
    return (
      <div>
         {Staff === true ? (null):(
        <Box
        sx={{
          width: '650px',
          height: '400px',
          // backgroundColor: '#fff',
          backgroundColor: "#fff",
          color: '#000',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        {/* Content inside the popup */}
      
        <NetBankingForm />

        <Button variant="contained" onClick={onClose}>
          Close
        </Button>
      </Box>

        )}
      </div>
     
      
    );
  };

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div >

  
    {/* <Box m="20px"> */}
    <Box sx={{ position: 'fixed', height: 'calc(100vh - 20px)' , width:'80vw'  }} >
  
    <Box sx={{
          m: '10px 10px 10px 10px',
          paddingTop: '60px', // Adjust this value according to your header's height
          overflowY: 'auto',
          height: '100%', // Fill the remaining height of the viewport
          boxSizing: 'border-box',
          scrollbarWidth: 'none', /* Firefox */
          '&::-webkit-scrollbar': {
            display: 'none', /* Chrome, Safari */
          },
          
        }}  >


      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="PAYMENTS AND EARNINGS" subtitle="Welcome to your payments and earnings" />

    
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Rs. 12,361"
            subtitle="Facebook"
            progress="0.15"
            increase="+4%"
            icon={
              <FacebookIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Rs. 431,225"
            subtitle="Instagram"
            progress="0.50"
            increase="+21%"
            icon={
              <InstagramIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Rs. 32,441"
            subtitle="Youtube"
            progress="0.30"
            increase="+5%"
            icon={
              <YouTubeIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Rs 5,134"
            subtitle="Total Earnings"
            progress="0.80"
            increase="+43%"
            icon={
              <CurrencyRupeeIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        
      
       

     
     
         </Box>
     

    <section className="withdrawl-section">
      <div>
        <h3>Withdrawl</h3>
      </div>
      <div className="button-flexing">
        <div style={{backgroundColor: "#19875"}}>
          {Staff === true ? (
            <button className="withdrawl-button" >Bank Transfer</button>
          ):(
            <button className="withdrawl-button" onClick={handleOpen} >Bank Transfer</button>
          )}
          
          <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  outline: 'none',
                  // background: "#198754"
                }}
              >
                <PopupContent onClose={handleClose} />
              </Box>
            </Modal>
        </div>
        <div>
          <button className="withdrawl-button">Transfer to cart</button>
        </div>
        <div>
          <button className="withdrawl-button">Electronics Wallets (USD)</button>
        </div>
      </div>
    </section>

    <section className="table-section">


    <table id="customers">
  <tr>
    <th>Company Name</th>
    <th>Person Name</th>
    <th>Designation</th>
    <th>Date</th>
    <th>Payment</th>
  </tr>
  <tr>
    <td>Dance Studio - webpage</td>
    <td>Maria Anders</td>
    <td>CEO</td>
    <td>02-03-2023</td>
    <td>Completed</td>
  </tr>
  <tr>
    <td>Dance Studio - webpage</td>
    <td>Maria Anders</td>
    <td>CEO</td>
    <td>02-03-2023</td>
    <td>Completed</td>
  </tr>
  <tr>
    <td>Dance Studio - webpage</td>
    <td>Maria Anders</td>
    <td>CEO</td>
    <td>02-03-2023</td>
    <td>Completed</td>
  </tr>
  <tr>
    <td>Dance Studio - webpage</td>
    <td>Maria Anders</td>
    <td>CEO</td>
    <td>02-03-2023</td>
    <td>Completed</td>
  </tr>
  <tr>
    <td>Dance Studio - webpage</td>
    <td>Maria Anders</td>
    <td>CEO</td>
    <td>02-03-2023</td>
    <td>Completed</td>
  </tr>

  <tr>
    <td>Dance Studio - webpage</td>
    <td>Maria Anders</td>
    <td>CEO</td>
    <td>02-03-2023</td>
    <td>Completed</td>
  </tr>
</table>
</section>
</Box>
    </Box>
    </div>
  );
};

export default Payments;
