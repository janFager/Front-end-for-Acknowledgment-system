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
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory } from "react-router-dom";
import Addsarja from './Addsarja';
import Addseason from './Addseason';
import CreateIcon from '@material-ui/icons/Create';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import { SERVER_URL } from '../constants';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    background: '#009688',
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
  drawerPaper: {
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
    padding: theme.spacing(0),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    background: '#ff8a65'
    
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function Changesarjas(props){ 

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
  const theme = useTheme();
  const [openDrawer, setOpendrawer] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpendrawer(true);
  };

  const handleDrawerClose = () => {
    setOpendrawer(false);
  };



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
        title: 'Kausi',
        field: 'validSeason',
        editable: false
    },
    {
        title: 'Viikon päivä',
        field: 'validWeekDay',
        editable: false
       
          
      
    },
    { sortable: false,
        filterable: false,

 
    }
  ]

  // eslint-disable-next-line
  const [sarjas, setSarjas] = useState([]);
  const sarja = [];
  useEffect(() => fetchData(), []);


  const fetchData = () => {
    const tokenB = sessionStorage.getItem("jwt");
    const token = tokenB.slice(6);
      fetch(SERVER_URL+'sarjas', {
        headers: {'Authorization': token}
      })
      .then(response => response.json()
      .then(data => {


      var events = data;
        
        for(var k = 0; k<events._embedded.sarjas.length; k++){

          var seasonFi;
          var dayFi;
          var stat = events._embedded.sarjas[k].validSeason.seasonName;
          var statDay = events._embedded.sarjas[k].validWeekDay.validWeekDayName;
          if(stat==="winter"){
            seasonFi="Talvikausi";
          } else {
            seasonFi="Kesäkausi";
          }

          if(statDay==="Monday-Thursday"){
            dayFi="Maanatai-Torstai";
          } else if (statDay==="Friday"){
            dayFi="Perjantai";
          } else if (statDay==="Saturday"){
            dayFi="Lauantai";
          } else if (statDay==="Sunday"){
            dayFi="Sunnuntai";
          } else {
            dayFi="";
          }

            sarja.push({
              id: events._embedded.sarjas[k].id,
              sarjaNumber: events._embedded.sarjas[k].sarjaNumber,
              buscom: events._embedded.sarjas[k].buscom, 
              busNumber: events._embedded.sarjas[k].busNumber,  
              departureStop: events._embedded.sarjas[k].departureStop, 
              departureTime: events._embedded.sarjas[k].departureTime,
              validSeason_id: events._embedded.sarjas[k].validSeason.id,
              validSeason: seasonFi,
              validWeekDay_id: events._embedded.sarjas[k].validWeekDay.id,
              validWeekDay: dayFi
              
               })
              
        } 
 
        setSarjas(sarja);
        
    },
    (error) => ({
      
    })))
    
    };
  
  


  const [open, setOpen] = useState(false);
  const handleClick = () => {
      setOpen(true);
  };

  const [openEdit, setOpenedit] = useState(false);
  const handleClickEdit = () => {
      setOpenedit(true);
  };

  const [openAdd, setOpenadd] = useState(false);
  const handleClickAdd = () => {
      setOpenadd(true);
  };



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

  const saveSarja = (sarja) => {
    const tokenB = sessionStorage.getItem("jwt");
    const token = tokenB.slice(6);
      fetch(SERVER_URL+'sarjas', {
          method: 'POST',
          headers: {'Authorization': token, 'Content-Type': 'application/json'},
          body: JSON.stringify(sarja)

      })
      .then(res => fetchData())
      .catch(err => console.error(err))

      handleClickAdd();
  };

  const updateSarja = (sarja, link) => {
    const tokenB = sessionStorage.getItem("jwt");
    const token = tokenB.slice(6);
    var linkki = SERVER_URL+"sarjas/"+link;
      fetch(linkki, {
          method: 'PUT',
          headers: {'Authorization': token, 'Content-Type': 'application/json'},
          body: JSON.stringify(sarja)
      }) 
      .then(res => fetchData())
      .catch(err => console.error(err))
      handleClickEdit();
      
  };
  const deleteSarja = (link) => {
    const tokenB = sessionStorage.getItem("jwt");
    const token = tokenB.slice(6);
    var linkki = SERVER_URL+"sarjas/"+link;
    fetch(linkki, {method: 'DELETE', headers: {'Authorization': token, 'Content-Type': 'application/json'}})
    .then(res => fetchData())
    .catch(err => console.error(err))
    handleClick();   
      
  };
 
  const history = useHistory();
  
  const location = {
    pathname: '/changesarjas',
    state: { fromDashboard: true }
  }; 
  const location2 = {
    pathname: '/',
    state: { fromDashboard: true }
  }


  function showSarjas () {
    history.push(location2);
  }


  function showChangesarjas () {
   
    history.push(location);
  }




    return (
    <div>
    
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar)}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Ajosarjat
          </Typography>
        </Toolbar> 
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={openDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
        
            <ListItem button                 
                onClick={showSarjas}   
                 >
              <ListItemIcon>
                <DesktopWindowsIcon  />            
          </ListItemIcon>
              <ListItemText primary={"Työpöytä"} />              
            </ListItem>
            <ListItem button                 
                onClick={showChangesarjas}   
                 >
              <ListItemIcon>
                <CreateIcon  />            
          </ListItemIcon>
              <ListItemText primary={"Muokkaa sarjoja"} />              
            </ListItem>
       
        </List>
      <Divider />
      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div style={{float: 'right', marginRight:'400px'}}>
        <Addseason  saveSarja={saveSarja}/>
        </div>
        <div >
        <Addsarja  saveSarja={saveSarja}/>
        </div>
      </main>
            
    <MaterialTable
      icons={tableIcons}
      title={null}
      columns={columns}
      data={sarjas}
      
      
      editable={{
        onRowDelete: oldData =>
        
          new Promise(resolve => {
            setTimeout(() => {
              resolve();             
                deleteSarja(oldData.id);
                
            }, 600);
          }),
          onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              
              resolve();
              if (oldData) {
                
                  updateSarja(newData, oldData.id);
              }
            }, 600);
          })
                   
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
