import React from 'react';
import Button from '@material-ui/core/Button';
import {purple} from '@material-ui/core/colors';
import { withStyles, makeStyles} from '@material-ui/core/styles';
import { SERVER_URL } from '../constants';


export default function Resetstatus(props) {
  
    const useStyles = makeStyles((theme) => ({
        margin: {
          margin: theme.spacing(0),
          
        },
      }));
    
      
     const classes = useStyles();
 
    const changeStatus = () => {
        const tokenB = sessionStorage.getItem("jwt");
        const token = tokenB.slice(6);
    
        fetch(SERVER_URL+'statusReset', {method: 'POST', headers: {'Authorization': token, 'Content-Type': 'application/json'}})
        .then(res => props.fetchData())
        .catch(err => console.error(err))
         
      }

  const handleClickOpen = () => {
        changeStatus();
  };

  

  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: '#009688',
      '&:hover': {
        backgroundColor: '#00796b',
      },
    },
  }))(Button);

  


    return (
        <div>
         <ColorButton variant="contained" color="primary" className= {classes.margin} onClick={handleClickOpen}>
            Nollaa kuittaukset
        </ColorButton>
    </div>
    );
}