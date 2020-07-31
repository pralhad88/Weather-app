import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core/';
import Moment from 'react-moment';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginTop: theme.spacing(4),
  },
}));


export default function WeatherDetails({ weatherDetails, cityName }) {

  const classes = useStyles();
  return (
    <div>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {weatherDetails.map((item) => <Grid item xs={12} sm={6} md={3} key={item.dt}>
          <Card className={classes.root} style={{backgroundColor: Math.round(item.main.temp - 273.15) > 16 ? "#f54029": "#A0E6FF" }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {cityName}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2" >
                  <Moment format="D MMM YYYY hh:mm a" withTitle>{item.dt_txt}</Moment>
                </Typography>
              </CardContent>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                   {item.weather[0].description} 
                </Typography>
                <hr></hr>
              </CardContent>
              <Grid
                container
                direction="row"
                justify='space-around'
                alignItems="center"
              >
                <Grid style={{height: 100 ,alignItems: 'center'}} >
                  <Typography style={{fontSize: 60}}>
                    {Math.round(item.main.temp - 273.15)}<span className="temp">&#176;</span> C
                  </Typography>
                </Grid>
                <Grid
                    direction="column"
                    justify="space-between"
                    alignItems="center"
                    style={{height: 80}}
                >
                  <Grid>
                  <Typography style={{fontSize: 20}} ><i className="wi wi-raindrop"></i> {item.main.humidity} %</Typography>
                  </Grid>
                  <Grid>
                  <Typography style={{fontSize: 20}}><i className="wi wi-small-craft-advisory"></i> {item.wind.speed} km/h</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </CardActionArea>
          </Card>
        </Grid>)}
      </Grid>
    </div>
  );
}