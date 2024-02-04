import React,{useState}  from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { postData } from '../Services/FetchDjangoServices';
// import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux';
import vidsly from "../../assets/Vidsly.jpeg"



// function Copyright(props) {
//   return (
//     // <Typography variant="body2" color="text.secondary" align="center" {...props}
//     // //  sx={{backgroundColor}}
//     // >

//     //   {'Copyright ©MedAssist '}
//     //   <Link color="inherit" href="https://mui.com/">
//     //     MedAssist
//     //   </Link>{' '}
//     //   {new Date().getFullYear()}
//     //   {'.'}
//     // </Typography>
//   );
// }

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Logiin({firstName,lastName,email,password,confirmPassword,setFirstName,setLastName,setEmail,setPassword,setConfirmPassword,firstNameError,setFirstNameError,lastNameError,setLastNameError,emailError,setEmailError,passwordError,setPasswordError,props}) {
//   var navigate = useNavigate();
//   var dispatch = useDispatch()
  // const[emailId,setEmailId]=useState('')
  // const[password,setPassword]=useState('')

    

    const navigate = useNavigate()
    const dispatch = useDispatch()
    // localStorage.setItem('Signupdetailone', [firstName,lastName,email,password,confirmPassword]);




    if(password===confirmPassword)
    {
      console.log("password matched")
    }
    else
    {
      console.log("password not matched")
    }
    // const handlePageChange = () => {
    // //  nevigate('/steptwo')
    // window.location.assign('/steptwo');
    // }
     
   
    




//   const handleLogin = async() => {
  
//     var response = await postData('doctorsearch',{emailid:emailId,password:password})
//     var responsead = await postData('patientsearch',{emailid:emailId,password:password})
//     // var response = await postData('doctorsearch',{emailid:emailId})
//     if (response.status)
//     { console.log(response.data[0])
//        localStorage.setItem('DOCTOR',JSON.stringify(response.data[0]))
//       // dispatch({type:'ADD_USER',payload:[emailId,response.data[0]]})

//       navigate('/doctordashboard')
//     }
//     else if(responsead.status)
//     {
//       localStorage.setItem('PATIENT',JSON.stringify(responsead.data[0]))
//       dispatch({type:'ADD_USER',payload:[emailId,responsead.data[0]]})
      
//       navigate('/userdashboard')
//     }
//     else
//     {
//       Swal.fire({
                
//         icon: 'error',
//         title: "Invalid Auth Details",
//         showConfirmButton: false,
//         timer: 1500,
//         // toast :true
//       })

//     }
//   };

const validateEmail = () => {
  // Simple email validation logic
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) {
    setEmailError('Email is required');
  } else if (!emailRegex.test(email)) {
    setEmailError('Invalid email format');
  } else {
    setEmailError('');
  }
};

const validateFirstName = () => {
  if (!firstName.trim()) {
    setFirstNameError('First name is required');
  } else {
    setFirstNameError('');
  }
};

const validateLastName = () => {
  if (!lastName.trim()) {
    setLastNameError('Last name is required');
  } else {
    setLastNameError('');
  }
};


const validatePassword = () => {
  // Simple password validation (for illustration purposes)
  if (!password.trim()) {
    setPasswordError('Password is required');
  } 
  else if (password.length < 6) {
    setPasswordError('Password must be at least 6 characters');
  } else {
    setPasswordError('');
  }
};

var body = {email , password , firstName , lastName}
const handlePageChange = (props) => {

  console.log(props.nextStep)
  // e.preventDefault();
  //   nextStep();

 
  // dispatch({type:'ADD_PATIENT',payload:[email,body]})
  // navigate('/steptwo');
 
  
  // else {
  //   navigate('/');
  // }
  // navigate('/steptwo');
};


  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main"
      //  style={{   height: '100vh', overflow: 'hidden'  }} 
       >
        <CssBaseline />
       
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square
                
     
        >
          <Box
            sx={{
              my: 4,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
          
            }}
          >

         
            <Box  sx={{ mt: 0 }}>


            <div style={{ fontFamily: 'Poppins', fontWeight: 'bold', display: 'flex' }} >
                            First Name
                        </div>
                        <TextField

                            fullWidth
                            error={Boolean(firstNameError)}
                            helperText={firstNameError}
                            InputProps={{
                                style: { borderRadius: '50px' }
                            }}
                            variant="outlined"
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder='First Name'
                            sx={{
                                fontFamily: 'Poppins',
                                marginTop: '10px',
                                // padding: '10px', // Adjust the padding as needed
                                borderRadius: '50px', // Adjust the border radius as needed

                            }}
                        />
                        <div style={{ fontFamily: 'Poppins', fontWeight: 'bold', display: 'flex' }} >
                            Last Name
                        </div>
                        <TextField

                            fullWidth
                            error={Boolean(lastNameError)}
                            helperText={lastNameError}
                            InputProps={{
                                style: { borderRadius: '50px' }
                            }}
                            variant="outlined"
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder='Last Name'
                            sx={{
                                fontFamily: 'Poppins',
                                marginTop: '10px',
                                // padding: '10px', // Adjust the padding as needed
                                borderRadius: '50px', // Adjust the border radius as needed

                            }}
                        />
              
            <div style={{fontFamily:'Poppins',fontWeight:'bold',display:'flex' }} >
            Email Address
          </div>
              
              <TextField
               
                fullWidth
                id="email"
                onChange={(e) => setEmail(e.target.value)}
       
                InputProps={{
                  style: { borderRadius: '50px'  }
                }}
                variant="outlined"
                placeholder='Email Address*'
                error={Boolean(emailError)}
                helperText={emailError}
                sx={{
                  fontFamily: 'Poppins',
                  marginTop:'10px',
                  // padding: '10px', // Adjust the padding as needed
                  borderRadius: '50px', // Adjust the border radius as needed
                  // width:'70%',
                  
              
              }}

              />
              {/* <div style={{fontFamily:'Poppins',fontWeight:'bold',display:'flex',marginLeft:'15%' }} >
            City
          </div>
            <TextField
            //   margin="normal"
            //   variant="filled"
            // //   required
              fullWidth
            //   name="password"
            // //   label="Password"
            //   type="password"
            //   id="password"
            //   autoComplete="current-password"
            //   sx={{ borderRadius: '50%' }}
            InputProps={{
                style: { borderRadius: '50px'  }
              }}
              variant="outlined"
              placeholder='City*'
              sx={{
                  fontFamily: 'Poppins',
                  marginTop:'10px',
                  // padding: '10px', // Adjust the padding as needed
                  borderRadius: '50px', // Adjust the border radius as needed
                  width:'70%',
                  
              
              }}
            /> */}

<div style={{fontFamily:'Poppins',fontWeight:'bold',display:'flex' }} >
Password
          </div>
            <TextField
            //   margin="normal"
            //   variant="filled"
            // //   required
              fullWidth
            //   name="password"
            // //   label="Password"
            //   type="password"
            //   id="password"
            //   autoComplete="current-password"
            //   sx={{ borderRadius: '50%' }}
            error={Boolean(passwordError)}
        helperText={passwordError}
       
            InputProps={{
                style: { borderRadius: '50px'  }
              }}
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password*'
              sx={{
                  fontFamily: 'Poppins',
                  marginTop:'10px',
                  // padding: '10px', // Adjust the padding as needed
                  borderRadius: '50px', // Adjust the border radius as needed
                  // width:'70%',
                  
              
              }}
            />

<div style={{fontFamily:'Poppins',fontWeight:'bold',display:'flex' }} >
            Confirm Password
          </div>
            <TextField
              margin="normal"
              // variant="filled"
              required
              fullWidth
              name="password"
              // label="Password"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="password"
            //   autoComplete="current-password"
            //   sx={{ borderRadius: '50%' }}
            InputProps={{
                style: { borderRadius: '50px'  }
              }}
              variant="outlined"
              placeholder='Confirm password*'
              sx={{
                  fontFamily: 'Poppins',
                  marginTop:'10px',
                  // padding: '10px', // Adjust the padding as needed
                  borderRadius: '50px', // Adjust the border radius as needed
                  // width:'70%',
                  
              
              }}
            />
             
              
                

              
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          
          
          style={{ backgroundImage: `url(${vidsly})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', width: '10%', height: '700px' }}

        />
      </Grid>
    </ThemeProvider>
  );
}