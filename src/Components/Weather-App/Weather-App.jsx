import React, { Component } from "react";
import { FaSearch } from "react-icons/fa";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import "./Sty.e.css";

const getCountryName = (code) => {
  return new Intl.DisplayNames(["en"], { type: "region" }).of(code);
};

const getTimeDate = (dt) => {
  const currentDate = new Date(dt * 1000); // converting to milliseconds

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(currentDate);
};

class WeatherApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "Hyderabad",
      searchQuery: "",
      weatherData: null,
      theme: { mode: "light" },
    };
  }

  componentDidMount() {
    this.getWeatherData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.city !== this.state.city) {
      this.getWeatherData();
    }
  }

  getWeatherData = async () => {
    const { city } = this.state;
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f78f3f55383f1e30a1b1be1d1ce968e4&units=metric`;
    try {
      const response = await fetch(URL);
      const data = await response.json();
      this.setState({ weatherData: data });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  handleSearchSubmit = (e) => {
    e.preventDefault();
    const { searchQuery } = this.state;
    if (searchQuery !== "") {
      this.setState({ city: searchQuery, searchQuery: "" }); // Reset search input
    }
  };

  toggleTheme = () => {
    this.setState((prevState) => ({
      theme: { mode: prevState.theme.mode === "light" ? "dark" : "light" },
    }));
  };

  render() {
    const { weatherData, searchQuery, theme } = this.state;
    return (
      <div className={theme.mode}>
        <div style={{ padding: "20px" }} className="logo-toggle">
          <img
            src="https://res.cloudinary.com/dqhk94co9/image/upload/v1718450230/stock-vector-weather-forecast-title-clouds-snowflake-and-umbrella-on-background-vector-illustration-317965724-removebg-preview_ongfte.png"
            alt="logo"
            className="logo"
          />
          <button onClick={this.toggleTheme}>
            {theme.mode === "light" ? (
              <MdDarkMode className="dark-icon" size={70} />
            ) : (
              <CiLight className="light-icon" size={70} color="white" />
            )}
          </button>
        </div>
        <div className="weather-header">
          <form className="weather-search" onSubmit={this.handleSearchSubmit}>
            <FaSearch className="i" />
            <input
              type="text"
              placeholder="Search your city..."
              value={searchQuery}
              onChange={(e) => this.setState({ searchQuery: e.target.value })}
            />
          </form>
        </div>
        {weatherData && (
          <div className="weather-body">
            <h1>{`${weatherData.name}, ${getCountryName(
              weatherData.sys.country
            )}`}</h1>
            <p>{getTimeDate(weatherData.dt)}</p>
            <div className="weather-main">
              <p>{weatherData.weather[0].main}</p>
              <div className="weather-icon">
                <img
                  src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                  alt="Weather icon"
                />
              </div>
            </div>
            <p>{`${weatherData.main.temp}°C`}</p>
            <div className="weather-range">
              <p>{`Min: ${weatherData.main.temp_min}°C`}</p>
              <p>{`Max: ${weatherData.main.temp_max}°C`}</p>
            </div>
            <div className="weather-details">
              <div className="weather-card">
                <i className="fa-solid fa-droplet"></i>
                <div>
                  <p>Feels Like</p>
                  <p>{`${weatherData.main.feels_like}°C`}</p>
                </div>
              </div>
              <div className="weather-card">
                <i className="fa-solid fa-droplet"></i>
                <div>
                  <p>Humidity</p>
                  <p>{`${weatherData.main.humidity}%`}</p>
                </div>
              </div>
              <div className="weather-card">
                <i className="fa-solid fa-wind"></i>
                <div>
                  <p>Wind</p>
                  <p>{`${weatherData.wind.speed} m/s`}</p>
                </div>
              </div>
              <div className="weather-card">
                <i className="fa-solid fa-gauge-high"></i>
                <div>
                  <p>Pressure</p>
                  <p>{`${weatherData.main.pressure} hPa`}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default WeatherApp;
