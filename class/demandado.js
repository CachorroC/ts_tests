export class Demandado {
    name;
    construtor(nombre1, nombre2, apellidos, llaveProceso, idProceso, tel, juzgado, extras) {
        this.firstName = nombre1 + nombre2;
        this.lastName = apellidos;
        this.llaveProceso = llaveProceso;
        this.idProceso = idProceso;
        this.tel = tel;
        this.juzgado = juzgado;
        this.extras = extras;
        this.name = () => this.firstName + ' ' + this.lastName;
    }
}
