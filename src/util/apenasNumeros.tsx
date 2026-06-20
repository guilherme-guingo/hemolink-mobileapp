export function apenasNumeros(text: string) {
  return text.replace(/\D/g, '')
}