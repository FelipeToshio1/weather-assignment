# Weather App
## Overview

This application was developed as an assignment for personal study and training using Node.js and React. The app aims to retrieve data from OpenWeatherMap for weather information and GeoDB Cities for autocomplete search to display on the screen.

## Api
The API consists of three endpoints:

### /weather/{cityName}
This endpoint retrieves the weather data for the specified city.

### /autocomplete
This endpoint returns a list of a maximum of 10 city suggestions.

### /weather/{latitude}/{longitude}
This endpoint retrieves the weather data for the specific location based on latitude and longitude.

## App
The app is simple and easy to understand. Upon opening it, if you grant permission to access your location, it will display the weather conditions for your current city. There is also a search bar where you can search for any city of your choice to learn more about the weather.

## Running Locally
To run the application locally, you first need to install an IDE. Visual Studio Code is recommended, but you can use any IDE of your choice.

Next, clone this repository to your computer and run the following command in both the root solution folders (the node-api folder and the weather-app folder):

```bash
npm install 
```

After installing all dependencies, run the following command in the root folder of the Node application (node-api folder):

``` bash
node api/index.js
```

Then, run the following command in the weather-app folder:

``` bash
npm start
```

Make sure to adjust the configurations to avoid using the same port for both projects and assign the environment of your choice.
It is suggested to create the ".env.local" file in the root file of each project and add the localhost url information and you personal api key for third party APIs.


