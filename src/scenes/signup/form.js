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

export default function Form() {
    const [firstname, setFirstName] = React.useState('');
    const [lastname, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
     
    

    


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
                    }}
                >
                    {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography> */}
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

                        <div style={{ fontFamily: 'Poppins', fontWeight: 'bold', display: 'flex' }} >
                            First Name
                        </div>
                        <TextField

                            fullWidth

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
                        <div style={{ fontFamily: 'Poppins', fontWeight: 'bold', display: 'flex' }} >
                            Email
                        </div>
                        <TextField

                            fullWidth

                            InputProps={{
                                style: { borderRadius: '50px' }
                            }}
                            variant="outlined"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Email'
                            sx={{
                                fontFamily: 'Poppins',
                                marginTop: '10px',
                                // padding: '10px', // Adjust the padding as needed
                                borderRadius: '50px', // Adjust the border radius as needed

                            }}
                        />
                        <div style={{ fontFamily: 'Poppins', fontWeight: 'bold', display: 'flex' }} >
                            Password
                        </div>
                        <TextField

                            fullWidth

                            InputProps={{
                                style: { borderRadius: '50px' }
                            }}
                            variant="outlined"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Password'
                            sx={{
                                fontFamily: 'Poppins',
                                marginTop: '10px',
                                // padding: '10px', // Adjust the padding as needed
                                borderRadius: '50px', // Adjust the border radius as needed

                            }}
                        />
                        <div style={{ fontFamily: 'Poppins', fontWeight: 'bold', display: 'flex' }} >
                            Comfirm Password
                        </div>
                        <TextField

                            fullWidth

                            InputProps={{
                                style: { borderRadius: '50px' }
                            }}
                            variant="outlined"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder='Comfirm Password'
                            sx={{
                                fontFamily: 'Poppins',
                                marginTop: '10px',
                                // padding: '10px', // Adjust the padding as needed
                                borderRadius: '50px', // Adjust the border radius as needed

                            }}
                        />


                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            // sx={{ mt: 3, mb: 2 }}
                            sx={{
                                fontFamily: 'Poppins',
                                marginTop: '40px',
                                padding: '10px', // Adjust the padding as needed
                                borderRadius: '50px', // Adjust the border radius as needed
                                color: '#fff',
                                backgroundColor: "#7066FD",

                            }}

                        >
                            Continue
                        </Button>
                        {/* <div style={{ fontFamily: 'Poppins', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }} >
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