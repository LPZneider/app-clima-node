require("dotenv").config();
const colors = require("colors");

const {
  readInput,
  pausa,
  inquirerMenu,
  listplaces,
} = require("./helpers/inquirer");
const Searchs = require("./models/search");
const main = async () => {
  const searchs = new Searchs();
  let opt;

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case 1:
        const dominian = await readInput("Ciudad: ");
        const sites = await searchs.city(dominian);
        const id = await listplaces(sites);
        const { name, lat, lng } = sites.find((l) => l.id === id);
        searchs.saveHistory(name);
        const { desc, min, max, temp } = await searchs.localWeather(lat, lng);

        console.log("\nInformación de la ciudad\n".cyan);
        console.log("Ciudad: " + name.green);
        console.log(`Lat: ${colors.green(lat)}`);
        console.log(`Lng: ${colors.green(lng)}`);
        console.log(`Temperatura: ${colors.green(temp)}`);
        console.log(`Mínima: ${colors.green(min)}`);
        console.log(`Maxima: ${colors.green(max)}`);
        console.log("El clima esta: " + desc.green);
        break;

      case 2:
        searchs.history.map((l, i) => {
          const idx = `${i + 1}.`.green;
          console.log(`${idx} ${l}`);
        });
        break;
    }
    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
