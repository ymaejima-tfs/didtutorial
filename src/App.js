import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import {WalletContext, WalletContextProvider} from './contexts/Wallet'
import './App.css';

import HomePane from './pages/home/Home';
import KeyPane from './pages/key/Key';
import SignPane from './pages/sign/Sign';
import VerifyPane from './pages/verify/Verify';

const drawerWidth = 240;

function App() {
  const [open, setOpen] = React.useState(false);

  const wallet = React.useContext(WalletContext);

  return (
    <div className="App">
      <WalletContextProvider>
        <BrowserRouter basename="/">

          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={(e) => { setOpen(true) }}>
                <MenuIcon />
              </IconButton>
              {wallet.currentKeyName.length > 0 && 
                <Typography>
                  Key: {wallet.currentKeyName}
                </Typography>
              }
            </Toolbar>
          </AppBar>

          <Drawer variant="temporary" anchor="left" onClose={(e) => { setOpen(false) }} open={open} >
            <div style={{width: drawerWidth}} onClick={(e) => { setOpen(false) }} onKeyDown={(e) => { setOpen(false) }} >
            <List>
              <Link to='/'>
                <ListItem button key="home"> <ListItemText primary={"Home"} /> </ListItem>
              </Link>
              <Link to='/key'>
                <ListItem button key="key"> <ListItemText primary={"Key"} /> </ListItem>
              </Link>
              <Link to='/sign'>
                <ListItem button key="sign"><ListItemText primary={"Sign"} /></ListItem>
              </Link>
              <Link to='/verify'>
                <ListItem button key="verify"><ListItemText primary={"Verify"} /></ListItem>
              </Link>
            </List>
            </div>
          </Drawer>

          <Container maxWidth="md">
            <Switch>
              <Route exact path="/" component={HomePane} />
              <Route exact path="/key" component={KeyPane} />
              <Route exact path="/sign" component={SignPane} />
              <Route exact path="/verify" component={VerifyPane} />
            </Switch>
          </Container>

        </BrowserRouter>
      </WalletContextProvider>
    </div>
  );
}

export default App;
