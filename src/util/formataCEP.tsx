import { apenasNumeros } from "./apenasNumeros"

export function formatCEP(value: string): string {
  const digits = apenasNumeros(value).slice(0, 8)
  return digits.replace(/^(\d{5})(\d)/, '$1-$2')
}