import { apenasNumeros } from "./apenasNumeros"

export function formatPhone(value: string): string {
  const digits = apenasNumeros(value).slice(0, 11)
  return digits
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
}