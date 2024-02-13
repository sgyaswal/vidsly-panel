
import React, { useState } from 'react';
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
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { Routes, Route } from 'react-router-dom';
import Gender from './gender';
import { useDispatch, useSelector } from "react-redux";
import vidsly from "../../assets/Vidsly.jpeg"
// import { addPatient } from './action';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
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

export default function Logiin({ firstName, lastName, email, password, confirmPassword, setFirstName, setLastName, setEmail, setPassword, setConfirmPassword, firstNameError, setFirstNameError, lastNameError, setLastNameError, emailError, setEmailError, passwordError, setPasswordError, confirmPasswordError, setConfirmPasswordError , showPassword, setShowPassword}) {
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div style={{
      // backgroundColor: 'orange'
      // background: 'linear-gradient(45deg, #87CEEB, #FFB6C1)',
      background: 'linear-gradient(90deg, rgba(2,0,36,1) 100%, rgba(9,9,121,1) 100%, rgba(0,212,255,1) 100%)',
      // background: '#000',
      height: 'max-content', width: '100%',
      minWidth: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      //  marginBottom:'10'
    }}>

      <ThemeProvider theme={defaultTheme}   >
        <Container component="main" maxWidth="xs"     >
          <CssBaseline />
          <div
            style={{ height: '10vh' }}>

          </div>
          <Box
            sx={{
              // marginTop: 10,
              // backgroundColor:'#000',
              height: 'max-content',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.9)', // Adjust the alpha value as needed
              borderRadius: '10px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',  // Adjust the alpha value as needed
              padding: 3, // Add padding to make it visually appealing
            }}
          >

            <Box component="form" noValidate sx={{ mt: 1 }}>

            <img src={vidsly} alt="logo" style={{ height: '50px', width: '50px',justifyContent:'center',display:'flex',alignItems:'center',borderRadius:'10px',marginLeft:'40%' }} />

              <div style={{ fontFamily: 'Poppins', fontWeight: 'bold', display: 'flex', marginBottom: '5px', marginTop: '5%' }}  >
                First Name
              </div>
             
              <TextField
                fullWidth
                error={Boolean(firstNameError)}
                helperText={firstNameError}
                value={firstName}
                InputProps={{
                  style: {
                    borderRadius: '50px',
                    fontSize: '14px', // Adjust the font size as needed
                    padding: '8px 12px', // Adjust the padding as needed
                    height: '45px' // Adjust the height as needed
                  }
                }}
                variant="outlined"
                onChange={(e) => setFirstName(e.target.value)}
                placeholder='First Name'
                sx={{
                  fontFamily: 'Poppins',
                  marginTop: '5px',
                  borderRadius: '50px',
                  marginRight: '60px',
                }}
              />

              <div style={{ fontFamily: 'Poppins', fontWeight: 'bold', display: 'flex', marginBottom: '5px', marginTop: '2px' }}  >
                Last Name
              </div>
              <TextField
                fullWidth
                error={Boolean(lastNameError)}
                helperText={lastNameError}
                value={lastName}
                InputProps={{
                  style: {
                    borderRadius: '50px',
                    fontSize: '14px', // Adjust the font size as needed
                    padding: '8px 12px', // Adjust the padding as needed
                    height: '45px' // Adjust the height as needed
                  }
                }}

                variant="outlined"
                onChange={(e) => setLastName(e.target.value)}
                placeholder='Last Name'

                sx={{
                  fontFamily: 'Poppins',
                  marginTop: '5px',
                  // padding: '10px', // Adjust the padding as needed
                  borderRadius: '50px', // Adjust the border radius as needed
                  marginRight: '60px',
                }}
              />

              <div style={{ fontFamily: 'Poppins', fontWeight: 'bold', display: 'flex', marginBottom: '5px', marginTop: '2px' }}  >
                Email Address
              </div>
              <TextField
                fullWidth
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}

                InputProps={{
                  style: {
                    borderRadius: '50px',
                    fontSize: '14px', // Adjust the font size as needed
                    padding: '8px 12px', // Adjust the padding as needed
                    height: '45px' // Adjust the height as needed
                  }
                }}

                variant="outlined"
                placeholder='Email Address*'
                error={Boolean(emailError)}
                helperText={emailError}

                sx={{
                  fontFamily: 'Poppins',
                  marginTop: '5px',
                  // padding: '10px', // Adjust the padding as needed
                  borderRadius: '50px', // Adjust the border radius as needed
                  marginRight: '60px',
                }}
              />

              <div style={{ fontFamily: 'Poppins', fontWeight: 'bold', display: 'flex', marginBottom: '5px', marginTop: '2px' }}  >
                Password
              </div>
              <TextField
                fullWidth

                error={Boolean(passwordError)}
                helperText={passwordError}

                InputProps={{
                  style: {
                    borderRadius: '50px',
                    fontSize: '14px', // Adjust the font size as needed
                    padding: '8px 12px', // Adjust the padding as needed
                    height: '45px' // Adjust the height as needed
                  },
                  type: showPassword ? 'text' : 'password',
                  endAdornment: (
                    <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  )
                }}

                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password*'

                sx={{
                  fontFamily: 'Poppins',
                  marginTop: '5px',
                  // padding: '10px', // Adjust the padding as needed
                  borderRadius: '50px', // Adjust the border radius as needed
                  marginRight: '60px',
                }}
              />

              <div style={{ fontFamily: 'Poppins', fontWeight: 'bold', display: 'flex', marginBottom: '5px', marginTop: '2px' }}  >
                Confirm Password
              </div>
              <TextField
                margin="normal"

                required
                fullWidth
                name="password"

                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                id="password"
                InputProps={{
                  style: {
                    borderRadius: '50px',
                    fontSize: '14px', // Adjust the font size as needed
                    padding: '8px 12px', // Adjust the padding as needed
                    height: '45px' // Adjust the height as needed
                  },
                  type: showPassword ? 'text' : 'password',
                  endAdornment: (
                    <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  )
                }}

                variant="outlined"
                placeholder='Confirm password*'

                sx={{
                  fontFamily: 'Poppins',
                  marginTop: '5px',
                  // padding: '10px', // Adjust the padding as needed
                  borderRadius: '50px', // Adjust the border radius as needed
                  marginRight: '60px',
                }}
              />





             
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </div >
  );
}