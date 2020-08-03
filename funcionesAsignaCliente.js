module.exports = {
    porPuntos: (cliente, esc) => {
        // la función regresa el "id" del esc a modificar
        let escAsignado = asignaxPuntos(clientes, esc)
        return escAsignado
    },
    porGenero: (umbral, cliente, esc) => {
        // la función regresa el "id" del esc a modificar
        let escAsignado = asignaxGenero(umbral, cliente, esc)
        return escAsignado
    }
};

let escBajoUmbral = (esc, umbral) => {
    // regrea un arreglo con los ESC
    // que estan no rebasan el umbral
    let escUmbral = [];
    let puntoMin;
    // ya estaba ordenado de menor a mayor
    puntoMin = esc[0].puntos
    esc.forEach(element => {
        if (element.puntos <= (puntoMin + umbral)) {
            escUmbral.push(element);
        }
    })
    return escUmbral
}

let mismoNumeroPuntos = (esc) => {
    let menorPuntos = esc[0].puntos
    let puntosRepetidos = [];
    esc.forEach(element => {
        if (element.puntos === menorPuntos)
            puntosRepetidos.push({ id: element.id, clientes: element.clientes.length })
    })
    return puntosRepetidos
}

let ordenaxClientes = (puntosRepetidos) => {
    puntosRepetidos.sort(function(a, b) {
        //Se ordena a los ESC por el número de clientes
        var clienteA = a.clientes
        var clienteB = b.clientes
        return (clienteA < clienteB) ? -1 : (clienteA > clienteB) ? 1 : 0
    });
    return puntosRepetidos
}
let ordenaxPuntos = (esc) => {
    esc.sort(function(a, b) {
        //Se ordena a los ESC por el número de puntos
        var puntosA = a.puntos;
        var puntosB = b.puntos;
        return (puntosA < puntosB) ? -1 : (puntosA > puntosB) ? 1 : 0;
    })
    return esc
}

let mismoNumeroClientes = (puntosRepetidos, esc) => {
    let indice
    let mismosClientes = []
    let noClientes = puntosRepetidos[0].clientes
    puntosRepetidos.forEach(element => {
        //Obtiene el numero de clientes
        if (element.clientes === noClientes)
            mismosClientes.push({ id: element.id })
    })
    if (mismosClientes.length > 1) {
        // se asigna al esc de manera aleatoria
        indice = Math.floor(Math.random() * (mismosClientes.length - 1))
        indice = esc.findIndex(x => x.id == mismosClientes[indice].id)
    } else {
        indice = esc.findIndex(x => x.id === puntosRepetidos[0].id)
    }
    return indice;
}

let asignaxPuntos = (cliente, esc) => {
    let puntosRepetidos = []
    let indice
        // ordena por el numero de puntos
    esc = ordenaxPuntos(esc)
        // busca si hay puntuaciones iguales
    puntosRepetidos = mismoNumeroPuntos(esc)
        // ordena por numero de clientes
    puntosRepetidos = ordenaxClientes(puntosRepetidos)
    if (puntosRepetidos.length > 1) {
        // verifica que los ESC con el mismo número de clientes
        indice = mismoNumeroClientes(puntosRepetidos, esc)
        return esc[indice].id
    } else
        return esc[0].id
}

let asignaxGenero = (umbral, cliente, esc) => {
    let bajoUmbral = []
    let escAsignado
    esc = ordenaxPuntos(esc)
        //obtiene los elementos que son
        //menores al umbral en puntos
        //por lo tanto son a los que se les puede asignar
    bajoUmbral = escBajoUmbral(esc, umbral)
        // Clasifico a los ESC por genero
    let escM = bajoUmbral.filter(x => x.genero === 'M')
    let escH = bajoUmbral.filter(x => x.genero === 'H')
    console.log('Mujeres', escM)
    console.log('Hombres', escH)
    if (cliente.genero === 'M') {
        if (escM.length)
        // Si existe al menor uno se asigna a las mujeres
            escAsignado = asignaxPuntos(cliente, escM)
        else
        // Si no existe ninguno se asigna a cualquiera
        // que este debajo del umbral
            escAsignado = asignaxPuntos(cliente, bajoUmbral)

    } else {
        if (escH.length)
        // Si existe al menor uno se asigna a las mujeres
            escAsignado = asignaxPuntos(cliente, escH)
        else
        // Si no existe ninguno se asigna a cualquiera
        // que este debajo del umbral
            escAsignado = asignaxPuntos(cliente, bajoUmbral)

    }
    return escAsignado
}