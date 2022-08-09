/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TBaseObject } from './types'

export function isEmptyObject<TTypeObject extends TBaseObject>(obj: TTypeObject) {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

export function isObject<TTypeObject extends TBaseObject>(obj: TTypeObject) {
  return obj.constructor === Object
}

export function isArrayOfNumber(arr: any[]): boolean {
  return arr.every((value) => typeof Number(value) === 'number' && !Number.isNaN(Number(value)))
}

export function isArrayOfCSSUnits(arr: any[]): boolean {
  const CSSUnits = /^[0-9.]+(cm|mm|Q|in|pc|pt|px|em|ex|ch|rem|lh|rlh|vw|vh|vmin|vmax|vb|vi|svw|svh|lvw|lvh|dvw|dvh)$/
  return arr.every((value) => typeof value === 'string' && CSSUnits.test(value))
}
