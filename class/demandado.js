export class Demandado {
    firstName = "";
    apellidos = "";
    llaveProceso = "";
    idProceso = 0;
    tel = [0, 0];
    juzgado = "";
    extras;
    construtor(nombre1, nombre2, apellidos, llaveProceso, idProceso, tel, juzgado, extras) {
        this.firstName = nombre1 + nombre2;
        this.apellidos = apellidos;
        this.llaveProceso = llaveProceso;
        this.idProceso = idProceso;
        this.tel = tel;
        this.juzgado = juzgado;
        this.extras = extras;
    }
    get name() {
        return this.firstName + this.apellidos;
    }
}
