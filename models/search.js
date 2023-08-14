/* 
links para peticiones http:
https://www.npmjs.com/package/request

https://www.npmjs.com/package/fetch

https://www.npmjs.com/package/axios



Para pruebas rápidas del endpoint

https://reqres.in/


https://www.mapbox.com/

https://docs.mapbox.com/api/search/geocoding/
*/
const fs = require("fs");
const axios = require("axios");

function Searchs() {
  this.dbPath = "./db/dataBase.json";
  this.history = [];
  this.readDB();
}

Searchs.prototype.paramsOpenWeather = function (lat, lon) {
  return {
    lat,
    lon,
    appid: process.env.OPENWEATHER,
    units: "metric",
    lang: "es",
  };
};

Searchs.prototype.city = async function (site = "") {
  try {
    const intance = axios.create({
      baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${site}.json`,
      params: {
        access_token: process.env.MAPBOX_KEY,
        limit: 5,
        lenguage: "es",
      },
    });

    const resp = await intance.get();

    return resp.data.features.map((site) => ({
      id: site.id,
      name: site.place_name,
      lng: site.center[0],
      lat: site.center[1],
    }));
  } catch (err) {
    return [];
  }

  console.log(resp.data);
};

Searchs.prototype.localWeather = async function (lat, lon) {
  try {
    const intance = axios.create({
      baseURL: `https://api.openweathermap.org/data/2.5/weather`,
      params: this.paramsOpenWeather(lat, lon),
    });

    const resp = await intance.get();

    return {
      desc: resp.data.weather[0].description,
      min: resp.data.main.temp_min,
      max: resp.data.main.temp_max,
      temp: resp.data.main.temp,
    };
  } catch (err) {
    console.log(err);
  }
};

Searchs.prototype.saveDB = function () {
  const payload = {
    history: this.history,
  };
  fs.writeFileSync(this.dbPath, JSON.stringify(payload));
};
Searchs.prototype.saveHistory = function (site) {
  if (!this.history.includes(site)) {
    this.history = this.history.slice(0, 5);
    this.history.unshift(site);
    this.saveDB();
  }
};

Searchs.prototype.readDB = function (site) {
  if (fs.existsSync(this.dbPath)) {
    const data = fs.readFileSync(this.dbPath, { encoding: "utf-8" });
    const { history } = JSON.parse(data);
    this.history = [...history];
  }
};

module.exports = Searchs;
