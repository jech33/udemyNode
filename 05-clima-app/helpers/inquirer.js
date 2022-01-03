const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Buscar ciudad`
            },
            {
                value: '2',
                name: `${'2.'.green} Historial`
            },
            {
                value: '0',
                name: `${'0.'.red} Salir`
            }
        ]
    }
];

const pausaInquirer = [
    {
        type: 'input',
        name: 'enter',
        message: `Presione ${'ENTER'.blue} para continuar`
    }
]

const inquirerMenu = async () => {
    console.clear();
    console.log("============================".green);
    console.log(" Seleccione una opción".green);
    console.log("============================".green);

    const { opcion } = await inquirer.prompt(preguntas)

    return opcion;
}

const pausa = async () => {
    console.log('\n')
    const { enter } = await inquirer.prompt(pausaInquirer);
}

const leerInput = async( message ) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }

                return true
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const listarLugares = async ( lugares = [] ) => {

    const choices = lugares.map( (lugares, i) => {
        const idx = `${i + 1}.`.green;

        return {
            value: lugares.id,
            name: `${idx} ${lugares.nombre}`
        }
    })

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })

    const preguntas = {
        type: 'list',
        name: 'id',
        message: 'Seleccione lugar: ',
        choices
    }

    const { id } = await inquirer.prompt(preguntas);
    return id;

    // {
    //     value: '1',
    //     name: `${'1.'.green} Crear tarea`
    // }

}

const confirmar = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const ok = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoChecklist = async ( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {
        const idx = `${i + 1}.`.green;
        const completed = tarea.completadoEn ? true : false;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: completed
        }
    })

    const preguntas = {
        type: 'checkbox',
        name: 'ids',
        message: 'Completar',
        choices
    }

    const { ids } = await inquirer.prompt(preguntas);
    return ids;

    // {
    //     value: '1',
    //     name: `${'1.'.green} Crear tarea`
    // }

}


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoChecklist
}