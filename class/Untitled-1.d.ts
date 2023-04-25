export interface Demandado {
    firstName: string;
    lastName: string;
    llaveProceso: string;
    idProceso: number;
    tel: number[];
    despacho: string;
    extras?: string | undefined | null | unknown;
}
export declare class Demandado {
    name: (() => string) | undefined;
    construtor(nombre1: string, nombre2: string, apellidos: string, llaveProceso: string, idProceso: number, tel: number[], despacho: string, extras: unknown): void;
}
