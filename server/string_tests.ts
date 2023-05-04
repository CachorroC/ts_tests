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
const procesosRaw = function Cleaner(
  SP: string,
  despacho: string,
  FUA: string | null | undefined
) {
  const locateDemandado = SP.search(/(demandado|causante)+:(?:\s*?|'\s*?')/gi);
  console.log(locateDemandado);
  const extractDemandado = SP.slice(locateDemandado + 10).toLocaleLowerCase();
  console.log(extractDemandado);
  const trimDemandado = extractDemandado.replace(/^\s+|\s+$/gm, "");
  console.log(trimDemandado);
  const splitDemandado = trimDemandado.split(" ");
  console.log(splitDemandado);
  const splitDemandadotoUnify = splitDemandado.map((noa: string) => {
    return noa.replace(/^./, (str: string) => {
      return str.toUpperCase();
    });
  });
  console.log(splitDemandadotoUnify);
  const unifyDemandado = splitDemandadotoUnify.join(" ");
  console.log(unifyDemandado);
  const hasActuaciones = () => {
    if (locateDemandado === -1) {
      return true;
    }
    return false;
  };
  console.log(hasActuaciones());
  const isPrivado = () => {
    if (SP.match(/-+.*\[.*\].*-+/gi)) {
      return true;
    }
    return false;
  };
  console.log(isPrivado());
  const hasContent = () => {
    if (FUA === null) {
      return "no hay contenido";
    }
    if (FUA === undefined) {
      return "no se ha definido el contenido";
    }
    return FUA;
  };
  const titleFixed = () => {
    if (hasActuaciones()) {
      return SP;
    }
    if (isPrivado()) {
      return "";
    }
    return unifyDemandado;
  };
  console.log(titleFixed());
  const Demandado = {
    SP: titleFixed(),
    FUA: hasContent(),
  };
  return Demandado;
};
const fixedProcesos = procesosRaw.map(
  (proceso: intProceso, index: number, array: intProceso[]) => {
    return Cleaner(
      proceso.sujetosProcesales,
      proceso.despacho,
      proceso.fechaUltimaActuacion
    );
  }
);

fixedProcesos;

function cleanNombreDemandadoOnly(SP: string): string {
  const locateDemandado = SP.search(/(demandado|causante)+:(?:\s*?|'\s*?')/gi);
  console.log(locateDemandado);
  if (locateDemandado === -1) {
    return "";
  }
  const extractDemandado = SP.slice(locateDemandado + 10).toLocaleLowerCase();
  console.log(extractDemandado);
  const trimDemandado = extractDemandado.replace(/^\s+|\s+$/gm, "");
  console.log(trimDemandado);
  const splitDemandado = trimDemandado.split(" ");
  console.log(splitDemandado);
  const splitDemandadotoUnify = splitDemandado.map(
    (nombreOapellido: string, index: number) => {
      console.log(nombreOapellido);
      if (index >= 5) {
        return;
      }
      if (nombreOapellido === "|") {
        return;
      }
      if (nombreOapellido.includes("s.a.s")) {
        return;
      }
      if (nombreOapellido.includes("(emplazado)")) {
        return;
      }
      return nombreOapellido.replace(/^./, (str: string) => {
        return str.toUpperCase();
      });
    }
  );

  console.log(splitDemandadotoUnify);
  const unifyDemandado = splitDemandadotoUnify.join(" ");
  console.log(unifyDemandado);
  return unifyDemandado;
}

const soloDemandado = procesosRaw.map((proceso) => {
  return cleanNombreDemandadoOnly(proceso.sujetosProcesales);
});

soloDemandado;

function transformDataDemandadoClean(proceso: intProceso): intProceso {
  function cleanTextDemandado(sujetosProcesales: string): string {
    const locateDemandado = sujetosProcesales.search(
      /(demandado|causante)+:(?:\s*?|'\s*?')/gi
    );
    console.log(locateDemandado);
    if (locateDemandado === -1) {
      return "";
    }
    const extractDemandado = sujetosProcesales
      .slice(locateDemandado + 10)
      .toLocaleLowerCase();
    const trimDemandado = extractDemandado.replace(/^\s+|\s+$/gm, "");
    const splitDemandado = trimDemandado.split(" ");
    const splitDemandadotoUnify = splitDemandado.map(
      (nombreOapellido, index) => {
        if (index >= 5) {
          return;
        }
        console.log(nombreOapellido);
        if (nombreOapellido === "|") {
          return;
        }
        if (nombreOapellido.includes("s.a.s")) {
          return;
        }
        if (nombreOapellido.includes("(emplazado)")) {
          return;
        }
        return nombreOapellido.replace(/^./, (str) => {
          return str.toUpperCase();
        });
      }
    );
    const unifyDemandado = splitDemandadotoUnify.join(" ");
    const isPrivado = () => {
      if (sujetosProcesales.match(/-+.*\[.*\].*-+/gi)) {
        return true;
      }
      return false;
    };
    return unifyDemandado;
  }

  function cleanTextUltimaActuacion(
    fechaUltimaActuacion: string | null | undefined
  ) {
    if (fechaUltimaActuacion === null) {
      return "no hay contenido";
    }
    if (fechaUltimaActuacion === undefined) {
      return "no se ha definido el contenido";
    }

    return fechaUltimaActuacion;
  }
  const Demandado: intProceso = {
    sujetosProcesales: cleanTextDemandado(proceso.sujetosProcesales),
    fechaUltimaActuacion: cleanTextUltimaActuacion(
      proceso.fechaUltimaActuacion
    ),
    idProceso: proceso.idProceso,
    idConexion: proceso.idConexion,
    llaveProceso: proceso.llaveProceso,
    despacho: proceso.despacho.toLowerCase(),
    departamento: proceso.departamento,
    esPrivado: proceso.esPrivado,
    cantFilas: proceso.cantFilas,
  };
  return Demandado;
}

const clean: intProceso[] = procesosRaw.map((proceso) => {
  return transformDataDemandadoClean(proceso);
});
clean;
