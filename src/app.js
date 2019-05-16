const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3001;

//paths for express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//handlebar settings and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//set up static directory to serve
app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather from app",
    name: "Abiodun Sulaiman"
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Weather from app",
    name: "Abiodun Sulaiman"
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help from app",
    name: "Abiodun Sulaiman",
    helpMessage: "Thank you"
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    console.log("addressee", address);
    res.send({
      error: "You need to send address"
    });
    return;
  }
  console.log("address", address);
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error
      });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        });
      }
      res.send({
        forecast: forecastData,
        location,
        address
      });
    });
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "404. Page not found."
  });
});

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

//app.com
