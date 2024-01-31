import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
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

export default function Intrest() {
  const theme = createTheme({
    typography: {
      fontFamily: 'Poppins, sans-serif',
    },
  });

  return (
    <ThemeProvider theme={theme}>
    <FormControl component="fieldset">
      {/* <FormLabel component="legend">Label placement</FormLabel> */}
      <FormGroup aria-label="position" row>
      <Grid container spacing={2}>
        <Grid item xs={6}  >
        <div style={{ display: 'flex', alignItems: 'center',backgroundColor:'#f2f3f5',borderRadius:'7px' }}>
  
        <EmojiEventsIcon style={{ marginLeft: '10px' }} />
          <FormControlLabel
            value="Sports"
            style={{fontFamily:'Poppins',fontWeight:'400'}}
            control={<Checkbox   style={{marginLeft:'50px'}}/>}
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
            control={<Checkbox style={{marginLeft:'50px'}} />}
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
            control={<Checkbox  />}
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
            control={<Checkbox style={{marginLeft:'20px'}} />}
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
            control={<Checkbox style={{marginLeft:'60px'}} />}
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
            control={<Checkbox  />}
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
            value="Others"
            control={<Checkbox style={{marginLeft:'80px'}} />}
            label="Others"
            labelPlacement="start"
          />
          </div>
        </Grid>
     

        
      </Grid>
    </FormGroup>
    </FormControl>
    </ThemeProvider>
  );
}