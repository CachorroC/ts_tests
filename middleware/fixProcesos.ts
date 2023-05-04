import * as fs from "fs/promises";
import { intConsultaNumeroRadicacion, intProceso } from "../src/procesos.js";
import rows from "../out/rows.getProcesos.json" assert { type: "json" };

const missingProcesos: number[] = [];
export const nonMissingProcesos: intProceso[] = [];
export const getProcesosfromRadicados = rows.map((radicado) => {
  return radicado.procesos;
});
export const polishProcesos = getProcesosfromRadicados.forEach(
  (procesos, index, array) => {
    if (array.length === 0) {
      missingProcesos.push(index);
    }
    procesos.forEach((proceso) => {
      nonMissingProcesos.push(proceso);
      fs.writeFile(
        "data/cleanProcesos.ts",
        `const cleanProcesos = ${JSON.stringify(nonMissingProcesos)};
        export default cleanProcesos`
      );
    });
  }
);

console.log(polishProcesos);
console.log(missingProcesos);
console.log(nonMissingProcesos);
console.log(getProcesosfromRadicados);
getProcesosfromRadicados;
