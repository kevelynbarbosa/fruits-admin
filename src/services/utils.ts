/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { format } from 'date-fns'

export function parseJson(data: string) {
  try {
    return JSON.parse(data)
  } catch (e) {
    // parse error
    return null
  }
}

export const dateToApi = (date: Date): string => {
  const timezoneDate = new Date(
    date.valueOf() - date.getTimezoneOffset() * 60000,
  )
  const dataFormatada = timezoneDate.toISOString().replace(/\.\d{3}Z$/, '')
  return dataFormatada
}

export const imgExists = (url) => {
  try {
    const http = new XMLHttpRequest()
    http.open('HEAD', url, false)
    http.send()
    return http.status === 200
  } catch (e) {
    return false
  }
}

//* Remove todos os caractes não numéricos
export const onlyNumbersFormat = (value: string) => value.replace(/\D+/g, '')
export const isNum = (num) => /^\d+$/.test(num) || /^\d+\.\d+$/.test(num)

//* Aplicar formatações em strings comuns
export const phoneFormat = (value: string) =>
  value.replace(/^(\d{2})(\d{1})(\d{4})(\d{4}).*/, '($1) $2 $3-$4')
export const rgFormat = (value: string) =>
  value.replace(/^(\d{2})(\d{1})(\d{4})(\d{4}).*/, '($1) $2 $3-$4')
export const cpfFormat = (value: string) =>
  value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4')
export const cnhFormat = (value: string) =>
  value.replace(/^(\d{2})(\d{1})(\d{4})(\d{4}).*/, '($1) $2 $3-$4')
export const ctpsFormat = (value: string) =>
  value.replace(/^(\d{2})(\d{1})(\d{4})(\d{4}).*/, '($1) $2 $3-$4')

export const arrayBufferToBase64 = (buffer) => {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  const len = bytes.byteLength
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return window.btoa(binary)
}

// ? Diminuir texto por número de caractres sem cortar palavras
export const resumirTexto = (
  str: string,
  maxLen: number,
  separator = ' ',
  ellipsis: boolean,
) => {
  if (str.length <= maxLen) return str
  return `${str.substr(0, str.lastIndexOf(separator, maxLen))}${
    ellipsis && '...'
  }`
}

// ? Formatar data para o formato DD/MM/AAAA - HH:mm
export const formatDateTime = (date: string) => {
  return date ? format(new Date(date), 'dd/MM/yyyy - HH:mm') : '--'
}

export const formatDate = (date: string) => {
  return date ? format(new Date(date), 'dd/MM/yyyy') : '--'
}
