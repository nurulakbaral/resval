/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TRecordKeys } from './types'
import { CSSUnitsRegex } from './constants'

export function isEmptyObject(obj: Record<TRecordKeys, any>) {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

export function isObject(obj: Record<TRecordKeys, any>) {
  return obj?.constructor === Object
}

export function isArrayOfCSSUnits(arr: any[]): boolean {
  return arr.every((value) => typeof value === 'string' && CSSUnitsRegex.test(value))
}

export function isCSSUnits(value: string): boolean {
  return typeof value === 'string' && CSSUnitsRegex.test(value)
}

export function isBreakpointsHaveDiffCSSUnits(breakpointsValues: string[]): boolean {
  let listOfCSSUnit: string[] = []
  for (let value of breakpointsValues) {
    let val = value.match(/[a-zA-Z]+/g)?.[0] ?? ''
    if (!listOfCSSUnit.includes(val)) {
      listOfCSSUnit.push(val)
    }
  }
  return listOfCSSUnit.length > 1
}
