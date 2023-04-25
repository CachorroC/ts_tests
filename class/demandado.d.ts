export interface Demandado {
    firstName: string;
    lastName: string;
    llaveProceso: string;
    idProceso: number;
    tel: number[];
    juzgado: string;
    extras?: string | unknown | undefined | null;
}
export declare class Demandado {
    name: (() => string) | undefined;
    construtor(nombre1: string, nombre2: string, apellidos: string, llaveProceso: string, idProceso: number, tel: number[], juzgado: string, extras: unknown): void;
}
