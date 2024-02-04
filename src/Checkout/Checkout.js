import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Logiin from '../scenes/signup/logiin';
import Gender from '../scenes/signup/gender';
import Categorys from '../scenes/signup/Categorys';
import { useDispatch } from 'react-redux';
import SetAvatar from '../scenes/signup/SetAvatar';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
// import Review from './Review';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}





export default function Checkout() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [emailError, setEmailError] = React.useState('');
    const [firstNameError, setFirstNameError] = React.useState('');
    const [lastNameError, setLastNameError] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [city ,setCity] = React.useState('')
    const [country,setCountry] = React.useState('')
    const [selectedCountryValue, setSelectedCountryValue] = React.useState(null);
    const [datac, setDatac] = React.useState('')
    const [isClicked, setIsClicked] = React.useState(false);
    const [selectedChips, setSelectedChips] = React.useState([]);
    const [intrest, setInterest] = React.useState([]);
    const [bio, setBio] = React.useState([]);
    const [displayname, setDisplaynamee] = React.useState([]);
    const [Values, setValues] = React.useState('')
    const [Valuesone, setValuesone] = React.useState('')
    const [Valuescategory, setValuescategory] = React.useState('')
    const [error, setError] = React.useState("");


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const steps = ['Shipping address', 'Payment details', 'Review your order', 'Set Avatar'];

   console.log("Email:",gender)    

    var body = {email , password , firstName , lastName}
    var bodygen = {gender,city,datac}
    var bodygens = {selectedChips,intrest,displayname,bio}
    const handleNext = (e) => {
        setActiveStep(activeStep + 1);
        dispatch({type:'ADD_PATIENT',payload:[email,body]})
        dispatch({type:'ADD_GENDER',payload:[city,bodygen]})
        dispatch({type:'ADD_CATEGORY',payload:[selectedChips,bodygens]})
        
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleSignup = async () => {
        try {
          const signupData = {
            first_name: Values.firstName,
            last_name: Values.lastName,
            email: Values.email,
            password: Values.password,
            gender: Valuesone.gender,
            city : Valuesone.city,
            country : Valuesone.datac,
            bio : Valuescategory.bio,
            username : Valuescategory.displayname,
            intrest : Valuescategory.intrest,
            selectedChip : Valuescategory.selectedChips,
          };
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/api/user/register`,
            {
              method: "POST",
              body: JSON.stringify(signupData),
              headers: {
                "Content-Type": "application/json",
              },
              
            }
          );
    
          const data = await response.json();
          console.log("Signup response:", data);
          console.log("2")
    
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
    

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <Logiin firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} email={email} setEmail={setEmail} password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} emailError={emailError} setEmailError={setEmailError} firstNameError={firstNameError} setFirstNameError={setFirstNameError} lastNameError={lastNameError} setLastNameError={setLastNameError} passwordError={passwordError} setPasswordError={setPasswordError} />;
            case 1:
                return <Gender gender={gender} setGender={setGender} city={city} setCity={setCity} country={country} setCountry={setCountry} selectedCountryValue={selectedCountryValue} setSelectedCountryValue={setSelectedCountryValue} datac={datac} setDatac={setDatac}/>;
            case 2:
              return <Categorys isClicked={isClicked} setIsClicked={setIsClicked} selectedChips={selectedChips} setSelectedChips={setSelectedChips} intrest={intrest} setInterest={setInterest} bio={bio} setBio={setBio} displayname={displayname} setDisplaynamee={setDisplaynamee}/>;
            case 3:
                return <SetAvatar Values={Values} setValues={setValues} Valuesone={Valuesone} setValuesone={setValuesone} Valuescategory={Valuescategory} setValuescategory={setValuescategory} />;
            // case 3:
            //     return <SetAvatar />;
            default:
                throw new Error('Unknown step');
        }
    }

    console.log("Active Step:", firstName)

    return (
        <React.Fragment sx={{ backgroundColor: '#fff' }}>
            <CssBaseline />
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: 'relative',
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            >
                {/* <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar> */}
            </AppBar>
            <Container component="main" fullWidth sx={{ mb: 4, backgroundColor: '#fff' }}>
                {/* <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } , backgroundColor: '#fff' }}> */}
                {/* <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper> */}
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography variant="h5" gutterBottom>
                            Thank you for your order.
                        </Typography>
                        <Typography variant="subtitle1">
                            Your order number is #2001539. We have emailed your order
                            confirmation, and will send you an update when your order has
                            shipped.
                        </Typography>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        {getStepContent(activeStep)}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            {activeStep !== 0 && (
                                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                    Back
                                </Button>
                            )}

                            <Button
                                type="submit"
                                variant="contained"
                                onClick={() => {activeStep === steps.length -1 ? handleSignup() :handleNext()}}
                                // sx={{ mt: 3, mb: 2 }}
                                sx={{
                                    fontFamily: 'Poppins',
                                    marginTop: '30px',
                                    padding: '10px', // Adjust the padding as needed
                                    borderRadius: '50px', // Adjust the border radius as needed
                                    color: '#fff',
                                    backgroundColor: "#7066FD",
                                }}
                            >
                                {activeStep === steps.length - 1 ? 'signin'  : 'Continue'}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
                {/* </Paper> */}
                <Copyright />
            </Container>
        </React.Fragment>
    );
}