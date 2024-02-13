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
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Vidsly Platform
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const defaultTheme = createTheme();

export default function Gender({ gender, city, country, selectedCountryValue, setCity, setGender, setSelectedCountryValue, setCountry, setSignupone, datac, setDatac , GenderError, CityError, CountryError , setGenderError, setCityError, setCountryError}) {
  // const [city ,setCity] = React.useState('')
  // const [gender, setGender] = React.useState('');
  // const [country,setCountry] = React.useState('')
  // const [selectedCountryValue, setSelectedCountryValue] = React.useState(null);

  const handleCountryChange = (selectedCountry) => {
    setSelectedCountryValue(selectedCountry);
  };
  // const [signupone, setSignupone] = React.useState('');
  const nevigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  // console.log(location.state)
  // setSignupone(location.state)

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  let datacs
  function getData(data) {
    console.log(data)
    datacs = data
    setDatac(datacs)
  }

  // var bodygen = {gender,city,datac}
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
            borderRadius: '10px',
            backgroundColor: 'white',
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography> */}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <div style={{ fontFamily: 'Poppins', fontWeight: 'bold', display: 'flex', marginBottom: '10px' }} >
              Gender
            </div>

            <Select
              value={gender}
              error = {Boolean(GenderError)}
              helperText={GenderError} 
              onChange={handleGenderChange}
              displayEmpty
              fullWidth
              id="gender"
              name="gender"
              
              style={{ borderRadius: '100px', width: '25vw', marginBottom: '10px' }}
            
            >
              <MenuItem value="" disabled  >
                Select Gender
              </MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="others">Others</MenuItem>
            </Select>

            <div  style={{fontFamily:'Poppins',fontWeight:'bold',display:'flex', marginTop:'5px', marginBottom:'10px'}} >
              Country
            </div>

            <CountryDropdown getData={getData} />

            <div style={{fontFamily:'Poppins',fontWeight:'bold',display:'flex', marginBottom:'10px',marginTop:'5px'}}  >
              City
            </div>
            <TextField

              fullWidth

              onChange={(e) => setCity(e.target.value)}
              InputProps={{
                style: { borderRadius: '50px' }
              }}
              variant="outlined"
              placeholder='City*'
              error = {Boolean(CityError)}
              helperText={CityError}
              value={city}
              sx={{
                fontFamily: 'Poppins',
                marginTop: '10px',
                // padding: '10px', // Adjust the padding as needed
                borderRadius: '50px', // Adjust the border radius as needed
                marginRight: '60px',
                marginBottom: '10px'
              }}
            />




            <Grid container>


            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}