declare const cleanProcesos: ({
    idProceso: number;
    idConexion: number;
    llaveProceso: string;
    fechaProceso: string;
    fechaUltimaActuacion: string;
    despacho: string;
    departamento: string;
    sujetosProcesales: string;
    esPrivado: boolean;
    cantFilas: number;
} | {
    idProceso: number;
    idConexion: number;
    llaveProceso: string;
    fechaProceso: string;
    fechaUltimaActuacion: null;
    despacho: string;
    departamento: string;
    sujetosProcesales: string;
    esPrivado: boolean;
    cantFilas: number;
} | {
    idProceso: number;
    idConexion: number;
    llaveProceso: string;
    fechaProceso: null;
    fechaUltimaActuacion: null;
    despacho: string;
    departamento: string;
    sujetosProcesales: string;
    esPrivado: boolean;
    cantFilas: number;
})[];
export default cleanProcesos;
