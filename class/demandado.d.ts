export declare class Demandado {
    firstName: string;
    apellidos: string;
    llaveProceso: string;
    idProceso: number;
    tel: number[];
    juzgado: string;
    extras: unknown;
    construtor(nombre1: string, nombre2: string, apellidos: string, llaveProceso: string, idProceso: number, tel: number[], juzgado: string, extras: unknown): void;
    get name(): string;
}
