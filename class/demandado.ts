
export interface Demandado {
  firstName: string;
  lastName: string;
  llaveProceso: string;
  idProceso: number;
  tel: number[];
  juzgado: string;
  extras?: string | unknown| undefined | null;
}
export class Demandado {
  name: ( () => string ) | undefined;
  construtor ( nombre1: string, nombre2: string, apellidos: string, llaveProceso: string, idProceso: number, tel: number[], juzgado: string, extras: unknown) {
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
