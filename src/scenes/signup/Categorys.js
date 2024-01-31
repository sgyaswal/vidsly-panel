import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
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
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import MenuItem from '@material-ui/core/MenuItem';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CountryDropdown from './CountryDropDown';
import Chip from '@mui/material/Chip';
import './chips.css'
import Intrest from './Intrest';
import { useNavigate } from 'react-router-dom';
// import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
// import Grid from '@mui/material/Grid';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import './chips.css';
import TakeoutDiningIcon from '@mui/icons-material/TakeoutDining';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import BusinessIcon from '@mui/icons-material/Business';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaMicrophone } from "react-icons/fa";
import { FaRegSmile } from "react-icons/fa";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { useDispatch } from 'react-redux';




    const handleClick = () => {
      console.info('You clicked the Chip.');
    };


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

export default function Category() {
    // const [gender, setGender] = React.useState('');
    const [isClicked, setIsClicked] = useState(false);
    const [selectedChips, setSelectedChips] = useState([]);
    const [intrest, setInterest] = useState([]);
    const [bio, setBio] = useState([]);
    const [displayname, setDisplaynamee] = useState([]);
    const nevigate = useNavigate()
    const dispatch = useDispatch()

//   const handleClick = () => {
//     setIsClicked(!isClicked);
//     // setIsClicked(true);

//   };

// const handleClick = (label) => {
//     setSelectedChip(label);
//     console.log("Dekhte hai ",label)
//   };

  // const handleClick = (label) => {
  //   setSelectedChips((prevSelectedChips) => {
  //     if (prevSelectedChips.includes(label)) {
  //       return prevSelectedChips.filter((chip) => chip !== label);
  //     } else {
  //       return [...prevSelectedChips, label];
  //     }
  //   });
  // };

  useEffect(() => {
    // Log the initial state of selectedChips
    // console.log('Initial Selected Chips:', selectedChips);

    // Check if selectedChips is empty, and if so, add a dummy chip at index 0
    // if (selectedChips.length === 0) {
    //   setSelectedChips(['Dummy']);
    // }
  }, [selectedChips]);


  const handleIntrest = (event) => {
    const { value, checked } = event.target;
    console.log(`${value} is ${checked}`)
    if (checked) {
      
      setInterest([...intrest, value]);
    } else {
      setInterest(intrest.filter((event) => event !== value));
    }
    
  };

  console.log("...",intrest)

  const handleClick = (label) => {
     
    if (selectedChips.includes(label)) {
      // If the chip is already selected, remove it
      setSelectedChips(selectedChips.filter(chip => chip !== label));
    } else {
      // If the chip is not selected, add it
      setSelectedChips([...selectedChips, label]); 
    }
    
    console.log('Selected Chips:', selectedChips);
  
  };
  
  const handleClickArtist = () => {
    setIsClicked(!isClicked);
    // setIsClicked(true);

  };
  var bodygen = {selectedChips,intrest,displayname,bio}
  const handlePageChange = () => {
    dispatch({type:'ADD_CATEGORY',payload:[selectedChips,bodygen]})
    nevigate('/stepfour')
  }

  console.log(" Redux store :",selectedChips,intrest,displayname,bio)

//   const chipClass = poppins-chip${isClicked ? ' clicked' : ''};
const chipStyle = {
    fontFamily: 'Poppins',
    background: isClicked ? '#7066FD' : 'transparent',
    color: isClicked ? 'white' : 'black',
  };

  const chipStyles = {
    default: {
      fontFamily: 'Poppins',
      backgroundColor: '#fff', // Default background color
    //   border: '1px solid black',
    //   padding: '2px',
      margin: '2px',
      cursor: 'pointer',
    },
    selected: {
      fontFamily: 'Poppins',
      backgroundColor: '#7066FD', // Clicked chip background color
      color: '#fff',
      padding: ' 2px',
      margin: '5px',
      

    },
  };

//   const handleGenderChange = (event) => {
//     setGender(event.target.value);
//   };
const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

  
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
          <div style={{fontFamily:'Poppins',fontWeight:'bold',display:'flex', marginBottom:'5px'}} >
            I am
          </div>
           <div style={{fontFamily:'Poppins'}} >
           
          {/* <Chip label="Clickable" onClick={handleClick} className={chipStyle} /> */}
          {/* <Chip label="->" onClick={() => handleClick('')} 
        //   style={chipStyle}
        //    style={selectedChip === 'Content Creator' ? chipStyles.selected : chipStyles.default}
        style={selectedChips.includes('') ? chipStyles.selected : chipStyles.default}

          /> */}

          <Chip label="Content Creator" onClick={() => handleClick('Content Creator')} 
        //   style={chipStyle}
        //    style={selectedChip === 'Content Creator' ? chipStyles.selected : chipStyles.default}
        style={selectedChips.includes('Content Creator') ? chipStyles.selected : chipStyles.default}

          />
          <Chip label="Artist" onClick={() => handleClick('Artist')} 
        //  style={selectedChip === 'Artist' ? chipStyles.selected : chipStyles.default}
        style={selectedChips.includes('Artist') ? chipStyles.selected : chipStyles.default}

          />
          <Chip label="Vlogger" onClick={() => handleClick('Vlogger')} 
         style={selectedChips.includes('Vlogger') ? chipStyles.selected : chipStyles.default}

          />
          <Chip label="Gamer" onClick= {() => handleClick('Gamer')} 
           style={selectedChips.includes('Gamer') ? chipStyles.selected : chipStyles.default}

          />
          <Chip label="Brand" onClick= {() => handleClick('Brand')} 
           style={selectedChips.includes('Brand') ? chipStyles.selected : chipStyles.default}

          />
          <Chip label="Public Figure" onClick= {() => handleClick('Public Figure')} 
           style={selectedChips.includes('Public Figure') ? chipStyles.selected : chipStyles.default}

          />
          <Chip label="Influencer" onClick= {() => handleClick('Influencer')} 
           style={selectedChips.includes('Influencer') ? chipStyles.selected : chipStyles.default}

          />
          <Chip label="Enterpreneur" onClick= {() => handleClick('Enterpreneur')} 
           style={selectedChips.includes('Enterpreneur') ? chipStyles.selected : chipStyles.default}

          />
          <Chip label="Chef" onClick= {() => handleClick('Chef')} 
           style={selectedChips.includes('Chef') ? chipStyles.selected : chipStyles.default}

          />
          <Chip label="Publisher" onClick= {() => handleClick('Publisher')} 
           style={selectedChips.includes('Publisher') ? chipStyles.selected : chipStyles.default}

          />
          <Chip label="other" onClick= {() => handleClick('Other')} 
           style={selectedChips.includes('Other') ? chipStyles.selected : chipStyles.default}

          />
          


          {/* <Chip label="Clickable" onClick={handleClick} className='poppins-chip' />

          <Chip label="Clickable" onClick={handleClick} className='poppins-chip' />

          <Chip label="Clickable" onClick={handleClick} className='poppins-chip' />

          <Chip label="Clickable" onClick={handleClick} className='poppins-chip' /> */}

          </div>
    
         

      <div style={{fontFamily:'Poppins',fontWeight:'bold',display:'flex', marginBottom:'5px'}} >
            I make content related to 
          </div>
          
          {/* <Intrest/> */}


          <ThemeProvider theme={theme}>
    <FormControl component="fieldset">
      {/* <FormLabel component="legend">Label placement</FormLabel> */}
      <FormGroup aria-label="position" value={intrest} row>
      <Grid container spacing={2}>
        <Grid item xs={6}  >
        <div style={{ display: 'flex', alignItems: 'center',backgroundColor:'#f2f3f5',borderRadius:'7px' }}>
  
        <EmojiEventsIcon style={{ marginLeft: '10px' }} />
          <FormControlLabel
            value="Sports"
            onChange={handleIntrest}
            style={{fontFamily:'Poppins',fontWeight:'400'}}
            control={<Checkbox checked={intrest.includes("Sports")} style={{marginLeft:'50px'}}/>}
            label="Sports"
            labelPlacement="start"
          />
           </div>
        </Grid>
       
        <Grid item xs={6}>
        <div style={{ display: 'flex', alignItems: 'center' ,backgroundColor:'#f2f3f5',borderRadius:'7px'}}>
  
        <TakeoutDiningIcon style={{ marginLeft: '10px' }} />  
          <FormControlLabel
            value="Food"
            onChange={handleIntrest}
            control={<Checkbox checked={intrest.includes("Food")} style={{marginLeft:'50px'}}/>}
            // control={<Checkbox style={{marginLeft:'50px'}} />}
            label="Food"
            labelPlacement="start"
          />
           </div>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
        <div style={{ display: 'flex', alignItems: 'center',backgroundColor:'#f2f3f5',borderRadius:'7px' }}>
        <VideoCameraFrontIcon style={{ marginLeft: '10px' }} />
   
          <FormControlLabel
            value="Photography"
            onChange={handleIntrest}
            control={<Checkbox checked={intrest.includes("Photography")} />}
            label="Photography"
            labelPlacement="start"
          />
          </div>
        </Grid>
        <Grid item xs={6}>
        <div style={{ display: 'flex', alignItems: 'center',backgroundColor:'#f2f3f5',borderRadius:'7px' }}>
        <BusinessIcon style={{ marginLeft: '10px' }} />
   
          <FormControlLabel
            value="Business"
            onChange={handleIntrest}
            control={<Checkbox checked={intrest.includes("Business")} style={{marginLeft:'20px'}} />}
            label="Business"
            labelPlacement="start"
          />
          </div>
        </Grid>

        
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
        <div style={{ display: 'flex', alignItems: 'center',backgroundColor:'#f2f3f5',borderRadius:'7px' }}>
       
        <AudiotrackIcon style={{ marginLeft: '10px' }} />

          <FormControlLabel
            value="Music"
            onChange={handleIntrest}
            control={<Checkbox  checked={intrest.includes("Music")} style={{marginLeft:'60px'}} />}
            label="Music"
            labelPlacement="start"
          />
          </div>
        </Grid>
        <Grid item xs={6}>
        <div style={{ display: 'flex', alignItems: 'center',backgroundColor:'#f2f3f5',borderRadius:'7px' }}>
            <SentimentSatisfiedAltIcon  style={{ marginLeft: '10px' }} />
          <FormControlLabel
            value="Entertainment"
            onChange={handleIntrest}
            control={<Checkbox checked={intrest.includes("Entertainment")} />}
            label="Entertainment"
            labelPlacement="start"
          />
          </div>
        </Grid>

        
      </Grid>

      <Grid container spacing={2}>

        <Grid item xs={6}>
        <div style={{ display: 'flex', alignItems: 'center',backgroundColor:'#f2f3f5',borderRadius:'7px' }}>
       
          <FormControlLabel
           onChange={handleIntrest}
            value="Others"
            control={<Checkbox checked={intrest.includes("Others")} style={{marginLeft:'80px'}} />}
            label="Others"
            labelPlacement="start"
          />
          </div>
        </Grid>
     

        
      </Grid>
    </FormGroup>
    </FormControl>
    </ThemeProvider>

      {/* <CountryDropdown /> */}

            {/* <TextField
              margin="normal"
              required
              fullWidth
              id="gender"
              label="Gender"
              name="gender"
              autoComplete="gender"
              autoFocus
              InputProps={{
                style: { borderRadius: '50px'  }
              }}
            /> */}

             {/* <TextField
             fullWidth
        hiddenLabel
        id="filled-hidden-label-normal"
        defaultValue="Normal"
        variant="filled"
      /> */}
       <div style={{fontFamily:'Poppins',fontWeight:'bold',display:'flex'}} >
            Display name
          </div>
            <TextField
            //   margin="normal"
            //   variant="filled"
            // //   required
              fullWidth
              onChange={(e) => setDisplaynamee(e.target.value)}
              placeholder='Display name*'
              value ={displayname}
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
              // placeholder='City*'
              sx={{
                  fontFamily: 'Poppins',
                  marginTop:'10px',
                  // padding: '10px', // Adjust the padding as needed
                  borderRadius: '50px', // Adjust the border radius as needed
              
              }}
            />
            {/* <input
      style={{
        borderRadius: '50px',
        border: '2px solid black',
        padding: '5px',
        backgroundColor:'red'
      }}
      
    /> */}
     <div style={{fontFamily:'Poppins',fontWeight:'bold',display:'flex'}} >
            Bio
          </div>

          <TextField
       onChange={(e) => setBio(e.target.value)}     
       value ={bio}
      fullWidth
      multiline
      rows={3}
      variant="outlined"
      placeholder="A quick blurb about you "
    //   InputProps={{
    //     style: { borderRadius: '50px' },
    //   }}
      sx={{
        fontFamily: 'Poppins',
        marginTop: '10px',
        borderRadius: '5px',
      }}
    />
            

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
              Continue
            </Button>
            <div style={{fontFamily:'Poppins',fontWeight:'500',display:'flex',justifyContent:'center',alignItems:'center',marginTop:'10px'}} >
            Skip this step
          </div>
            <Grid container>
             
              
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}