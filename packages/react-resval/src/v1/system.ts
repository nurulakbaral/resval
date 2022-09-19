/* eslint-disable prefer-const */

import type { TDefaultBreakpoints } from './types'
import { isArrayOfCSSUnits, isEmptyObject, isObject } from './utils'

export function setBreakpoints(
  defaultBreakpoints: TDefaultBreakpoints,
  optionBreakpoints: Record<string | number | symbol, string> | undefined | null,
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
