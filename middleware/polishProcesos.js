import * as fs from "fs/promises";
import cleanProcesos from "../data/cleanProcesos.js" assert { type: "json" };
export function fixFechas(fechaUltimaActuacion) {
    if (fechaUltimaActuacion === null) {
        return "no hay contenido";
    }
    if (fechaUltimaActuacion === undefined) {
        return "no se ha definido el contenido";
    }
    const date = new Date(fechaUltimaActuacion);
    const months = [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre",
    ];
    const month = months[date.getMonth()];
    const dia = date.getDate();
    const ano = date.getFullYear();
    return dia + " de " + month + " de " + ano;
}
export function fixDemandado(sujetosProcesales) {
    const locateDemandado = sujetosProcesales.search(/(demandado|causante)+:(?:\s*?|'\s*?')/gi);
    console.log(locateDemandado);
    if (locateDemandado === -1) {
        return "missing demandado";
    }
    const extractDemandado = sujetosProcesales
        .slice(locateDemandado + 10)
        .toLocaleLowerCase();
    console.log(extractDemandado);
    const trimDemandado = extractDemandado.replace(/^\s+|\s+$/gm, "");
    console.log(trimDemandado);
    const splitDemandado = trimDemandado.split(" ");
    console.log(splitDemandado);
    const splitDemandadotoUnify = splitDemandado.map((nombreOapellido, index) => {
        if (index >= 5) {
            return "";
        }
        console.log(nombreOapellido);
        if (nombreOapellido === "|") {
            return "";
        }
        if (nombreOapellido.includes("s.a.s")) {
            return "";
        }
        if (nombreOapellido.includes("sas")) {
            return "";
        }
        if (nombreOapellido.includes("(emplazado)")) {
            return "";
        }
        return nombreOapellido.replace(/^./, (str) => {
            return str.toUpperCase();
        });
    });
    console.log(splitDemandadotoUnify);
    const unifyDemandado = splitDemandadotoUnify.join(" ");
    return unifyDemandado;
}
export const Procesos = cleanProcesos.map((proceso) => {
    const Proceso = {
        idProceso: proceso.idProceso,
        idConexion: proceso.idConexion,
        llaveProceso: proceso.llaveProceso,
        fechaProceso: fixFechas(proceso.fechaProceso),
        fechaUltimaActuacion: fixFechas(proceso.fechaUltimaActuacion),
        despacho: proceso.despacho.toLowerCase(),
        departamento: proceso.departamento.toLowerCase().replace(/^./, (str) => {
            return str.toUpperCase();
        }),
        sujetosProcesales: fixDemandado(proceso.sujetosProcesales),
        esPrivado: proceso.esPrivado,
        cantFilas: proceso.cantFilas,
    };
    console.log(Proceso);
    return Proceso;
});
fs.writeFile("out/Procesos.ts", `const Procesos = ${JSON.stringify(Procesos)};
export default Procesos`);
