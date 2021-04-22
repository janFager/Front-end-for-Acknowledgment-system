import React, { Component } from 'react';
import {SERVER_URL} from '../constants.js';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Sarjalist from './Sarjalist';
import SarjalistUser from './SarjalistUser';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Changesarjas from './Changesarjas';
import Logout from './Logout.js';



class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {username: '', password: '', role: '',
          isAuthenticated: false};
      }
    
      handleChange = (event) => {
        this.setState({[event.target.name] : event.target.value});
      }

      fetchrole = (username) => {
        const tokenB = sessionStorage.getItem("jwt");
        const token = tokenB.slice(6);
          fetch(SERVER_URL+'getRole', {
            method: 'POST',
            headers: {'Authorization': token},
            body: JSON.stringify(username)
          })
          .then(response => response.json()
          .then(data => {
            var events = data;
           for(var i= 0; i< events.length;i++)
            if(events[i].username==this.state.username){
              this.setState({role : events[i].role});
            }
            
          },
          (error) => ({
            
          })))
          
          };
    
      login = () => {
        const user = {username: this.state.username, password: this.state.password};
        fetch(SERVER_URL + 'login', {
          method: 'POST',
          body: JSON.stringify(user)
        })
        .then(res => {
          const jwtToken = res.headers.get('Authorization');
          if (jwtToken !== null) {
            sessionStorage.setItem("jwt", jwtToken);
            this.setState({isAuthenticated: true});
            this.fetchrole(user.username);
          }
        })
        .catch(err => console.error(err)) 
      }



      logout = () => {
        sessionStorage.removeItem("jwt");
        this.setState({isAuthenticated: false});
      }

    render() {
        if (this.state.isAuthenticated === true && this.state.role === 'admin') {
          return (
          <div>
            <div style={{float: 'right', marginRight:'50px'}}>
            <Logout logout={this.logout} />
        </div>
            
              <BrowserRouter >
         <div>
                <Switch>
                    <Route exact path="/" component={Sarjalist} />
                    <Route path="/changesarjas" component={Changesarjas} />
                    
                </Switch>
          </div>
            </BrowserRouter>
              </div>)
        } else if (this.state.isAuthenticated === true && this.state.role === 'user') {
          return (
            <div>
              <div style={{float: 'right', marginRight:'50px'}}>
              <Logout logout={this.logout} />
          </div>
          <SarjalistUser />
              
                </div>)
        } else {
          return (
            <div>
              <br/> 
              <TextField label="Käyttäjätunnus" type="text" name="username" 
               placeholder="Username" variant="outlined"
              onChange={this.handleChange} /><br/> <br/> 
              <TextField label="Salasana" type="password" name="password" 
               placeholder="Password" variant="outlined"
              onChange={this.handleChange} /><br/><br/> 
              <Button variant="contained" color="primary" 
               onClick={this.login}>
                Kirjaudu
              </Button>
            </div>
          );
        }
      }
}

export default Login;