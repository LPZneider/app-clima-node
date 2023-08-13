require("dotenv").config();

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

        console.log("\nInformación de la ciudad\n");
        console.log("Ciudad: " + name);
        console.log("Lat: " + lat);
        console.log("Lng: " + lng);
        console.log("Temperatura:");
        console.log("Mínima:");
        console.log("Maxima:");
        break;
    }
    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
