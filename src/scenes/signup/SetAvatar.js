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
import { useEffect } from 'react';
// import MenuItem from '@material-ui/core/MenuItem';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CountryDropdown from './CountryDropDown';
import { useSelector } from 'react-redux';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {/* {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'} */}
//     </Typography>
//   );
// }


// const defaultTheme = createTheme();

// export default function SetAvatar({setValues,setValuesone,setValuescategory,Values,Valuesone,Valuescategory}) {
//     const [gender, setGender] = React.useState('');
    
//     // const [Values, setValues] = React.useState()
//     // const [Valuesone, setValuesone] = React.useState()
//     // const [Valuescategory, setValuescategory] = React.useState()
//     const navigate = useNavigate()


//     // var patient = useSelector(state =>state.patient)
//     // var keys = Object.keys(patient)
//     // var values = Object.values(patient)
//     // setValues(values)


//     // var genderone = useSelector(state =>state.gender)
//     // var keysone = Object.keys(genderone)
//     // var valueone = Object.values(genderone)
//     // setValuesone(valueone)
//     // console.log("Values :",Values[0].firstName)

    
//     // console.log("Values :",valueone)
//     // console.log("Valuesone:",values)

//     // var patientData = Object.values(patient)[0]
//     // console.log(patientData)

    
//     // var category = useSelector(state =>state.category)
//     // var keyscategory = Object.keys(category)
//     // var valuecategory = Object.values(category)
//     // setValuescategory(valuecategory)
    
    
//     // console.log("Valuesvvvv :",valueone[0].gender)
//     // // console.log("Valuesvvvv :",valueone[0].city)
//     // // console.log("Valuesvvvv :",valueone[0].datac)
//     // console.log("Vsvvvv :",values[0].firstName)
//     // console.log("Vcategorccc :",valuecategory[0].bio)
//     // console.log("Vcategoriii :",valuecategory[0].intrest)

//     const patientData = useSelector(state => state.patient);
//   const genderData = useSelector(state => state.gender);
//   const categoryData = useSelector(state => state.category);

//   // const firstName = patientData?.[0]?.firstName;

//   // const { email = '', firstName, lastName, password } = patientData;

//   // console.log("Email:", email);
//   const SignupDetail = Object.values(patientData)[0]
//   const GenderDetail = Object.values(genderData)[0]
//   const CategoryDetail = Object.values(categoryData)[0]
//   setValues(SignupDetail)
//   setValuesone(GenderDetail)
//   setValuescategory(CategoryDetail)
//   console.log("Patientccccc data:",Values.email);


//   console.log("Patient----- data:", SignupDetail);



//   const handleGenderChange = (event) => {
//     setGender(event.target.value);
//     console.log("1")
//   };

  

  
//   // const handleSubmit = (event) => {
//   //   event.preventDefault();
//   //   const data = new FormData(event.currentTarget);
//   //   handleSignup(data);
//   // };
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     console.log("3")
//     // await handleSignup();
//   };

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             borderRadius: '10px',
//             backgroundColor: 'white',
//           }}
//         >
          
         
//           <Box component="form" noValidate sx={{ mt: 1 }}>
//           <div style={{fontFamily:'Poppins',fontWeight:'bold',display:'flex', marginBottom:'5px', fontSize:'40px'}} >
//             Setup your avatar
//           </div>
//           <div style={{fontFamily:'Poppins',fontWeight:'bold',display:'flex',justifyContent:'center',alignItems:'center', marginBottom:'5px'}} >
//           <Avatar sx={{ m: 1, bgcolor: '#30e14e',height:'100px',width:'100px' }}>
//             {/* <LockOutlinedIcon /> */}
//           </Avatar>
//           </div>
//           {/* <input  style={{ display: 'none' }}  /> */}
            

//             {/* <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               // sx={{ mt: 3, mb: 2 }}
//               sx={{
//                 fontFamily: 'Poppins',
//                 marginTop:'40px',
//                 padding: '10px', // Adjust the padding as needed
//                 borderRadius: '50px', // Adjust the border radius as needed
//                 color:'#fff',
//                 backgroundColor: "#7066FD",
            
//             }}

//             >
//               Submmit
//             </Button> */}
//             {/* <div style={{fontFamily:'Poppins',fontWeight:'bold',display:'flex',justifyContent:'center',alignItems:'center',marginTop:'10px'}} >
//             Skip to continue
//           </div> */}
//             <Grid container>
             
              
//             </Grid>
//           </Box>
//         </Box>
//         <Copyright sx={{ mt: 8, mb: 4 }} />
//       </Container>
//     </ThemeProvider>
//   );
// }


const defaultTheme = createTheme();
export default function SetAvatar({setValues,setValuesone,setValuescategory,Values,Valuesone,Valuescategory,image,setImage}) {
  const [gender, setGender] = React.useState('');
  const [src, setSrc] = React.useState(null);
  // const [preview, setPreview] = React.useState(null);
 
  
  const handleImageChange = (event) => {
    console.log("HEll")
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  }

  // const onClose =()=>{
  //     setPreview(null)
  // }

  // const onCrop = view =>{
  //     setPreview(view)
  // }
  
  // const [Values, setValues] = React.useState()
  // const [Valuesone, setValuesone] = React.useState()
  // const [Valuescategory, setValuescategory] = React.useState()
  const navigate = useNavigate()


  // var patient = useSelector(state =>state.patient)
  // var keys = Object.keys(patient)
  // var values = Object.values(patient)
  // setValues(values)


  // var genderone = useSelector(state =>state.gender)
  // var keysone = Object.keys(genderone)
  // var valueone = Object.values(genderone)
  // setValuesone(valueone)
  // console.log("Values :",Values[0].firstName)

  
  // console.log("Values :",valueone)
  // console.log("Valuesone:",values)

  // var patientData = Object.values(patient)[0]
  // console.log(patientData)

  
  // var category = useSelector(state =>state.category)
  // var keyscategory = Object.keys(category)
  // var valuecategory = Object.values(category)
  // setValuescategory(valuecategory)
  
  
  // console.log("Valuesvvvv :",valueone[0].gender)
  // // console.log("Valuesvvvv :",valueone[0].city)
  // // console.log("Valuesvvvv :",valueone[0].datac)
  // console.log("Vsvvvv :",values[0].firstName)
  // console.log("Vcategorccc :",valuecategory[0].bio)
  // console.log("Vcategoriii :",valuecategory[0].intrest)

  const patientData = useSelector(state => state.patient);
const genderData = useSelector(state => state.gender);
const categoryData = useSelector(state => state.category);

// const firstName = patientData?.[0]?.firstName;

// const { email = '', firstName, lastName, password } = patientData;

// console.log("Email:", email);
const SignupDetail = Object.values(patientData)[0]
const GenderDetail = Object.values(genderData)[0]
const CategoryDetail = Object.values(categoryData)[0]
setValues(SignupDetail)
setValuesone(GenderDetail)
setValuescategory(CategoryDetail)
console.log("Patientccccc data:",Values.email);


console.log("Patient----- data:", SignupDetail);



const handleGenderChange = (event) => {
  setGender(event.target.value);
  console.log("1")
};

const handleAvatarClick = () => {
  // Trigger the file input when the avatar is clicked
  document.getElementById('avatar-input').click();
};


// const handleSubmit = (event) => {
//   event.preventDefault();
//   const data = new FormData(event.currentTarget);
//   handleSignup(data);
// };
const handleSubmit = async (event) => {
  event.preventDefault();
  console.log("3")
  // await handleSignup();
};
// useEffect(()=>{
//   console.log(preview)
// },[preview])

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
        
       
        <Box component="form" noValidate sx={{ mt: 1 }}>
        <div style={{fontFamily:'Poppins',fontWeight:'bold',display:'flex', marginBottom:'5px', fontSize:'40px'}} >
          Setup your avatar
        </div>
              {/* <Avatar sx={{ m: 1, bgcolor: '#30e14e',height:'100px',width:'100px' }}> */}
          {/* <LockOutlinedIcon /> */}
        {/* </Avatar> */}


        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <input
      id="avatar-input"
      type="file"
      accept="image/*"
      style={{ display: 'none' }}
      onChange={handleImageChange}
    />
    <Avatar
      sx={{ m: 1, bgcolor: '#30e14e', height: '100px', width: '100px', cursor: 'pointer' }}
      alt="User Avatar"
      src={image}
      onClick={handleAvatarClick}
    />
    <label htmlFor="avatar-input">
      {/* <IconButton
        color="primary"
        aria-label="upload picture"
        component="span"
      >
        <PhotoCamera />
      </IconButton> */}
    </label>
  </div>

        {/* <div style={{fontFamily:'Poppins',fontWeight:'bold',display:'flex',justifyContent:'center',alignItems:'center', marginBottom:'5px'}} >
        <Avatar sx={{ m: 1, bgcolor: '#30e14e',height:'40px',width:'30px' }}
        onCrop={onCrop}
        onClose={onClose}
        src={src}
        />
          <img src={preview} /> */}
          {/* {preview && <img src={preview} />} */}
          {/* <LockOutlinedIcon /> */}
         
        {/* </div> */}
        {/* <input  style={{ display: 'none' }}  /> */}
          

          {/* <Button
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
          </Button> */}
          {/* <div style={{fontFamily:'Poppins',fontWeight:'bold',display:'flex',justifyContent:'center',alignItems:'center',marginTop:'10px'}} >
          Skip to continue
        </div> */}
          <Grid container>
           
            
          </Grid>
        </Box>
      </Box>
      {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
    </Container>
  </ThemeProvider>
);
}