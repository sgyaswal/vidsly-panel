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


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}
    //  sx={{backgroundColor}}
    >

      {'Copyright ©MedAssist '}
      <Link color="inherit" href="https://mui.com/">
        MedAssist
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Logiin() {
//   var navigate = useNavigate();
//   var dispatch = useDispatch()
  // const[emailId,setEmailId]=useState('')
  // const[password,setPassword]=useState('')

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [emailError, setEmailError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

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
const handlePageChange = () => {

  // validateEmail();
  // validateFirstName();
  // validateLastName();
  // validatePassword();
  // Only navigate if there are no email errors
  // navigate('/steptwo')

  //  if (!emailError ) {
  //   // Navigate to '/steptwo'
  //   navigate('/steptwo');
  dispatch({type:'ADD_PATIENT',payload:[email,body]})
  navigate('/steptwo');
 
  
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
                // margin="normal"
                // required
                fullWidth
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                // onChange = {(event)=>setEmailId(event.target.value)}
                // label="Email Address"
                // name="email"
                // autoComplete="email"
                // autoFocus
                // style={{ width: '70%',marginLeft:'5%'}}  
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

              {/* <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                // onChange = {(event)=>setPassword(event.target.value)}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                style={{ width: '70%',marginLeft:'5%'}}  
              /> */}
              
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              {/* <Button
                //  onClick={handleLogin}
                //  ()=>navigate("/userdashboard")
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ backgroundColor: "#30e14e" ,marginLeft:'5%',width: '70%'}}
              >
                Sign In
              </Button> */}
              {/* <a  href='/steptwo'  > */}
              <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handlePageChange}
              // sx={{ mt: 3, mb: 2 }}
              sx={{
                fontFamily: 'Poppins',
                marginTop:'30px',
                padding: '10px', // Adjust the padding as needed
                borderRadius: '50px', // Adjust the border radius as needed
                color:'#fff',
                backgroundColor: "#7066FD",
                
            
            }}

            >
              Sign in
            </Button>
            {/* </a> */}
                

              {/* <Grid container>
                <Grid item xs>
                  <Link href="/userregistration" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid> */}
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          // sx={{
          //   backgroundImage: '#000',
           
          //   backgroundColor: (t) =>
          //     t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          //   backgroundSize: 'cover',
          //   backgroundPosition: 'center',
          // }}
          
          style={{ backgroundImage: `url(${vidsly})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', width: '10%', height: '700px' }}

        />
      </Grid>
    </ThemeProvider>
  );
}