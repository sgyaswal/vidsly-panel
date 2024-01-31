import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import MenuItem from '@material-ui/core/MenuItem';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CountryDropdown from './CountryDropDown';
import { useSelector } from 'react-redux';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {/* {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'} */}
    </Typography>
  );
}


const defaultTheme = createTheme();

export default function SetAvatar() {
    const [gender, setGender] = React.useState('');
    const [error, setError] = React.useState("");
    const navigate = useNavigate()


    var patient = useSelector(state =>state.patient)
    var keys = Object.keys(patient)
    var values = Object.values(patient)


    var genderone = useSelector(state =>state.gender)
    var keysone = Object.keys(genderone)
    var valueone = Object.values(genderone)

    
    console.log("Values :",valueone)
    console.log("Valuesone:",values)

    // var patientData = Object.values(patient)[0]
    // console.log(patientData)

    
    var category = useSelector(state =>state.category)
    var keyscategory = Object.keys(category)
    var valuecategory = Object.values(category)
    
    
    console.log("Valuesvvvv :",valueone[0].gender)
    // console.log("Valuesvvvv :",valueone[0].city)
    // console.log("Valuesvvvv :",valueone[0].datac)
    console.log("Vsvvvv :",values[0].firstName)
    console.log("Vcategorccc :",valuecategory[0].bio)
    console.log("Vcategoriii :",valuecategory[0].intrest)



  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSignup = async () => {
    try {
      const signupData = {
        first_name: values[0].firstName,
        last_name: values[0].lastName,
        email: values[0].email,
        password: values[0].password,
        gender: valueone[0].gender,
        city : valueone[0].city,
        country : valueone[0].datac,
        bio : valuecategory[0].bio,
        username : valuecategory[0].displayname,
        intrest : valuecategory[0].intrest,
        selectedChip : valuecategory[0].selectedChip,
      };
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupData),
        }
      );

      const data = await response.json();

      if (response.status === 201) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Signup successful",
          showConfirmButton: false,
          timer: 3000,
          toast: true,
        });
        console.log("Signup successful");
        setError("");
        navigate("/login"); // Redirect to login page after successful signup
      } else {
        // Handle unsuccessful signup
        setError("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error.message);
      setError("An error occurred during signup");
    }
  };


  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    handleSignup()
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
         
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <div style={{fontFamily:'Poppins',fontWeight:'bold',display:'flex', marginBottom:'5px', fontSize:'40px'}} >
            Setup your avatar
          </div>
          <div style={{fontFamily:'Poppins',fontWeight:'bold',display:'flex',justifyContent:'center',alignItems:'center', marginBottom:'5px'}} >
          <Avatar sx={{ m: 1, bgcolor: '#30e14e',height:'100px',width:'100px' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          </div>
          {/* <input  style={{ display: 'none' }}  /> */}
            

            <Button
              type="submit"
              fullWidth
              variant="contained"
              // sx={{ mt: 3, mb: 2 }}
              sx={{
                fontFamily: 'Poppins',
                marginTop:'40px',
                padding: '10px', // Adjust the padding as needed
                borderRadius: '50px', // Adjust the border radius as needed
                color:'#fff',
                backgroundColor: "#7066FD",
            
            }}

            >
              Submmit
            </Button>
            {/* <div style={{fontFamily:'Poppins',fontWeight:'bold',display:'flex',justifyContent:'center',alignItems:'center',marginTop:'10px'}} >
            Skip to continue
          </div> */}
            <Grid container>
             
              
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}