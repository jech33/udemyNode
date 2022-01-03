require('colors');

/*
    _listado:
        {'uuid-123712-2: { id:12, desc:asd, completadoEN: 92231 } }
*/

const Tarea = require("./tarea");

class Tareas {

    _listado = {};

    constructor() {
        this._listado = {};
    }

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea)
        })


        return listado;
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea(desc = '') {

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

    listadoCompleto() {
        // 1. Descripción :: Completada | Pendiente
        // Completada: verde
        // Pendiente: rojo
        const listado = this.listadoArr;
        listado.forEach((tarea, i) => {
            const idx = `${i + 1}.`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${idx} ${desc} :: ${estado}`)
        });
    }

    listarPendientesCompletadas(completadas = true) {
        const listado = this.listadoArr;
        let i = 1;
        listado.forEach(tarea => {
            
            const idx = `${i}.`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;

            if (completadas) {
                if (completadoEn) {
                    console.log(`${idx} ${desc} :: ${estado} -> ${completadoEn}`)
                    i += 1;
                }
            } else {
                if (!completadoEn) {
                    console.log(`${idx} ${desc} :: ${estado}`)
                    i += 1;
                }
            }

        });
    }

    borrarTarea( id = '') {
        delete this._listado[id];
    }

    toggleCompletadas( ids = [] ) {

        ids.forEach( id => {
            const tarea = this._listado[id];
            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toLocaleString('es-CO');
            }
        })

        this.listadoArr.forEach( tarea => {

            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }

        })

    }
}

module.exports = Tareas;