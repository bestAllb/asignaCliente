var tools = require('./funcionesAsignaCliente')
var clientes = require('./clientesPrueba')
var esc = require('./escPrueba')
var config = require('./config')


// filtra por genero
let escM = esc.filter(x => x.genero === 'M')
let escH = esc.filter(x => x.genero === 'H')

if ((escH.length === 0) && (escM.length === 0)) {
    // no se tienen ESC
    return console.log("Sin ESC");
}

if (escH.length === 0 || escM.length === 0) {
    //Asignación por puntos
    //Solo hombres o mujeres ESC
    console.log("Por puntos");
    let escAsignado;
    let index
    clientes.forEach(element => {
        escAsignado = tools.porPuntos(element, esc)
        index = esc.findIndex(x => x.id === escAsignado);
        esc[index].puntos += element.puntos
        esc[index].clientes.push(element)
        console.log('---------------------------------------')
        console.log('cliente', element.id, element.genero, element.puntos)
        esc.forEach(escPrint => {
            console.log(escPrint.id, escPrint.genero, escPrint.clientes.length,
                escPrint.puntos);
            console.log(escPrint.clientes);
        });
    })
} else {
    //Se asigna por genero si existen hombres
    //y mujeres incluso si son el mismo número
    let escAsignado
    let index
    console.log("Por genero")
    clientes.forEach(element => {
        escAsignado = tools.porGenero(config.umbral, element, esc)
        index = esc.findIndex(x => x.id === escAsignado);
        esc[index].puntos += element.puntos
        esc[index].clientes.push(element)
        console.log('---------------------------------------')
        console.log('cliente', element.id, element.genero, element.puntos)
        esc.forEach(escPrint => {
            console.log(escPrint.id, escPrint.genero, escPrint.clientes.length,
                escPrint.puntos);
            console.log(escPrint.clientes);
        });

    });
}