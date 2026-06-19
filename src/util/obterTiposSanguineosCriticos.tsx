// export interface BloodStock {
//   "A+": number;
//   "A-": number;
//   "B+": number;
//   "B-": number;
//   "AB+": number;
//   "AB-": number;
//   "O+": number;
//   "O-": number;
// }

import { BloodStock } from "./tipagemDadosApi";

// OBS: ESSA INTERFACE VALE A PENA SER GLOBAL, VISTO QUE O ADM,CATALOGO E PROVAVELMENTE O DETALHES UTILIZAM ESSA TIPAGEM

export function obterTiposSanguineosCriticos(bloodStock: BloodStock) {
  if (!bloodStock || Object.keys(bloodStock).length === 0) return "Nenhum";
  const menoresEstoques = Object.entries(bloodStock)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 2);
  return menoresEstoques.map((item) => item[0]).join(", ");
}
