import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import UpdateForm from "./UpdateForm";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Form from "react-bootstrap/Form";
import TextField from "@mui/material/TextField";
import UpdateForm from "./UpdateForm";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setuserId] = useState(null);
  const [statuses, setStatuses] = useState({});
  const [colorChanged, setColorChanged] = useState({});
  const [Loading, setLoading] = useState({
    api1: true,
  });
  // const [open, setOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [updatefirstName, setUpdateFirstName] = useState("");
  const [updateLastName, setUpdateLastName] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updateUsername, setUpdateUsername] = useState("");
  const [instagramEarning, setInstagramEarning] = useState("");
  const [youtubeEarning, setYoutubeEarning] = useState("");
  const [snapchatEarning, setSnapchatEarning] = useState("");

  const PopupContent = ({ onClose }) => {
    return (
      <Box
        sx={{
          width: "700px",
          height: "350px",
          backgroundColor: "#fff",
          color: "#000",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* Content inside the popup */}

        <Form>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "bold",
            }}
          >
            <Typography variant="h3" gutterBottom>
              Update Payment Details
            </Typography>
          </Grid>

          <div className="row">
            <Form.Group className="col-md-12" controlId="formBasicPassword">
              <Form.Label>Snapchat </Form.Label>
              <Form.Control
                type="text"
                placeholder="Snapchat Earning."
                value={snapchatEarning}
                onChange={(e) => setSnapchatEarning(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="col-md-12" controlId="formBasicPassword">
              <Form.Label>Instagram</Form.Label>
              <Form.Control
                type="text"
                placeholder="Instagram Earning."
                value={instagramEarning}
                onChange={(e) => setInstagramEarning(e.target.value)}
                //  defaultValue={updateLastName}
              />
            </Form.Group>
          </div>
          <div className="row">
            <Form.Group className="col-md-12" controlId="formBasicPassword">
              <Form.Label>Youtube </Form.Label>
              <Form.Control
                type="text"
                placeholder="Youtube Earning."
                value={youtubeEarning}
                onChange={(e) => setYoutubeEarning(e.target.value)}
              />
            </Form.Group>
          </div>

          {/* <Form.Group className="mb-3" controlId="formBasicEmail" >
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" defaultValue={updateEmail} />

          </Form.Group> */}
          {/* <Button variant="primary" type="submit">
  Submit
</Button> */}
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button sx={{ backgroundColor: "blue" }} variant="contained"
            onClick={handleUpdateEarnings}>
              Submit
            </Button>
          </Grid>
        </Form>

        <Button
          variant="contained"
          onClick={onClose}
          style={{ m: "10px 100px 0 10px" }}
        >
          Close
        </Button>
      </Box>
    );
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let token, parsedData;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    // console.log(`${key}: ${value}`);
    if (key == "authTokens") {
      parsedData = JSON.parse(value); // Parse the JSON string
    }
    token = parsedData.data.token;
    // console.log("Token:", token);
  }
  const authToken = token;

  // let statusid

  const handleActiveClick = async (usid) => {
    try {
      console.log("Active button clicked for user ID:", usid);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/userApproval/${usid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            approve: true,
          }),
        }
      );
      setStatuses((prevStatuses) => ({
        ...prevStatuses,
        [usid]: !prevStatuses[usid], // Toggle the status for the specific ID
      }));

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setuserId(usid);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/getAllUser`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const GetAllEarnings = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/getAllEarnings?user_id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API request failed:", errorData);
        return;
      }

      const responseData = await response.json();
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };


  const handleUpdateEarnings = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/updateEarning`,
        {
          method: "POST", // Assuming you're making a POST request
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            user_id:userId,
            snapchat_earning: snapchatEarning,
            instagram_earning: instagramEarning,
            youtube_earning: youtubeEarning,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API request failed:", errorData);
        // Handle the error, e.g., show an error message
        return;
      }

      // Handle the success case, e.g., show a success message
      const responseData = await response.json();
      handleClose();
      console.log("API request successful:", responseData);

    } catch (error) {
      console.error("Error during API request:", error);
      // Handle other errors, e.g., show an error message
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, [authToken, userId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  let staticId = 1;
  let setname;

  const transformedData = users.data.map((user) => {
    const splitDateTime = user.date_joined.split("T");
    setname = user.first_name;

    return {
      sid: staticId++,
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      date_joined: splitDateTime[0], // Extracting the date part
      username: user.username,
      is_active: user.is_active,
      is_staff: Boolean(user.is_staff),
    };
  });
  const isStaff = transformedData.some((user) => user.is_staff);
  console.log("isStaff", isStaff);

  const handleClickOpen = (id, first_name, last_name, email, username) => {
    setOpen(true);
    setuserId(id);
    setUpdateFirstName(first_name);
    setUpdateEmail(email);
    setUpdateLastName(last_name);
    setUpdateUsername(username);
  };

  const columns = [
    { field: "sid", headerName: "ID", flex: 0.5 },
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "username", headerName: "User Name" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "date_joined",
      headerName: "Date Joined",
      flex: 1,
    },
    {
      field: "is_active",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row: { id, is_active } }) => {
        return (
          <div>
            {is_active ? (
              <Button
                variant="contained"
                style={{
                  backgroundColor: colors.greenAccent[600],
                  color: "white",
                }}
              >
                Active
              </Button>
            ) : (
              <Button
                variant="contained"
                style={{
                  backgroundColor: "red",
                  color: "white",
                }}
                onClick={() => {
                  handleActiveClick(id);
                }}
              >
                Inactive
              </Button>
            )}
          </div>
        );
      },
    },
    {
      headerName: "Earning Update",
      flex: 1,
      renderCell: ({
        row: { id, first_name, last_name, email, username, is_staff },
      }) => {
        // Check if is_staff is false before rendering the update button and modal
        if (!is_staff) {
          return (
            <div>
              <Button
                variant="contained"
                onClick={() =>
                  handleClickOpen(id, first_name, last_name, email, username)
                }
              >
                UPDATE
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    outline: "none",
                  }}
                >
                  <PopupContent
                    id={id}
                    first_name={first_name}
                    onClose={handleClose}
                  />
                </Box>
              </Modal>
            </div>
          );
        } else {
          // Render something else if is_staff is true (or don't render anything)
          return null; // You can also return a placeholder, a message, or any other content
        }
      },
    },
    {
      field: "is_staff",
      headerName: "Staff",
      flex: 1,
      renderCell: ({ row: { id, is_staff } }) => {
        return (
          <div>
            {is_staff ? (
              <Button
                variant="contained"
                style={{
                  backgroundColor: colors.greenAccent[600],
                  color: "white",
                }}
              >
                Admin
              </Button>
            ) : (
              <Button
                variant="contained"
                style={{
                  backgroundColor: "white",
                  color: "black",
                }}
              >
                Creator
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="All Users"
        subtitle="List of All Users for Future Reference"
      />
      <Box
        // m="40px 0 0 0"
        height="68vh"
        sx={{
          // backgroundColor:'red',

          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            // backgroundColor:'red',
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={transformedData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
