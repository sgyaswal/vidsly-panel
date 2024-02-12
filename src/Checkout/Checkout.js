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
import { useDispatch, useSelector } from 'react-redux';
import SetAvatar from '../scenes/signup/SetAvatar';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ErrorMessage from '../scenes/signup/ErrorMessage';
import { act } from 'react-dom/test-utils';
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
    const [city, setCity] = React.useState('')
    const [country, setCountry] = React.useState('')
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
    const [FirstNameError, setfirstNameError] = React.useState("");
    const [LastNameError, setlastNameError] = React.useState("");
    const [EmailError, setemailError] = React.useState("");
    const [PasswordError, setpasswordError] = React.useState("");
    const [countryError, setcountryError] = React.useState("");
    const [cityError, setcityError] = React.useState("");
    const [GenderError, setgenderError] = React.useState("");
    const [bioError, setbioError] = React.useState("");
    const [displaynameError, setdisplaynameError] = React.useState("");



    const dispatch = useDispatch()
    const navigate = useNavigate()

    const steps = ['Shipping address', 'Payment details', 'Review your order', 'Set Avatar'];

    console.log("Email:", gender)

    var body = { email, password, firstName, lastName }
    var bodygen = { gender, city, datac }
    var bodygens = { selectedChips, intrest, displayname, bio }

    const handleNext = (step) => {
        var error = false
        switch (step) {
            case 0:
                {
                    if (firstName.trim() === '') {
                        setFirstNameError('First Name is required');
                        error = true
                    }
                    else {
                        setFirstNameError('')
                    }

                    if (lastName.trim() === '') {
                        setLastNameError('Last Name is required');
                        error = true
                    }
                    else {
                        setLastNameError('')
                    }
                    if (email.trim() === '' || !(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/).test(email)) {
                        setEmailError('Email is required');
                        error = true
                    }
                    else {
                        setEmailError('')
                    }
                    if (password.trim() === '') {
                        setPasswordError('Password is required');
                        error = true
                    }
                    else {
                        setPasswordError('')
                    }
                    if (password !== confirmPassword) {
                        setPasswordError('Password do not match');
                        error = true
                    }

                    break;
                }

            case 1:
                {
                    if (gender?.trim() === '') {
                        setgenderError("Gender is required")
                        error = true
                    }
                    else {
                        setgenderError('')
                    }
                    if (city.trim() === '') {
                        setcityError("City is required")
                        error = true
                    }
                    else {
                        setcityError('')
                    }
                    break;
                }
            case 2:
                {
                    if (bio.length === 0) {
                        setbioError("Bio is required")
                        error = true
                    }
                    else {
                        setbioError('')
                    }
                    if (displayname.length === 0) {
                        setdisplaynameError("Display Name is required")
                        error = true
                    }
                    else {
                        setdisplaynameError('')
                    }
                    break;
                }
            default:
                { }
        }
        if (error === false) {
            setActiveStep(activeStep + 1);
            dispatch({ type: 'ADD_PATIENT', payload: [email, body] })
            dispatch({ type: 'ADD_GENDER', payload: [city, bodygen] })
            dispatch({ type: 'ADD_CATEGORY', payload: [selectedChips, bodygens] })
        }


        return error

    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const patientsData = useSelector(state => state.patient);
    const gendersData = useSelector(state => state.gender);
    const categorysData = useSelector(state => state.category);

    const SignupsDetail = Object.values(patientsData)[0]
    const GendersDetail = Object.values(gendersData)[0]
    const CategorysDetail = Object.values(categorysData)[0]


    React.useEffect(() => {
        if (SignupsDetail && SignupsDetail.firstName) {
            setFirstName(SignupsDetail.firstName);
        }
        if (SignupsDetail && SignupsDetail.lastName) {
            setLastName(SignupsDetail.lastName);
        }
        if (SignupsDetail && SignupsDetail.email) {
            setEmail(SignupsDetail.email);
        }
        if (SignupsDetail && SignupsDetail.password) {
            setPassword(SignupsDetail.password);
        }
        if (GendersDetail && GendersDetail.gender) {
            setGender(GendersDetail.gender);
        }
        if (GendersDetail && GendersDetail.city) {
            setGender(GendersDetail.city);
        }
        if (CategorysDetail && CategorysDetail.bio) {
            setBio(CategorysDetail.bio)
        }
        if (CategorysDetail && CategorysDetail.displayname) {
            setDisplaynamee(CategorysDetail.displayname)
        }

    }, [activeStep, SignupsDetail, GendersDetail, CategorysDetail]);
    console.log("SignupsDetail:", email)

    const handleSignup = async () => {
        try {
            const signupData = {
                first_name: Values.firstName,
                last_name: Values.lastName,
                email: Values.email,
                password: Values.password,
                gender: Valuesone.gender,
                city: Valuesone.city,
                country: Valuesone.datac,
                bio: Valuescategory.bio,
                username: Valuescategory.displayname,
                intrest: Valuescategory.intrest,
                selectedChip: Valuescategory.selectedChips,
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
                return <Logiin firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} email={email} setEmail={setEmail} password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} emailError={emailError} setEmailError={setEmailError} firstNameError={firstNameError} setFirstNameError={setFirstNameError} lastNameError={lastNameError} setLastNameError={setLastNameError} passwordError={passwordError} setPasswordError={setPasswordError} FirstNameError={FirstNameError} setfirstNameError={setfirstNameError} LastNameError={LastNameError} setlastNameError={setlastNameError} EmailError={EmailError} setemailError={setemailError} PasswordError={PasswordError} setpasswordError={setpasswordError} />;

            case 1:
                return <Gender gender={gender} setGender={setGender} city={city} setCity={setCity} country={country} setCountry={setCountry} selectedCountryValue={selectedCountryValue} setSelectedCountryValue={setSelectedCountryValue} datac={datac} setDatac={setDatac} GenderError={GenderError} setgenderError={setgenderError} countryError={countryError} setcountryError={setcountryError} cityError={cityError} setcityError={setcityError} />;
            case 2:
                return <Categorys isClicked={isClicked} setIsClicked={setIsClicked} selectedChips={selectedChips} setSelectedChips={setSelectedChips} intrest={intrest} setInterest={setInterest} bio={bio} setBio={setBio} displayname={displayname} setDisplaynamee={setDisplaynamee} bioError={bioError} setbioError={setbioError} displaynameError={displaynameError} setdisplaynameError={setdisplaynameError} />;
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
        <React.Fragment>
            <CssBaseline />
            <Container component="main" sx={{
                width: '100%', minWidth: '100%',
                //  background: 'linear-gradient(45deg, #87CEEB, #FFB6C1)'
                background: activeStep === 0 ? 'linear-gradient(45deg, #87CEEB, #FFB6C1)' : 'inherit'
                
                 }} >

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
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end'  }}>
                            {activeStep !== 0 && (
                                <Button onClick={handleBack}
                                    //  sx={{ mt: 3, ml: 1 }}
                                    sx={{
                                        fontFamily: 'Poppins',
                                        marginTop: '5%',
                                        marginRight: '1%',
                                        padding: '15px 30px',
                                        borderRadius: '50px',
                                        color: '#fff',
                                        backgroundColor: "#7066FD",
                                        fontSize: '13px',
                                    }}
                                >
                                    Back
                                </Button>
                            )}

                            <Button
                                type="submit"
                                variant="contained"

                                onClick={() => { activeStep === steps.length - 1 ? handleSignup() : handleNext(activeStep) }}

                                // sx={{
                                //     fontFamily: 'Poppins',
                                //     marginTop: '10px',
                                //     marginRight: '45%',
                                //     padding: '15px 30px',
                                //     borderRadius: '50px',
                                //     color: '#fff',
                                //     backgroundColor: "#7066FD",
                                //     fontSize: '13px',
                                // }}

                                sx={{
                                    fontFamily: 'Poppins',
                                    marginTop: '5%',
                                  
                                    marginRight: '42%',
                                    padding: '15px 30px',
                                    borderRadius: '50px',
                                    color: '#fff',
                                    backgroundColor: "#7066FD",
                                    fontSize: '13px',
                                    
                                }}
                            >
                                {activeStep === steps.length - 1 ? 'signin' : 'Continue'}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
                {/* </Paper> */}
            </Container>
        </React.Fragment>
    );
}