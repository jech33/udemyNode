require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
// const { mostrarMenu, pausa } = require('./helpers/mensajes');
const { inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

const main = async () => {

    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();
    if (tareasDB) {
        // Establecer tareas
        tareas.cargarTareasFromArray(tareasDB);
    }

    while (opt !== '0') {
        // Imprimir el menú
        opt = await inquirerMenu();
        console.log({ opt });

        switch (opt) {
            case '1':
                // Crear opcion
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);
                break;
            case '2':
                // Listar tareas
                tareas.listadoCompleto();
                break;
            case '3':
                // Listar tareas completadas
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                // Listar tareas completadas
                tareas.listarPendientesCompletadas(false);
                break;
            case '5': // Completar tarea
                const ids = await mostrarListadoChecklist( tareas.listadoArr );
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                // Listar tareas completadas
                const { id } = await listadoTareasBorrar( tareas.listadoArr );
                if ( id !== '0') {
                    const { ok } = await confirmar("¿Está seguro de eliminar el registro?");
                    if ( ok ) {
                        tareas.borrarTarea( id );
                        console.log("Tarea eliminada exitosamente")
                    }
                }
                break;
            default:
                break;
        }

        guardarDB(tareas.listadoArr);

        if (opt !== '0') await pausa();
    }

}

main();