import { Box,  IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";


import PersonAddIcon from "@mui/icons-material/PersonAdd";

import Header from "../../components/Header";
import LineChart from "../../components/LineChart";

import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";

import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { useState, useEffect } from "react";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ videoRevenue , setVideoRevenue] = useState("")
  const [totalEarning, setTotalEarning] = useState(0);

  let token

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    // console.log(`${key}: ${value}`);

    const parsedData = JSON.parse(value);  // Parse the JSON string
    token = parsedData.data.token;
    console.log("Token:", token);
  }
  const authToken = token
  console.log("TTTTTToken",authToken)

  // useEffect(() => {
  //   const fetchAllUsers = async () => {
  //     // alert("11111")
  //     try {
  //       // Fetch video revenue data
  //       const videoRevenueResponse = await fetch('http://127.0.0.1:8000/api/user/getVideoRevenue', {
      
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${authToken}`, // Include the authorization header
  //           // Add any additional headers if required
  //         },
  //       });
  
  //       if (!videoRevenueResponse.ok) {
  //         throw new Error('Failed to fetch video revenue data');
  //       }
  //       alert(1)
  
  //       const videoRevenueData = await videoRevenueResponse.json();
  //       console.log("Revenue",videoRevenueData)
  //       setVideoRevenue(videoRevenueData);
  //       setIsLoading(false);
  //     } catch (error) {
  //       setError(error.message);
  //       setIsLoading(false);
  //     }
  //   };
  
  //   fetchAllUsers();
  // }, [authToken]); // Include authToken as a dependency if it might change and cause a re-fetch

  // useEffect(() => {
  //   const fetchAllUsers = async () => {
  //     setIsLoading(true); 
  //     // alert("11111")
  //     try {
  //       // Fetch video revenue data
  //       const videoRevenueResponse = await fetch('http://127.0.0.1:8000/api/user/getVideoRevenue', {
  
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${authToken}`, // Correct syntax for template literal
  //           // Add any additional headers if required
  //         },
  //       });
  
  //       if (!videoRevenueResponse.ok) {
  //         throw new Error('Failed to fetch video revenue data');
  //       }
  //       alert(1)
  
  //       const videoRevenueData = await videoRevenueResponse.json();
  //       console.log("Revenue", videoRevenueData)
  //       setVideoRevenue(videoRevenueData);
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setIsLoading(false); // Always set loading state to false, even in case of errors
  //     }
  //   };
  
  //   fetchAllUsers();
  // }, [authToken]); // Include authToken as a dependency if it might change and cause a re-fetch

  useEffect(() => {
  const fetchAllUsers = async () => {
    setIsLoading(true);

    try {
      const videoRevenueResponse = await fetch('http://127.0.0.1:8000/api/user/getVideoRevenue', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!videoRevenueResponse.ok) {
        throw new Error('Failed to fetch video revenue data');
      }

      // console.log('Request sent successfully');
      // alert(1); // Alert to indicate that this point in the code is reached

      const videoRevenueData = await videoRevenueResponse.json();
      console.log('Revenue data received:', videoRevenueData);

      setVideoRevenue(videoRevenueData);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  fetchAllUsers();
}, [authToken]);

// let te = 0; // Initialize te as a global variable

// const TotalEarning = () => {
//   te = videoRevenue.data.total_earning;
//   return te; // Return the value of te from the function
// };

// // Call TotalEarning function to get the value of te
// const Total = TotalEarning();

useEffect(() => {
  // Simulating data fetching or defining videoRevenue object
  // const videoRevenue = {
  //   data: {
  //     total_earning: videoRevenue.data.total_earning // Example value, replace this with your actual data
  //   }
  // };

  // Function to retrieve total earnings
  const getTotalEarning = (videoRevenue) => {
    if (videoRevenue && videoRevenue.data && videoRevenue.data.total_earning) {
      return videoRevenue.data.total_earning;
    }
    // return 0; // Return 0 if data is not available
  };

  // Fetch total earning and set it in the state
  const total = getTotalEarning(videoRevenue);
  setTotalEarning(total);
}, []); // Run once on component mount

  

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        {/* <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box> */}
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
            // title={`Rs. ${Total}`}
            title={`Rs. ${totalEarning}`}
            subtitle="Earnings"
            progress="0.15"
            increase="+4%"
            icon={
              <CurrencyRupeeIcon
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
            title="431,225"
            subtitle="Views"
            progress="0.50"
            increase="+21%"
            icon={
              <RemoveRedEyeIcon
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
            title="32,441"
            subtitle="Followers"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
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
            title="5,134"
            subtitle="Videos"
            progress="0.80"
            increase="+43%"
            icon={
              <OndemandVideoIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Top Performing Videos
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  Video Name
                </Typography>
              
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
               Open Video
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
      
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Audience Demographics
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
         Top 5 Cities
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
 
      </Box>
    </Box>
  );
};

export default Dashboard;
