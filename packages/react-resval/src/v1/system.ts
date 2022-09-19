/* eslint-disable prefer-const */

import type { TDefaultBreakpoints, TRecordKeys } from './types'
import { isArrayOfCSSUnits, isEmptyObject, isObject, isCSSUnits } from './utils'

export function setBreakpoints(
  defaultBreakpoints: TDefaultBreakpoints,
  optionBreakpoints: Record<TRecordKeys, string> | undefined | null,
) {
  if (!optionBreakpoints) {
    return defaultBreakpoints
  }
  if (isEmptyObject(optionBreakpoints) || !isObject(optionBreakpoints)) {
    return defaultBreakpoints
  }
  let breakpointsValues = Object.values(optionBreakpoints)
  if (!isArrayOfCSSUnits(breakpointsValues)) {
    throw new TypeError(
      'When you call `createResponsiveValues`, `breakpoints` property must contain CSS Units such as `px`, `rem`, `em`, etc and do not mix up string values and number values. Docs: developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units',
    )
  }
  return optionBreakpoints
}

export function extendsBreakpoints(
  defaultBeakpoints: TDefaultBreakpoints,
  queriesBreakpoints: Partial<Record<TRecordKeys, Record<TRecordKeys, any>>> | undefined | null,
) {
  if (!queriesBreakpoints) {
    return defaultBeakpoints
  }
  let currentBreakpoints: Record<string, string> = { ...defaultBeakpoints }
  let queriesBreakpointsKeys = Object.keys(queriesBreakpoints)
  queriesBreakpointsKeys.forEach((key) => {
    currentBreakpoints = { ...queriesBreakpoints[key], ...currentBreakpoints }
  })
  let currentBreakpointsKeys = Object.keys(currentBreakpoints)
  currentBreakpointsKeys.forEach((key) => {
    if (isCSSUnits(key)) {
      currentBreakpoints[key] = key
    }
  })
  return currentBreakpoints
}
