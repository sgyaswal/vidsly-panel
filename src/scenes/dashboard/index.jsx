import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Skeleton from "@mui/material/Skeleton";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
// import { mockTransactions } from "../../data/mockData";
// import UpdateForm from "../contacts/UpdateForm";
import Payment from "../Payments/index";

import "./continuedescription.css";
import Loader from "../../components/Loader/Loader";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [latestVideo, setLatestVideo] = useState([]);
  const [totalEarning, setTotalEarning] = useState(null);
  const [loading, setLoading] = useState({
    api1: true,
    api2: true,
  });
  const [totalViews, setTotalViews] = useState(0);

  let token, staff, parsedData;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);

    if (key === "authTokens") {
      parsedData = JSON.parse(value);
    }
    token = parsedData?.data?.token;
    staff = parsedData?.data?.is_staff;
  }

  const authToken = token;
  const isStaff = staff;

  const fetchAllUsers = async () => {
    setLoading((prevLoading) => ({ ...prevLoading, api1: true }));

    try {
      const videoRevenueResponse = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/getVideoRevenue`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!videoRevenueResponse.ok) {
        throw new Error("Failed to fetch video revenue data");
      }

      const videoRevenueData = await videoRevenueResponse.json();

      const getData = (videoRevenue, field) => {
        if (videoRevenue && videoRevenue.data && videoRevenue.data[field]) {
          return parseFloat(videoRevenue.data[field]).toFixed(2);
        }
        return 0;
      };

      const totalEarning = getData(videoRevenueData, "total_earning");
      setTotalEarning(totalEarning);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading((prevLoading) => ({ ...prevLoading, api1: false }));
    }
  };

  const fetchAllLatestVideo = async () => {
    setLoading((prevLoading) => ({ ...prevLoading, api2: true }));

    try {
      const latestVideoResponse = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/getlateastVideo`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!latestVideoResponse.ok) {
        throw new Error("Failed to fetch latest video data");
      }

      const latestVideoData = await latestVideoResponse.json();
      setLatestVideo(latestVideoData);
      const totalViews = latestVideoData?.data.reduce(
        (total, video) => total + video.views,
        0
      );
      setTotalViews(totalViews);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading((prevLoading) => ({ ...prevLoading, api2: false }));
    }
  };

  useEffect(() => {
    if(totalEarning==null){
      fetchAllUsers();
    }
    fetchAllLatestVideo();
  }, [authToken]);

  if (loading.api2) {
    return <Loader />;
  }

  return (
    <>
      {isStaff === true ? (
        <Payment />
      ) : (
        <Box sx={{ position: "fixed", height: "calc(100vh - 20px)" }}>
          <Box
            sx={{
              m: "10px 10px 10px 10px",
              paddingTop: "60px", // Adjust this value according to your header's height
              overflowY: "auto",
              height: "100%", // Fill the remaining height of the viewport
              boxSizing: "border-box",
              scrollbarWidth: "none" /* Firefox */,
              "&::-webkit-scrollbar": {
                display: "none" /* Chrome, Safari */,
              },
            }}
          >
            {/* HEADER */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
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
              {!loading.api1 ? (
                <Box
                  gridColumn="span 3"
                  backgroundColor={colors.primary[400]}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <StatBox
                    title={`${totalEarning}`}
                    subtitle="Total Earning"
                    progress="0.00"
                    increase="+0%"
                    icon={
                      <CurrencyRupeeIcon
                        sx={{
                          color: colors.greenAccent[600],
                          fontSize: "26px",
                        }}
                      />
                    }
                  />
                </Box>
              ) : (
                <div
                  style={{
                    marginRight: "10px",
                    marginBottom: "10px",
                    flexDirection: "row",
                    backgroundColor: "{colors.primary[400]}",
                  }}
                >
                  <Skeleton variant="rectangular" width={250} height={142} />
                </div>
              )}
                <Box
                  gridColumn="span 3"
                  backgroundColor={colors.primary[400]}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <StatBox
                    title={totalViews}
                    subtitle="Views"
                    progress="0.50"
                    increase="+21%"
                    icon={
                      <RemoveRedEyeIcon
                        sx={{
                          color: colors.greenAccent[600],
                          fontSize: "26px",
                        }}
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
                        sx={{
                          fontSize: "26px",
                          color: colors.greenAccent[500],
                        }}
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
                  <Typography
                    color={colors.grey[100]}
                    variant="h5"
                    fontWeight="600"
                  >
                    Latest 20 Videos
                  </Typography>
                </Box>
                <Box>
                  {latestVideo &&
                    latestVideo?.data &&
                    latestVideo?.data.map((video, i) => (
                      <Box
                        key={`${video.id}-${i}`}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom={`4px solid ${colors.primary[500]}`}
                        p="15px"
                      >
                        <Box>
                          <div>
                            <Typography
                              color={colors.greenAccent[500]}
                              className="text"
                              variant="h5"
                              fontWeight="600"
                            >
                              {video.description}
                            </Typography>
                          </div>
                          <Typography variant="body1">
                            Views: {video.views}
                          </Typography>
                        </Box>
                        {/* <Box color={colors.grey[100]}>
              {new Date(video.updated_time).toLocaleString()}
            </Box> */}
                        <Box
                          color={colors.grey[100]}
                          style={{ marginRight: 10 }}
                        >
                          {new Date(video.updated_time).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            }
                          )}
                        </Box>

                        <Box
                          component="a"
                          href={`https://www.facebook.com${video?.permalink_url}`} // Replace YOUR_VIDEO_URL with the actual video URL
                          target="_blank"
                          rel="noopener noreferrer"
                          backgroundColor={colors.greenAccent[500]}
                          p="5px 10px"
                          borderRadius="4px"
                          color="white"
                          // textDecoration="none"
                          style={{ textDecoration: "none" }}
                        >
                          Open Video
                        </Box>
                      </Box>
                    ))}
                </Box>
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
        </Box>
      )}
    </>
  );
};

export default Dashboard;   