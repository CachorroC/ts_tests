declare const dataRows: ({
    tipoConsulta: string;
    procesos: ({
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
        fechaProceso: null;
        fechaUltimaActuacion: null;
        despacho: string;
        departamento: string;
        sujetosProcesales: string;
        esPrivado: boolean;
        cantFilas: number;
    })[];
    parametros: {
        numero: string;
        nombre: null;
        tipoPersona: null;
        idSujeto: null;
        ponente: null;
        claseProceso: null;
        codificacionDespacho: null;
        soloActivos: boolean;
    };
    paginacion: {
        cantidadRegistros: number;
        registrosPagina: number;
        cantidadPaginas: number;
        pagina: number;
        paginas: null;
    };
} | {
    tipoConsulta: string;
    procesos: ({
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
    })[];
    parametros: {
        numero: string;
        nombre: null;
        tipoPersona: null;
        idSujeto: null;
        ponente: null;
        claseProceso: null;
        codificacionDespacho: null;
        soloActivos: boolean;
    };
    paginacion: {
        cantidadRegistros: number;
        registrosPagina: number;
        cantidadPaginas: number;
        pagina: number;
        paginas: null;
    };
})[];
export default dataRows;
