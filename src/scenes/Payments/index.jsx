import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
// import { mockTransactions } from "../../data/mockData";
// import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
// import EmailIcon from "@mui/icons-material/Email";
// import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import './payments.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const Payments = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div>

  
    <Box m="20px">
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
    </Box>

    <section className="withdrawl-section">
      <div>
        <h3>Withdrawl</h3>
      </div>
      <div className="button-flexing">
        <div>
          <button className="withdrawl-button">Bank Transfer</button>
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
    </div>
  );
};

export default Payments;
