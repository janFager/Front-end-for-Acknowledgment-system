import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import {purple} from '@material-ui/core/colors';
import { withStyles, makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { SERVER_URL } from '../constants';


const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(2),
      
    },
  }));


export default function Addseason(props) {
  const [open, setOpen] = React.useState(false);
    
  const [seasons, setSeasons] = React.useState({
    
  });
  
    const classes = useStyles();
  const [open1, setOpen1] = React.useState(false);



  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };

  const handleClose = () => {
      
      setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose1 = (event, reason) => {
    if(reason === 'clickaway') {
        return;
    }

    setOpen1(false);
};


const season = [];
useEffect(() => fetchData(), []);


const fetchData = () => {
  const tokenB = sessionStorage.getItem("jwt");
  const token = tokenB.slice(6);
    fetch(SERVER_URL+'seasons', {
      headers: {'Authorization': token, 'Content-Type': 'application/json'}
    })
    .then(response => response.json()
    .then(data => {


    let events = data;

      for(let k = 0; k<events._embedded.validSeasons.length; k++){
        var kausi = events._embedded.validSeasons[k].seasonName;
        if (kausi==="winter"){
          season.push({
            id: events._embedded.validSeasons[k].id,
            seasonName: "Talvikausi",
            validFrom: events._embedded.validSeasons[k].validFrom,
            validTo: events._embedded.validSeasons[k].validTo

          })
        } else {
          season.push({
            id: events._embedded.validSeasons[k].id,
            seasonName: "Kesäkausi",
            validFrom: events._embedded.validSeasons[k].validFrom,
            validTo: events._embedded.validSeasons[k].validTo

          })
        }
  
        
       
      }
      setSeasons(season);
  },
  (error) => ({
    
  })))
};


 const updateSeason = (season, link) => {
  const tokenB = sessionStorage.getItem("jwt");
  const token = tokenB.slice(6);
  var linkki = SERVER_URL+"seasons/"+link;
    fetch(linkki, {
        method: 'PUT',
        headers: {'Authorization': token, 'Content-Type': 'application/json'},
        body: JSON.stringify(season)
    }) 
    .then(res => fetchData())
    .catch(err => console.error(err))
    
    
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

  const [nameError, setNameError] = useState({
    error: false,
    label: '',
    helperText: ''
});
  const columns = [
    
    
    {
        title: 'Kausi',
        field: 'seasonName', 
        editable: false
      
    },
    {
      title: 'Voimassa alkaen (dd-MM-yyyy)',
      field: 'validFrom'
     
    },
    {
        title: 'Voimassaolo päättyy (dd-MM-yyyy)',
        field: 'validTo',
        
        
    },
    { sortable: false,
        filterable: false,
       
 
    }
  ]

    return (
        <div>
         <ColorButton variant="contained" color="primary" className= {classes.margin} onClick={handleClickOpen}>
            Päivitä kausi
        </ColorButton>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Päivitä kausi</DialogTitle>
            <DialogContent> 
            <MaterialTable
   
   icons={tableIcons}
   title={null}
   columns={columns}
   data={seasons}
   
      
   editable={{
   
      onRowUpdate: (newData, oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {

          var newDate = newData.validFrom;
          var firstPart = newDate.slice(0,2);
          var firstchar = newDate.slice(2,3);
          var secondPart = newDate.slice(3,5);
          var secondchar = newDate.slice(5,6);
          var thirdPart = newDate.slice(6,10);
          
          
          if(firstPart != parseInt(firstPart) || firstchar != '-' || secondPart != parseInt(secondPart) || secondchar != '-' || thirdPart != parseInt(thirdPart)){
            setNameError({
              error: true,
              label: 'required',
              helperText: 'Syötä muodossa "dd-MM-yyyy"',
              
          });
          reject();
          return;
        
          }
            
              
          resolve();
          if (oldData) {
              updateSeason(newData, oldData.id);
          } 


        }, 600);
      })
               
  }}      
  
 />

          
                </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>

            </DialogActions>
        </Dialog>
        <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                open={open1}
                autoHideDuration={4000}
                onClose={handleClose1}
                message="Ajosarja on lisätty"
                action={
                    <React.Fragment>
                    <Button color="secondary" size="small" onClick={handleClose1}>
                        Close
                    </Button>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose1}>              
                    </IconButton>
                    </React.Fragment>
        }
        />
    </div>
    );
}