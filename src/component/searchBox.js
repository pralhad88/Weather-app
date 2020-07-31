import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import { cities } from '../config/constant';
import WeatherDetails from './weatherDetails';
import axios from 'axios';
import { Button, Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';



const useStyles = ((theme) => ({
    root: {
        marginTop: theme.spacing(8)
    },
    input: {
        [`& fieldset`]: {
            borderRadius: 18,
        }
    },
    button: {
        height: 50,
        marginTop: 16,
        marginLeft: 10,
        borderRadius: 18
    }
}));

class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = { // define four initial states.
            weatherDetails: [],  // weatherDetails used for storing responded wether details from API
            cities: [], // cities are used for autosuggest some city name
            cityName: 'bangalore', // the default city is bangalore to display the default weather.
            inputText: '' // inputText is used for storing new city name except suggested cities.
        }
    }

    componentDidMount() { // initial API call to display bangalore weather.
        this.setState({
            cities: cities
        });
        this.fetchWeatherDetails() // Separately API call.
    }

    fetchWeatherDetails = async () => { 
        axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${this.state.cityName}&appid=d3a3b7d46bc7ba3f57826b9708d4ea46`)
            .then((res) => {
                this.setState({
                    weatherDetails: res.data.list,
                    cityName: res.data.city['name']
                })
            }).catch(() => {
                alert("Something went wrong in Weather API server")
            })
    }

    handleChange = async (event) => {
        const { value, name } = event.target;
        await this.setState({
            [name]: value // updating new city name except suggested cities
        });
    }

    suggestedCityWeatherDetails = async (event) => {
        const cityName = event.target.textContent; // geeting the city name from list element 
        await this.setState({ // updating cityName and inputText
            cityName: cityName, 
            inputText: cityName
        });
        this.fetchWeatherDetails()
    }

    onClick = async () => { // one button is used for fetching others cities weather details.
        await this.setState({
            cityName: this.state.inputText
        })
        this.fetchWeatherDetails() // called API
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />
                <Container className={classes.root} maxWidth="lg" >
                    <div className="serchBox">
                        <Grid xs={8} item>
                            <Autocomplete
                                freeSolo
                                id="free-solo-2-demo"
                                disableClearable
                                options={this.state.cities.map((city) => city)}
                                onChange={this.suggestedCityWeatherDetails}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Search..."
                                        margin="normal"
                                        variant="outlined"
                                        value={this.state.inputText}
                                        name='inputText'
                                        fullWidth
                                        className={classes.input}
                                        onChange={this.handleChange}
                                        InputProps={{ ...params.InputProps, type: 'search' }}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid xs={1} item>
                            <Button className={classes.button} onClick={this.onClick} variant='contained' color='primary'>Search</Button>
                        </Grid>
                    </div>
                    <WeatherDetails
                        weatherDetails={this.state.weatherDetails}
                        cityName={this.state.cityName}
                    />
                </Container>
            </React.Fragment>
        )
    }
}

export default withStyles(useStyles)(SearchBox);