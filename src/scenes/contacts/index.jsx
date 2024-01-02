import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UpdateForm from "./UpdateForm";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setuserId] = useState(null)
  const [statuses, setStatuses] = useState({})
  const [colorChanged, setColorChanged] = useState({});
  const [Loading, setLoading] = useState({
    api1: true,
  });
  const [open, setOpen] = React.useState(false);


  //   const auttok = localStorage.getItem('data')
  // console.log(JSON.stringify(auttok))

  let token 
  

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    // console.log(`${key}: ${value}`);

    const parsedData = JSON.parse(value);  // Parse the JSON string
    token = parsedData.data.token;
    // console.log("Token:", token);
  }
  const authToken = token

  // let statusid

  const handleActiveClick = async (usid) => {

    try {
      console.log('Active button clicked for user ID:', usid,);
      const response = await fetch(`http://127.0.0.1:8000/api/user/userApproval/${usid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          approve: true
        })
      });
      console.log("XXXXXXXXXXXXXfghjkXXXXXXX", `${response.status}`)
      setStatuses(prevStatuses => ({
        ...prevStatuses,
        [usid]: !prevStatuses[usid], // Toggle the status for the specific ID
      }));

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      setuserId(usid)
    } catch (error) {
      console.error('Error:', error.message);
      // Handle specific error cases or display an error message to the user
    }
  };
  // const sid = statusid
  // console.log("XXXXXXXXXXXXXXXXXXXX", authToken)


  const fetchAllUsers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/user/getAllUser', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`, // Include the authorization header
          // Add any additional headers if required
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      console.log("XCXCXCX", data)
      // uss =  setUsers(data);
      setUsers(data)

      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };




  // console.log(token)
  useEffect(() => {
    fetchAllUsers();

  }, [authToken, userId]);








  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // console.log("helloo",users[0].id)
  let staticId = 1;

  const transformedData = users.data.map((user) => {
    const splitDateTime = user.date_joined.split("T");

    return ({
      sid: staticId++,
      id: user.id,
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      date_joined: splitDateTime[0], // Extracting the date part
      username: user.username,
      is_active: user.is_active,
      is_staff: Boolean(user.is_staff),

    });
  });

  const isStaff = transformedData.some((user) => user.is_staff);
  console.log("isStaff", isStaff);

  const handleClickOpen = () => {
    setOpen(true);
    UpdateForm()
  };

  // const ShowUpdateUser =  async(id) => {
  //   return (
  //     <React.Fragment>

  //       <Dialog open={open} onClose={handleClose}>
  //         <DialogTitle>Update User</DialogTitle>
  //         <DialogContent>
  //           <DialogContentText>
  //             To update user, please select the user and click on update button.
  //           </DialogContentText>
  //         </DialogContent>
  //         <DialogActions>
  //           <Button onClick={handleClose}>Cancel</Button>
  //           <Button onClick={handleClickOpen}>Update</Button>
  //         </DialogActions>
  //       </Dialog>
  //     </React.Fragment>
  //   );
  // }
  // const handleClose = () => {
  //   setOpen(false);
  // };
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const ShowUpdateUser = (uid) => {
  //   console.log("Update button clicked for user ID:", uid);
  //   setOpen(true);
  //   return (
  //     <Dialog open={open} onClose={handleClose}>
  //       <DialogTitle>Update User</DialogTitle>
  //       <DialogContent>
  //         <DialogContentText>
  //           To update user, please select the user and click on update button.
  //         </DialogContentText>
  //       </DialogContent>
  //       <DialogActions>
  //         <Button onClick={handleClose}>Cancel</Button>
  //         <Button onClick={handleClickOpen}>Update</Button>
  //       </DialogActions>
  //     </Dialog>
  //   )
  // }
  const handleClose = () => {
    setOpen(false);
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
      headerName: "Active",
      flex: 1,
      renderCell: ({ row: { id, is_active } }) => {
        return (
          <div>
            {is_active ? (
              <Button
                variant="contained"
                style={{
                  backgroundColor: colors.greenAccent[600],
                  color: 'white'
                }}

              >
                Active
              </Button>
            ) : (
              <Button
                variant="contained"
                style={{
                  backgroundColor: 'red',
                  color: 'white'
                }}
                onClick={() => { handleActiveClick(id) }}
              >
                Inactive
              </Button>
            )}
          </div>
        );
      }
    },
    {
      // field: "is_staff",
      headerName: "Update",
      flex: 1,
      renderCell: ({ row: { id } }) => {
        return (
          <div>
            {/* <Dialog open={open} keepMounted onClose={handleClose}  style={{ width: 500, height: 500 }}  >
                <DialogTitle>Update User</DialogTitle>
                <DialogContent>
                  <DialogContentText><h1>hello</h1> </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleClickOpen}>Update</Button>
                </DialogActions>
                </Dialog> */}
            <React.Fragment>
              {/* <Button variant="outlined" onClick={handleClickOpen}>
                Open alert dialog
              </Button> */}
              <Button
              variant="contained"
              style={{
                backgroundColor: "#009efa",
                color: 'white'
              }}
              onClick={() => { handleClickOpen(id) }}
            >
              Update
            </Button>
              <Dialog
                open={open}
                onClose={handleClose}
              >
                <DialogTitle id="alert-dialog-title" >
                  {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent >
                  <DialogContentText id="alert-dialog-description">
                    Let Google help apps determine location. This means sending anonymous
                    location data to Google, even when no apps are running.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Disagree</Button>
                  <Button onClick={handleClose} autoFocus>
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
            </React.Fragment>
            {/* <Button
                variant="contained"
                style={{
                  backgroundColor: 'red',
                  color: 'white'
                }}
                onClick={() => { handleActiveClick(id) }}
              >
                Inactive
              </Button> */}
          </div >
        );
      }
    },
    {
      field: "is_staff",
      headerName: "Staff",
      flex: 1,
    },
  ];

  return (

    <Box m="20px" >
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
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
