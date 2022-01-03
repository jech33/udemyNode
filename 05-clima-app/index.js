const { leerInput, inquirerMenu, pausa } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {

    const busquedas = new Busquedas();
    let opt = '';

    while (opt !== '0') {

        opt = await inquirerMenu();

        console.log({opt})
        switch (opt) {
            case '1': // Buscar lugar

                // Mostrar mensaje
                const lugar = await leerInput('Lugar: ');
                busquedas.ciudad( lugar )

                // Buscar los lugares

                // Seleccionar el lugar

                // Clima

                // Mostrar resultados
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:', );
                console.log('Lat:', );
                console.log('Lon:', );
                console.log('Temperatura:', );
                console.log('Minima:', );
                console.log('Maxima:', );
                break;
            case '2': // Historial

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

main();