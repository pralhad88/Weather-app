import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { cities } from '../config/constant';
import WeatherDetails from './weatherDetails';
import axios from 'axios';
import { Button, Grid } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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
        this.state = {
            weatherDetails: [],
            cities: [],
            cityName: 'bangalore',
            inputText: ''
        }
    }

    componentDidMount() {
        this.setState({
            cities: cities
        });
        this.fetchWeatherDetails()
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
        console.log(value, name)
        await this.setState({
            [name]: value
        });
    }

    demo = async (event) => {
        const cityName = event.target.textContent;
        await this.setState({
            cityName: cityName,
            inputText: cityName
        });
        this.fetchWeatherDetails()
    }
    onClick = async () => {
        await this.setState({
            cityName: this.state.inputText
        })
        this.fetchWeatherDetails()
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
                                onChange={this.demo}
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