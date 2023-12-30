import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import * as React from 'react';
import Button from '@mui/material/Button';

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setuserId] = useState(null)

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

  let statusid

  const handleActiveClick = (usid) => {
    setuserId(usid)
    console.log("mmmmmmmmmm", usid);
    // You can perform any logic related to handleActiveClick here
  };
  const sid = statusid
  console.log("XXXXXXXXXXXXXXXXXXXX", authToken)


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


  const handleUserStatus = async () => {
    try {
      console.log('Active button clicked for user ID:', userId);
      const response = await fetch(`http://127.0.0.1:8000/api/user/userApproval/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
    } catch (error) {
      console.error('Error:', error.message);
      // Handle specific error cases or display an error message to the user
    }
  };


  // console.log(token)
  useEffect(() => {
    fetchAllUsers();
    handleUserStatus()
  }, [authToken,userId]);

  // const handleActiveClick = (usid) => {
  //   console.log("mmmmmmmmmm",usid)
  // }
  // useEffect(() => {
  //   const handleUserStatus = async (handleActiveClick(usid)) => {
  //     try {
  //       console.log('Active button clicked for user ID:', userId);
  //       const response = await fetch(`http://127.0.0.1:8000/api/user/userApproval/${userId}`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${authToken}`,
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }

  //       const data = await response.json();
  //       console.log('Response data:', data);
  //     } catch (error) {
  //       console.error('Error:', error.message);
  //       // Handle specific error cases or display an error message to the user
  //     }

  //   };
  // }, [authToken]);



  // useEffect(() => {


  //   handleUserStatus(); // Call the function to perform the API request

  // }, [authToken, userId]); // Ensure to include any dependencies needed inside the dependency array






  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // console.log("helloo",users[0].id)
  let staticId = 1;

  // const transformedData = users.data.map((user) => ({
  //   sid: staticId++,
  //   id: user.id,
  //   name: `${user.first_name} ${user.last_name}`,
  //   email: user.email,
  //   date_joined: user.date_joined.split("T"),
  //   username: user.username,
  //   is_active: user.is_active,
  //   is_staff: user.is_staff,
  //   // ... other properties based on transformation
  // }));
  // console.log("VVVVVVVVV",transformedData)






  const transformedData = users.data.map((user) => {
    const splitDateTime = user.date_joined.split("T");

    return {
      sid: staticId++,
      id: user.id,
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      date_joined: splitDateTime[0], // Extracting the date part
      username: user.username,
      is_active: user.is_active,
      is_staff: user.is_staff,
      // ... other properties based on transformation
    };

  });
  console.log("KEYYYYYY", transformedData.id)
  let i = transformedData
  transformedData.forEach((user) => {
    // approveUser(user.id);
    console.log("Aprove-----------", user.id)
  });

  console.log("vgvggvvg", i)


  // transformedData.map((user) => {
  //   approveUser(user.id);
  //   console.log("Aprove-----------",user.id)
  // });

  // for (let i = 0; i < transformedData.length; i++) {
  //   approveUser(transformedData[i].id);
  //   // console.log("Approve-----------", transformedData[i].id);

  // }



  // console.log("CCCCCCCCCCC",transformedData)






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
      renderCell: ({ row: { id } }) => {


        // const handleActiveClick = async (userId) => {
        //   try {
        //     console.log('Active button clicked for user ID:', userId);
        //     const response = await fetch(`http://127.0.0.1:8000/api/user/userApproval/${userId}`, {
        //       method: 'POST',
        //       headers: {
        //         'Content-Type': 'application/json',
        //         Authorization: `Bearer ${authToken}`, // Include the authorization header
        //         // Add any additional headers if required
        //       },
        //       // Additional headers or body data if required
        //     });

        //     if (!response.ok) {
        //       throw new Error('Failed to fetch users');
        //     }

        //     console.log(response); // Logging the raw response object
        //     const dataaa = await response.json();
        //     console.log('bbbbbbbbbb', dataaa); // Logging the parsed JSON data
        //   } catch (error) {
        //     console.error('Error:', error);
        //     // Handle errors if the API call fails
        //   }
        // };



        // console.log("QWERTYUI",authToken)
        // const YourComponent = ({ authToken }) => {
        // const handleActiveClick = async (userId) => {
        //   try {
        //     console.log('Active button clicked for user ID:', userId);
        //     const response = await fetch(`http://127.0.0.1:8000/api/user/userApproval/${userId}`, {
        //       method: 'POST',
        //       headers: {
        //         'Content-Type': 'application/json',
        //         Authorization: `Bearer ${authToken}`,
        //       },
        //       // Additional headers or body data if required
        //     });

        //     if (!response.ok) {
        //       throw new Error('Failed to fetch users');
        //     }

        //     const data = await response.json();
        //     console.log('bbbbbbbbbb', data);
        //   } catch (error) {
        //     console.error('Error:', error);
        //     // Handle errors if the API call fails
        //   }
        // };


        // } 

        const handleInactiveClick = (userId) => {
          // Implement your logic here using the userId
          console.log('Inactive button clicked for user ID:', userId);
          // Perform actions for inactivation, etc.
        };

        return (

          <div >
            <Button variant="contained" size="small"
              onClick={() => handleActiveClick(id)}
            // onClick={(userId) => approveUser()}
            >
              Active
            </Button>
            <Button variant="contained" size="small" style={{ marginLeft: '10%' }}>
              InActive
            </Button>
          </div>

        )
      }
    },
    {
      field: "is_staff",
      headerName: "Staff",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
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
