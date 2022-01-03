require('dotenv').config();
const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {

    const busquedas = new Busquedas();
    let opt = '';
    const data = await busquedas.leerDB();

    while (opt !== '0') {

        opt = await inquirerMenu();

        console.log({opt})
        switch (opt) {
            case '1': // Buscar lugar

                // Mostrar mensaje
                const termino = await leerInput('Lugar: ');

                // Buscar los lugares
                const lugares = await busquedas.ciudad( termino );
                
                // Seleccionar el lugar
                const id = await listarLugares(lugares);
                const lugarSel = lugares.find( l => l.id === id);
                if ( id === '0' ) continue;
                // console.log(lugarSel)

                // Guardar en db
                busquedas.agregarHistorial( lugarSel.nombre );
                
                // Clima
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);  
                // console.log(clima) 

                // Mostrar resultados
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:', lugarSel.nombre);
                console.log('Lat:', lugarSel.lat);
                console.log('Lon:', lugarSel.lng);
                console.log('Temperatura:', clima.temp, '°C');
                console.log('Minima:', clima.min, '°C');
                console.log('Maxima:', clima.max, '°C');
                console.log('¿Cómo está el clima?', clima.desc);
                break;
            case '2': // Historial
                busquedas.historialCapitalizado.forEach( (lugar, i) => {
                    const idx = `${i+1}.`.green;
                    console.log(`${idx} ${lugar}`);
                })
                break;
            default:
                break;
        }

        // Pausar consola
        if (opt !== '0') {
           await pausa();
        }

    }

}

// console.log(process.env.MAPBOX_KEY)
main();