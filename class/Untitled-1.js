export class Demandado {
    name;
    construtor(nombre1, nombre2, apellidos, llaveProceso, idProceso, tel, despacho, extras) {
        this.firstName = nombre1 + nombre2;
        this.lastName = apellidos;
        this.llaveProceso = llaveProceso;
        this.idProceso = idProceso;
        this.tel = tel;
        this.despacho = despacho;
        this.extras = extras;
        this.name = () => this.firstName + ' ' + this.lastName;
    }
}
const demandados = [
    {
        nombre1: 'Darnelly',
        nombre2: 'idk',
        apellidos: 'Ramos',
        llaveProceso: '11001400300320170088400',
        idProceso: 113956611,
        tel: [3506144932, 6051567],
        despacho: '27 cm pequeñas causas'
    }, {
        idProceso: 112945420,
        llaveProceso: '11001400303720170139100',
        despacho: 'JUZGADO 011 CIVIL MUNICIPAL DE EJECUCIÓN DE SENTENCIAS DE BOGOTÁ ',
        nombre1: 'Jose',
        nombre2: 'Noel',
        apellidos: 'Puerta Jaramillo',
        tel: [3132567570, 3103032791]
    }
];
const mapa = demandados.map((demandado) => {
    const name = demandado.nombre1 + ' ' + demandado.nombre2;
    return name;
});
mapa;
demandados;
Demandado;
