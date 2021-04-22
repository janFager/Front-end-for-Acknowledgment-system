import React from 'react';
import Button from '@material-ui/core/Button';
import {purple} from '@material-ui/core/colors';
import { withStyles, makeStyles} from '@material-ui/core/styles';


export default function Logout(props) {
  
    const useStyles = makeStyles((theme) => ({
        margin: {
          margin: theme.spacing(2),
          
        },
      }));
    
      
     const classes = useStyles();
 


  const handleClickOpen = () => {
        props.logout();
  };

  

  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: '#01579b',
      '&:hover': {
        backgroundColor: '#0277bd',
      },
    },
  }))(Button);

  


    return (
        <div>
         <ColorButton variant="contained" color="primary" className= {classes.margin} onClick={handleClickOpen}>
            Kirjaudu ulos
        </ColorButton>
    </div>
    );
}