const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3001;

//Define paths for Express config
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const publicDirectoryPath = path.join(__dirname, "../public");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Christian Dimitrov"
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About the App",
    name: "Christian Dimitrov"
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    helpMessage: "Help meee!!!",
    name: "Christian Dimitrov"
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide a correct address to get a forecast"
    });
  }

  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      } else {
        forecast(
          latitude,
          longitude,
          (
            error,
            { summary, temperature, precipProbability, tempHigh } = {}
          ) => {
            if (error) {
              return res.send({ error });
            } else {
              res.send({
                location,
                summary,
                temperature: `Температурата е ${temperature}`,
                precipProbability: `Шансът за дъждове е ${precipProbability}%`,
                tempHigh
              });
            }
          }
        );
      }
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Help article not found"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Christian Dimitrov",
    errorMessage: "Page not found"
  });
});

app.listen(port, () => {
  console.log("Server is now running");
});
