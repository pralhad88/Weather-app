import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export default function Header() {
  return (
    <div className="appbarwrapper">
    <AppBar position="fixed">
      <Toolbar>
        <Grid
          justify="space-between" 
          container
        >
          <Grid item>
            <Button color="inherit">
              Logo
          </Button>
          </Grid>
          <Grid item>
            <div>
              <Button color="inherit">Home</Button>
              <Button color="inherit">About Us</Button>
              <Button color="inherit">Contact Us</Button>
            </div>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
    </div>
  );
}
