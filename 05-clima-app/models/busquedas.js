const axios = require('axios');


class Busquedas {

    historial = ['Tegucigalpa', 'Madrid', 'San José'];

    constructor() {
        // TODO: Leer db si existe
    }

    async ciudad( lugar = '' ) {

        // petición http
        const resp = await axios.get('https://reqres.in/api/users?page=2');
        console.log(resp.data);

        return []; // Retornar los lugares
    }

}

module.exports = Busquedas;