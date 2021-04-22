import React from 'react';
import Button from '@material-ui/core/Button';
import {purple} from '@material-ui/core/colors';
import { withStyles} from '@material-ui/core/styles';
import { SERVER_URL } from '../constants';


export default function Changestatus(props) {

  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: '#009688',
      '&:hover': {
        backgroundColor: '#00796b',
      },
    },
  }))(Button);
 
  
  const handleClickOpen = () => {
    
    kuittaa(props);
    
  };

  const kuittaa = (props) => {
    const tokenB = sessionStorage.getItem("jwt");
    const token = tokenB.slice(6);
    var link = SERVER_URL+"sarjas/"+props.linkki;
    fetch(link, {method: 'POST', headers: {'Authorization': token}})
    .then(res => props.fetchData())
    .catch(err => console.error(err))

    };
    

    return (
        <div>
        <ColorButton style={{margin: 10}} size="small" variant="contained" color="primary"  onClick={handleClickOpen}>
            Kuittaa
        </ColorButton>
        
    </div>
    ); 
}