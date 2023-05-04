process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
const llaves = [
    "25754418900320170075500",
    "25245408900120170023900",
    "11001400302120170153200",
    "11001400300320170088400",
    "25175408900320180060200",
    "25377408900120180037100",
    "11001400303720170139100",
    "11001400304820170097400",
    "25754400300120170032300",
    "11001400301520170139400",
    "11001400305620180022100",
    "11001400306820200102100",
    "11001418901320190070800",
    "11001400300320170088400",
    "11001400303420170083600",
    "25245408900120170023900",
    "25754418900320170075500",
    "11001400302520170090300",
    "11001400300120170100100",
    "11001400300820170113400",
    "11001400303720170139100",
    "11001400301520170139400",
    "11001400304820170097400",
    "11001400302120170153200",
    "25754400300120170032300",
    "11001400302120180023600",
    "11001400305620180022100",
    "11001418901420190065600",
    "11001418900820180078500",
    "25175408900320180060200",
    "11001418901320190070800",
    "25377408900120180037100",
    "11001400304220200053500",
    "11001400306820200102100",
    "11001400308520170084900",
    "11001310301120170033500",
    "11001400304320180038400",
    "11001400302620170051100",
    "25035408900120170010800",
    "25183400300120170010600",
    "11001400300620170030200",
    "11001400300620170041900",
    "11001400304220170076000",
    "11001400303920170080000",
    "11001400302220170056700",
    "11001400308220170068000",
    "11001400300420170057500",
    "11001400305920170048300",
    "11001310302520170073600",
    "11001400307020170056600",
    "11001400304720170152000",
    "11001400304520170090500",
    "11001400307620170063500",
    "11001400300320170126400",
    "11001400301120170108400",
    "11001400302520170080700",
    "25175408900220170041200",
    "11001400307920170108200",
    "11001400302420170175000",
    "73449408900220170025900",
    "11001400304520170106300",
    "11001400301220170097100",
    "25754400300220170026500",
    "11001400306420170119100",
    "11001400302120180016300",
    "11001400305520170086000",
    "11001400302820170084900",
    "11001400306920170084500",
    "11001400301620170087500",
    "11001400301320170116200",
    "25175408900320170047700",
    "11001400301320170117800",
    "11001400300820170105800",
    "11001400300920170127900",
    "11001400301720170119500",
    "11001400301820170152200",
    "11001410375220170012800",
    "11001400306320170092400",
    "11001400305120170111300",
    "15842408900120170009500",
    "11001400306820170130600",
    "25148408900120170009600",
    "11001400303320170147400",
    "11001400300120170130900",
    "11001400304820170097400",
    "11001400307620170101600",
    "11001400307820170097500",
    "11001400301720170133600",
    "11001400302220170120800",
    "11001400305020170133600",
    "11001400300420170126600",
    "25899400300220170013100",
    "11001400306420170162300",
    "11001400307820170116400",
    "11001400302020170147700",
    "11001400307120170125000",
    "25126408900220180004800",
    "11001400301420180040600",
    "11001400305920180009000",
    "11001400303720180011100",
    "11001400305220180011700",
    "25754408900220180011300",
    "11001400300420180047500",
    "25307400300320210053900",
    "11001400300620180045400",
    "11001418901620190108500",
    "11001400308120180051400",
    "11001400305120180085000",
    "11001400303620180081800",
    "11001400301420180092900",
    "11001400308220180096400",
    "11001418901220180064400",
    "11001418901220180095100",
    "11001400300220170100200",
    "11001400306320170129000",
];
import * as fs from "fs/promises";
export const rows = [];
export async function fetchProceso(llaveProceso) {
    const res = await fetch(`https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Procesos/Consulta/NumeroRadicacion?numero=${llaveProceso}&SoloActivos=false`);
    if (!res.ok) {
        throw new Error("the server gave a negative response");
    }
    const rawData = (await res.json());
    fs.writeFile("lib/rawData.ts", `const rawData = ${JSON.stringify(rawData)}; export default rawData;`);
    fs.writeFile("lib/rows.ts", `const dataRows = ${JSON.stringify(rows)}; export default dataRows;`);
    return rawData;
}
export const getProcesos = llaves.map((llave, index) => {
    const time = index * 1000;
    setTimeout(() => {
        return fetchProceso(llave).then((procesos) => {
            return rows.push(procesos);
        }, (error) => {
            throw new Error(error);
        });
    }, time);
    return rows;
});
getProcesos;
console.log(getProcesos);
export const missingProcesos = [];
export const nonMissingProcesos = [];
export const getProcesosfromRadicados = rows.map((radicado) => {
    return radicado.procesos;
});
const polishProcesos = getProcesosfromRadicados.forEach((procesos, index) => {
    if (procesos.length === 0) {
        missingProcesos.push(index);
    }
    procesos.forEach((proceso) => {
        nonMissingProcesos.push(proceso);
        fs.writeFile("lib/cleanProcesos.ts", `const cleanProcesos = ${JSON.stringify(nonMissingProcesos)}; export default cleanProcesos;`);
    });
});
polishProcesos;
console.log(polishProcesos);
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
export const Procesos = nonMissingProcesos.map((proceso) => {
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
Procesos;
console.log(Procesos);
fs.writeFile("out/Procesos.json", JSON.stringify(Procesos));
