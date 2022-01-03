const fs = require('fs');
const axios = require('axios');


class Busquedas {

    historial = [];
    dbPath = './db/database.json'

    constructor() {
        this.leerDB();
    }

    get historialCapitalizado() {

        return this.historial.map (lugar => {
            let palabras = lugar.split(' ');
            palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1));

            return palabras.join(' ')
        })
    }

    get paramsMapbox() {
        return {
            'limit': 5,
            'language': 'es',
            'access_token': process.env.MAPBOX_KEY
        }
    }

    get paramsWeather() {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }

    async ciudad(lugar = '') {

        try {
            // petición http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });

            const resp = await instance.get();
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            })); // Retornar los lugares

        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async climaLugar(lat, lon) {

        try {
            // petición http
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {
                    ...this.paramsWeather,
                    'lat': lat,
                    'lon': lon,                    
                }
            });

            const resp = await instance.get();
            const { weather, main } = resp.data;

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            };

        } catch (error) {
            console.log(error);
            return [];
        }
    }

    agregarHistorial( lugar = '' ) {
        // Grabar en DB
        if (this.historial.includes( lugar.toLocaleLowerCase() )) {
            if (this.historial.indexOf(lugar.toLocaleLowerCase()) > 0) {
                this.historial.splice(this.historial.indexOf(lugar.toLocaleLowerCase()), 1);
                this.historial.unshift(lugar.toLocaleLowerCase());
            }
            return;
        }

        this.historial = this.historial.splice(0, 5);

        // TODO: prevenir duplicados
        this.historial.unshift(lugar.toLocaleLowerCase());

        // Grabar en DB
        this.guardarDB();

    }

    guardarDB() {
        const payload = {
            historial: this.historial
        }
        fs.writeFileSync( this.dbPath, JSON.stringify(payload) );
    }

    leerDB() {
        if (!fs.existsSync(this.dbPath)) {
            return null
        }
    
        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8'});
        const data = JSON.parse(info);
        this.historial = data.historial;
        return data;
    }

}

module.exports = Busquedas;