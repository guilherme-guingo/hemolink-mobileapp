import { BloodStock } from "./tipagemDadosApi";

export function obterTiposSanguineosCriticos(bloodStock: BloodStock) {
  if (!bloodStock || Object.keys(bloodStock).length === 0) return "Nenhum";
  const menoresEstoques = Object.entries(bloodStock)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 2);
  return menoresEstoques.map((item) => item[0]).join(", ");
}
