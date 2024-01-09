import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import UpdateForm from "./UpdateForm";
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Form from 'react-bootstrap/Form';
import TextField from '@mui/material/TextField';
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
  // const [open, setOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [updatefirstName, setUpdateFirstName] = useState("");
  const [updateLastName, setUpdateLastName] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updateUsername, setUpdateUsername] = useState("");






  //   const auttok = localStorage.getItem('data')
  // console.log(JSON.stringify(auttok))

  const PopupContent = ({ onClose }) => {
    return (
      <Box
        sx={{
          width: '700px',
          height: '350px',
          backgroundColor: '#fff',
          color: '#000',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        {/* Content inside the popup */}

        <Form>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 'bold' }}  >
            <Typography variant="h3" gutterBottom>
              Update Details
            </Typography>
          </Grid>


          <div className='row'>
            <Form.Group className="col-md-6" controlId="formBasicPassword"   >
              <Form.Label>First name </Form.Label>
              <Form.Control type="text" placeholder="First Name" defaultValue={updatefirstName} />
            </Form.Group>
            <Form.Group className="col-md-6" controlId="formBasicPassword">
              <Form.Label>Last name</Form.Label>
              <Form.Control type="text" placeholder="Last Name" defaultValue={updateLastName} />
            </Form.Group>
          </div>
          <div className='row'>
            <Form.Group className="col-md-6" controlId="formBasicPassword"   >
              <Form.Label>Username </Form.Label>
              <Form.Control type="text" placeholder="Username" defaultValue={updateUsername} />
            </Form.Group>
            <Form.Group controlId="formFile" className="col-md-6">
              <Form.Label>Update Inage</Form.Label>
              <Form.Control type="file" />
            </Form.Group>

          </div>

          <Form.Group className="mb-3" controlId="formBasicEmail" >
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" defaultValue={updateEmail} />

          </Form.Group>
          {/* <Button variant="primary" type="submit">
  Submit
</Button> */}
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
            <Button sx={{ backgroundColor: 'blue' }} variant='contained'   >Submit</Button>
          </Grid>
        </Form>


        <Button variant="contained" onClick={onClose} style={{ m: "10px 100px 0 10px" }}  >
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
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/userApproval/${usid}`, {
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
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/getAllUser`, {
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
  let setname

  const transformedData = users.data.map((user) => {
    const splitDateTime = user.date_joined.split("T");
    setname = user.first_name

    return ({
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

    });
  });
  const isStaff = transformedData.some((user) => user.is_staff);
  console.log("isStaff", isStaff);




  const handleClickOpen = (id, first_name, last_name, email, username) => {
    setOpen(true);
    console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuID:", id);
    console.log("Update button clicked for user Name:", first_name);
    setUpdateFirstName(first_name)
    setUpdateEmail(email)
    setUpdateLastName(last_name)
    setUpdateUsername(username)
    console.log("updatefirstName:", updatefirstName)

    // UpdateForm({first_name})

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
      renderCell: ({ row: { id, first_name, last_name, email, username } }) => {


        return (



          <div>
            <Button variant="contained" onClick={() => handleClickOpen(id, first_name, last_name, email, username)}>
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
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  outline: 'none',
                }}
              >
                <PopupContent id={id} first_name={first_name} onClose={handleClose} />
              </Box>
            </Modal>
          </div>
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
