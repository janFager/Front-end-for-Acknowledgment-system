import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import MaterialTable from 'material-table';
import CloseIcon from "@material-ui/icons/Close";
import { forwardRef } from 'react';
import Typography from '@material-ui/core/Typography';
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
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Changestatus from './Changestatus';
import {makeStyles } from '@material-ui/core/styles';
import Resetstatus from './Resetstatus';
import { SERVER_URL } from '../constants';



const drawerWidth = 240;

const useStyles = makeStyles(theme => ({

  root: {
    display: 'flex',
  },
  appBar: {
    background: '#00796b',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    background: '#ff8a65' 
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: { //menun tausta
    width: drawerWidth,
    background: '#fbe9e7'
  },
  drawerHeader: { 
    display: 'flex',
    alignItems: 'left',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    background: '#ff8a65'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    background: '#b2dfdb' //ylänappien tausta
    
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));



export default function Sarjalist(props){ 

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
  const classes = useStyles();



  const columns = [
    
    
    {
        title: 'Sarjanumero',
        field: 'sarjaNumber'
    },
    {
      title: 'Buscom',
      field: 'buscom'
    },
    {
        title: 'Linjan numero',
        field: 'busNumber'
    },
    {
        title: 'Lähtöpysäkki',
        field: 'departureStop'
    },
    {
        title: 'Lähtöaika',
        field: 'departureTime'
    },
    {
        title: 'Kuittaus',
        field: 'msgSentTime'
    },
    {
        title: 'Tilanne',
        field: 'status'

          
          
          
      
    },
    { sortable: false,
        filterable: false,
        render: row => {
          return (<Changestatus linkki={row.id} fetchData={fetchData} />);
        } 
 
    }
  ]

  const [sarjas, setSarjas] = useState([]);
  const sarja = [];
 

  useEffect(() => {
    const intervalId = setInterval(() => {
    fetchData()
    }, 8000)
    return () => clearInterval(intervalId);
  });

  

  const fetchData = () => {
    const tokenB = sessionStorage.getItem("jwt");
    const token = tokenB.slice(6);
    var dateObj = new Date(); 
    var hours = dateObj.getHours();
    var minutes = dateObj.getMinutes();
    var sec = dateObj.getSeconds(); 

    //reset status of sarjas of this day before next day
    if(hours === 23 && minutes === 59 && sec>=50){

      fetch(SERVER_URL+'statusReset', {
        method: 'POST',
        headers: {'Authorization': token}
      })
      .catch(err => console.error(err))
    }

      fetch(SERVER_URL+'seasonSarjas', {
        headers: {'Authorization': token}
      })
      .then(response => response.json()
      .then(data => {

      let events = data;

        for(let k = 0; k<events._embedded.sarjas.length; k++){
          var time;
          var dataTime= events._embedded.sarjas[k].departureTime;
          var dateObj = new Date(); 
          var hours = dateObj.getHours();
          var minutes = dateObj.getMinutes();
         
          if(minutes<10){
            time = hours+':'+ '0'+ minutes;
          } else {
            time = hours+':'+ minutes;
          }
          
          var aika = countMinutes(dataTime, time);
          let stat = events._embedded.sarjas[k].status;
          if(hours == 23 && minutes == 59 && sec>80){
            sarja.push({
              id: events._embedded.sarjas[k].id,
              sarjaNumber: events._embedded.sarjas[k].sarjaNumber,
              buscom: events._embedded.sarjas[k].buscom, 
              busNumber: events._embedded.sarjas[k].busNumber,  
              departureStop: events._embedded.sarjas[k].departureStop, 
              departureTime: events._embedded.sarjas[k].departureTime,
              msgSentTime: '',
              status: 'Ei kuitattu' 
            })
          } else if(stat === true){
            sarja.push({
              id: events._embedded.sarjas[k].id,
              sarjaNumber: events._embedded.sarjas[k].sarjaNumber,
              buscom: events._embedded.sarjas[k].buscom, 
              busNumber: events._embedded.sarjas[k].busNumber,  
              departureStop: events._embedded.sarjas[k].departureStop, 
              departureTime: events._embedded.sarjas[k].departureTime,
              msgSentTime: events._embedded.sarjas[k].msgSentTime,
              status: 'OK', 
            })
          } else if(aika <= 30){
              sarja.push({
                id: events._embedded.sarjas[k].id,
                sarjaNumber: events._embedded.sarjas[k].sarjaNumber,
                buscom: events._embedded.sarjas[k].buscom, 
                busNumber: events._embedded.sarjas[k].busNumber,  
                departureStop: events._embedded.sarjas[k].departureStop, 
                departureTime: events._embedded.sarjas[k].departureTime,
                msgSentTime: '',
                status: 'MYÖHÄSSÄ' 
              })
            } else {
              sarja.push({
                id: events._embedded.sarjas[k].id,
                sarjaNumber: events._embedded.sarjas[k].sarjaNumber,
                buscom: events._embedded.sarjas[k].buscom, 
                busNumber: events._embedded.sarjas[k].busNumber,  
                departureStop: events._embedded.sarjas[k].departureStop, 
                departureTime: events._embedded.sarjas[k].departureTime,
                msgSentTime: '',
                status: 'Ei kuitattu' 
              })
            }
          
          
        }
        //sort by departure time
        const sortsarja = sarja.sort(function(a, b){
         var arvoA = a.departureTime;
         var arvoB = b.departureTime;
         
         if(arvoA < arvoB){
          return -1;
         } else if(arvoA > arvoB){
           return 1;
         } else {
           return 0;
         }
          
        });
        setSarjas(sortsarja);
        
    },
    (error) => ({
      
    })))
  };

  function countMinutes(endTime, startTime){

    var tulosMin
    var tulosHour
    var startMin = parseInt(startTime.substr(3, 5));
    var startHour = parseInt(startTime.substr(0, 2));
    var endMin = parseInt(endTime.substr(3, 5));
    var endHour = parseInt(endTime.substr(0, 2));
    if(endHour === 0 && startHour === 23){
      endHour = 24;

    }
    
    if(endMin>startMin){
      tulosMin = endMin - startMin;
      tulosHour = endHour - startHour;
      if(tulosHour == 0){
        return tulosMin;
      } else {
        tulosMin = tulosMin + (tulosHour*60);
        return tulosMin;
      }

    } else if (endMin<startMin){
      tulosMin = (60 - startMin)+endMin;
      tulosHour = endHour - startHour
      if(tulosHour==1) {				
      
      return tulosMin 
      } else {
        tulosHour = (tulosHour * 60)+tulosMin;
        return tulosHour;
      }
    } 

    
  }		


  const [open, setOpen] = useState(false);


  const [openEdit, setOpenedit] = useState(false);
 

  const [openAdd, setOpenadd] = useState(false);

  const handleClose = (event, reason) => {
      if(reason === 'clickaway') {
          return;
      }

      setOpen(false);
  };
  const handleCloseEdit = (event, reason) => {
    if(reason === 'clickaway') {
        return;
    }

    setOpenedit(false);
  };
  const handleCloseAdd = (event, reason) => {
    if(reason === 'clickaway') {
        return;
    }

    setOpenadd(false);
  };


  
  return (
    <div>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar)}
      >
        <Toolbar>
          
          <Typography variant="h6" noWrap>
            Työpöytä
          </Typography>
        </Toolbar> 
      </AppBar>
    

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
                
        <div >
        <Resetstatus fetchData={fetchData}/>
        </div>

      </main>
     
        
    <MaterialTable
   
      icons={tableIcons}
      title={null}
      columns={columns}
      data={sarjas}
      options={{   
       
        rowStyle: rowData => {
          if(rowData.status === "OK") {
            return {backgroundColor: '#81c784'};
          } else if (rowData.status === "MYÖHÄSSÄ"){
            return {backgroundColor: '#ff8a80'};
          } else {
            return {backgroundColor: '#e8f5e9'};
          }
          
        }
      }}
      
     
    />
    

           
        <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                open={openEdit}
                autoHideDuration={4000}
                onClose={handleCloseEdit}
                message="Ajosarja on päivitetty"
                action={
        <React.Fragment>
        <Button color="secondary" size="small" onClick={handleCloseEdit}>
              Close
        </Button>
        <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseEdit}>
              <CloseIcon />
        </IconButton>
        </React.Fragment>
        }
        />
        <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                message="Ajoisarja on poistettu"
                action={
        <React.Fragment>
        <Button color="secondary" size="small" onClick={handleClose}>
              Close
        </Button>
        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon />
        </IconButton>
        </React.Fragment>
        }
        />
        <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                open={openAdd}
                autoHideDuration={2000}
                onClose={handleCloseAdd}
                message="Ajosarja on lisätty"
                action={
        <React.Fragment>
        <Button color="secondary" size="small" onClick={handleCloseAdd}>
              Close
        </Button>
        <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseAdd}>
        <CloseIcon /> 
        </IconButton>
        </React.Fragment>
        }
        />
   
        </div>
    );

}
    

