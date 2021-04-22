import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import {purple} from '@material-ui/core/colors';
import { withStyles, makeStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(2),
      float:'50'
      
    },
  }));


export default function Addsarja(props) {
  const [open, setOpen] = React.useState(false);
    
  const [season, setSeason] = React.useState({
    id: ""
  });
  const [weekDay, setWeekDay] = React.useState({
    id: ""
  });
  const [sarja, setSarja] = React.useState({
    sarjaNumber: '', buscom: '', busNumber: '',  departureStop: '', departureTime: '', validSeason: '', validWeekDay: ''
      });
  
    const classes = useStyles();
  const [open1, setOpen1] = React.useState(false);

  const clearState = () => {
    setSarja('')
    setSeason('')
    setWeekDay('')
  }

  

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

  const handleInputCnange = (event) => {
    setSarja({...sarja, [event.target.name]: event.target.value})
  };

  const handleClick1 = () => {
    setOpen1(true);
};

const handleSeason = (event) => {
  setSeason({...season, id: event.target.value});
  setSarja({...sarja, validSeason: {[event.target.name] : event.target.value}});
};

const handleWeekday = (event) => {
  setWeekDay({...weekDay, id: event.target.value});
  setSarja({...sarja, validWeekDay: {[event.target.name]: event.target.value}});
};


const addSarja = () => {
    props.saveSarja(sarja);
     clearState();
     handleClose();
     handleClick1();
 };
  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: '#009688',
      '&:hover': {
        backgroundColor: '#00796b',
      },
      formControl: {
        margin: 0,
        fullWidth: true,
        backgroundColor: '#9ee',
        display: 'flex',
        wrap: 'nowrap'
      }
    }
  }))(Button);

    return (
        <div>
         <ColorButton variant="contained" color="primary" className= {classes.margin} onClick={handleClickOpen}>
            Uusi ajosarja
        </ColorButton>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Uusi ajosarja</DialogTitle>
            <DialogContent> 
                     <TextField
                        autoFocus
                        margin="dense"
                        name="sarjaNumber"
                        type="number"
                        value={sarja.sarjaNumber}
                        onChange={e => handleInputCnange(e)}
                        label="Sarjanumero"                        
                        fullWidth
                    />       
                    <TextField
                        
                        margin="dense"
                        name="buscom"
                        type="number"
                        value={sarja.buscom}
                        onChange={e => handleInputCnange(e)}
                        label="Buscom"                        
                        fullWidth
                        
                    />
                     
                     <TextField
                        
                        margin="dense"
                        name="busNumber"
                        value={sarja.busNumber}
                        onChange={e => handleInputCnange(e)}
                        label="Linjanumero"                        
                        fullWidth
                    />       
                     <TextField
                        
                        margin="dense"
                        name="departureStop"
                        value={sarja.departureStop}
                        onChange={e => handleInputCnange(e)}
                        label="Lähtöpysäkki"                        
                        fullWidth
                    />       

                    <TextField
                        
                        margin="dense"
                        name="departureTime"
                        value={sarja.departureTime}
                        onChange={e => handleInputCnange(e)}
                        label="Läähtöaika hh:mm"                        
                        fullWidth
                    />       
            
                     <form className={classes.form} noValidate>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="season">Kausi</InputLabel>
              <Select 
                autoFocus
                value={season.id}
                onChange={e => handleSeason(e)}
                inputProps={{
                  name:"id"
                  
                }}
              >
                <MenuItem value="1">Talvikausi</MenuItem>
                <MenuItem value="2">Kesäkausi</MenuItem>
              </Select>
            </FormControl>

          </form>
          <form className={classes.form} noValidate>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="weekDay">Viikonpäivä</InputLabel>
              <Select
                autoFocus
                value={weekDay.id}
                onChange={e=>handleWeekday(e)}
                inputProps={{
                  name:"id"
                  
                }}
              >
                <MenuItem value="1">Maanantai-Torstai</MenuItem>
                <MenuItem value="2">Perjantai</MenuItem>
                <MenuItem value="3">Lauantai</MenuItem>
                <MenuItem value="4">Sunnuntai</MenuItem>
              </Select>
            </FormControl>

          </form>
          
                </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={addSarja} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
        <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                open={open1}
                autoHideDuration={6000}
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