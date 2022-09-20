/* eslint-disable prefer-const */

import type { TBreakpointsDefault, TRecordKeys } from './types'
import { isArrayOfCSSUnits, isEmptyObject, isObject, isCSSUnits } from './utils'

export function setBreakpoints(
  breakpointsDefault: TBreakpointsDefault,
  breakpointsOption: Record<TRecordKeys, string> | undefined | null,
) {
  if (!breakpointsOption) {
    return breakpointsDefault
  }
  if (isEmptyObject(breakpointsOption) || !isObject(breakpointsOption)) {
    return breakpointsDefault
  }
  let breakpointsValues = Object.values(breakpointsOption)
  if (!isArrayOfCSSUnits(breakpointsValues)) {
    throw new TypeError(
      'When you call `createResponsiveValues`, `breakpoints` property must contain CSS Units such as `px`, `rem`, `em`, etc and do not mix up string values and number values. Docs: developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units',
    )
  }
  return breakpointsOption
}

export function extendsBreakpoints(
  breakpointsDefault: TBreakpointsDefault,
  breakpointsQueries: Partial<Record<TRecordKeys, Record<TRecordKeys, any>>> | undefined | null,
) {
  if (!breakpointsQueries) {
    return breakpointsDefault
  }
  let breakpointsCurrent: Record<string, string> = { ...breakpointsDefault }
  let breakpointsQueriesKeys = Object.keys(breakpointsQueries)
  breakpointsQueriesKeys.forEach((key) => {
    breakpointsCurrent = { ...breakpointsQueries[key], ...breakpointsCurrent }
  })
  let breakpointsCurrentKeys = Object.keys(breakpointsCurrent)
  breakpointsCurrentKeys.forEach((key) => {
    if (isCSSUnits(key)) {
      breakpointsCurrent[key] = key
    }
  })
  return breakpointsCurrent
}
