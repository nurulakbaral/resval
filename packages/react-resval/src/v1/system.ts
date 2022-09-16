/* eslint-disable prefer-const */

import type { TDefaultBreakpoints } from './types'
import { isArrayOfNumber, isArrayOfCSSUnits, isEmptyObject, isObject } from './utils'

export function setBreakpoints(
  defaultBreakpoints: TDefaultBreakpoints,
  optionBreakpoints: Record<string, string> | undefined | null,
) {
  if (!optionBreakpoints) {
    return defaultBreakpoints
  }
  if (isEmptyObject(optionBreakpoints) || !isObject(optionBreakpoints)) {
    return defaultBreakpoints
  }
  let breakpointsValues = Object.values(optionBreakpoints)
  if (isArrayOfNumber(breakpointsValues)) {
    let optionBreakpointsMapped: Record<string, string> = {}
    Object.entries(optionBreakpoints).forEach(([key, value]) => {
      optionBreakpointsMapped[key] = `${value}px`
    })
    return optionBreakpointsMapped
  }
  if (!isArrayOfCSSUnits(breakpointsValues)) {
    throw new Error(
      'When you call `createResponsiveValues`, `breakpoints` property must contain CSS Units such as `px`, `rem`, `em`, etc and do not mix up string values and number values. Docs: developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units',
    )
  }
  return optionBreakpoints
}
