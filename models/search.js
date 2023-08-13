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
const axios = require("axios");

function Searchs() {
  this.history = ["bogota", "quetame", "madrid"];
}

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

module.exports = Searchs;
