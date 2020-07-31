import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export default function Header() { // Created functional based component for app header.
  return ( 
    <div className="appbarwrapper">
    <AppBar position="fixed">
      <Toolbar>
        <Grid
          justify="space-between" 
          container
        >
          <Grid item>
            <a href="#">
            <Button color="inherit">
              Logo
          </Button>
          </a>
          </Grid>
          <Grid item>
            <div
            > 
              <a href="#"><Button color="inherit">Home</Button></a> 
              <a href="#"> <Button color="inherit">About Us</Button></a>
              <a href="#"><Button color="inherit">Contact Us</Button></a>
            </div>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
    </div>
  );
}
