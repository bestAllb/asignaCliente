//var mysql = require('mysql')

let tools = require('./funcionesAsignaCliente')
let clientes = require('./clientesPrueba')
let esc = require('./escPrueba')
let config = require('./config')
let datos = require('./datos')
    /*
    var connection = mysql.createConnection({
        host: 'dbm-cluster.cluster-c425ewuorrit.us-west-1.rds.amazonaws.com',
        user: 'feliche',
        password: 'XgsQdswVnM2Qexh^U9ve',
        database: 'dbm'
    });*/
let deudas = 0,
    client = 0,
    meses = 0,
    monto = 0
    /*
    connection.connect();

    connection.query('SELECT * from v_get_points_esc', function(error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        let suma = 0;
        let esc14 = 0;
        let esc18 = 0;
        let otros = 0;
        results.forEach(element => {
            suma += element.totalDeuda
            if (element.ESC === 18)
                esc18++;
            else if (element.ESC === 14)
                esc14++;
            else
                otros++;
        });
        console.log('suma', suma, 'esc18', esc18, 'esc14', esc14)
        console.log('totalCuentas', results.length);
        console.log('otros', otros);
    })
    */
console.log('---------------ORIGINAL------------------------')
console.log(datos);

datos.forEach(element => {
    deudas += Number(element.deudas)
    client += Number(element.clientes)
    meses += Number(element.meses)
    monto += Number(element.monto)
})
console.log('--------------------SUMAS-------------------')
console.log(deudas, client, meses, monto);

datos.forEach(element => {
    element.deudas /= deudas
    element.clientes /= client
    element.meses /= meses
    element.monto /= monto
})
console.log('---------------PORCENTAJES------------------------')
console.log(datos);
datos.forEach(element => {
    element.meses *= 100 / 2.6
    element.clientes *= 80 / 2.6
    element.deudas *= 60 / 2.6
    element.monto *= 20 / 2.6
})
console.log('----------------PESOS-----------------------')
console.log(datos);

let pesos = []
datos.forEach(element => {
    pts = element.meses + element.clientes + element.deudas + element.monto
    pesos.push({ esc: element.esc, puntos: pts })
});
console.log('----------------PESOS-----------------------')
console.log(pesos);

/*

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
        escAsignado = tools.porGenero(config.umbral_genero, element, esc)
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
*/