//var mysql = require('mysql')

let tools = require('./funcionesAsignaCliente')
let clientes = require('./clientesPrueba')
let esc = require('./escPrueba')
let config = require('./config')
let datos = require('./datos')
let pesos = require('./pesos')
let escActivos = require('./escActivos')
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
let pesoMeses = pesos.months,
    pesoClientes = pesos.number_clients,
    pesoDeudas = pesos.number_contracts,
    pesoMonto = pesos.amount_debt

let pesoTotal = (pesoMeses + pesoClientes + pesoDeudas + pesoMonto) / 100
console.log(pesoMeses, pesoClientes, pesoDeudas, pesoMonto);



console.log('---------------ESC activos------------------------')
console.log(escActivos);
let escEnabled = []
escActivos.forEach(element => {
    escEnabled.push({ idEsc: element.idConsultant });
});
console.log(escEnabled);


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
    element.meses *= pesoMeses / pesoTotal
    element.clientes *= pesoClientes / pesoTotal
    element.deudas *= pesoDeudas / pesoTotal
    element.monto *= pesoMonto / pesoTotal
})
console.log('----------------PESOS-----------------------')
console.log(datos);

let puntos = []
datos.forEach(element => {
    pts = element.meses + element.clientes + element.deudas + element.monto
    puntos.push({ esc: element.esc, pts: pts })
});
console.log('----------------PESOS-----------------------')
console.log(puntos);




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
