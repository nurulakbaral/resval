/* eslint-disable @typescript-eslint/no-explicit-any */

export function isEmptyObject<TTypeObject extends Record<string | number | symbol, any>>(obj: TTypeObject) {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

export function isObject<TTypeObject extends Record<string | number | symbol, any>>(obj: TTypeObject) {
  return obj.constructor === Object
}

export function isArrayOfCSSUnits(arr: any[]): boolean {
  const CSSUnits = /^[0-9.]+(cm|mm|Q|in|pc|pt|px|em|ex|ch|rem|lh|rlh|vw|vh|vmin|vmax|vb|vi|svw|svh|lvw|lvh|dvw|dvh)$/
  return arr.every((value) => typeof value === 'string' && CSSUnits.test(value))
}

export function isCSSUnits(value: string): boolean {
  const CSSUnits = /^[0-9.]+(cm|mm|Q|in|pc|pt|px|em|ex|ch|rem|lh|rlh|vw|vh|vmin|vmax|vb|vi|svw|svh|lvw|lvh|dvw|dvh)$/
  return typeof value === 'string' && CSSUnits.test(value)
}
