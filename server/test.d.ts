import { intConsultaNumeroRadicacion, intProceso } from "../src/procesos.js";
export declare const rows: intConsultaNumeroRadicacion[];
export declare function fetchProceso(llaveProceso: string): Promise<intConsultaNumeroRadicacion>;
export declare const getProcesos: intConsultaNumeroRadicacion[][];
export declare const missingProcesos: number[];
export declare const nonMissingProcesos: intProceso[];
export declare const getProcesosfromRadicados: intProceso[][];
export declare function fixFechas(fechaUltimaActuacion: string | null | undefined): string;
export declare function fixDemandado(sujetosProcesales: string): string;
export declare const Procesos: intProceso[];
