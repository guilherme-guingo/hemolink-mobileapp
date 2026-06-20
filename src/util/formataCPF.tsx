import { apenasNumeros } from './apenasNumeros'

export function formatCPF(value: string): string {
  const digits = apenasNumeros(value).slice(0, 11)

  return digits
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1-$2')
}