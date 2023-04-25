interface intProceso {
    idProceso: number;
    idConexion: number;
    llaveProceso: string;
    fechaProceso?: string | null;
    fechaUltimaActuacion?: string | null;
    despacho: string;
    departamento: string;
    sujetosProcesales: string;
    esPrivado: boolean;
    cantFilas: number;
}
declare const procesosRaw: (SP: string, despacho: string, FUA: string | null | undefined) => {
    SP: string;
    FUA: string;
};
declare const fixedProcesos: any;
declare function cleanNombreDemandadoOnly(SP: string): string;
declare const soloDemandado: any;
declare function transformDataDemandadoClean(proceso: intProceso): intProceso;
declare const clean: intProceso[];
