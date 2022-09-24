/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */

import type { TBreakpointsDefault, TRecordKeys, TBreakpointsTrack, TMedia } from './types'
import { isArrayOfCSSUnits, isEmptyObject, isObject, isCSSUnits, isBreakpointsHaveDiffCSSUnits } from './utils'

export function setBreakpoints(
  breakpointsDefault: TBreakpointsDefault,
  breakpointsOption: Record<TRecordKeys, string> | undefined | null,
) {
  if (!breakpointsOption) {
    return breakpointsDefault
  }
  if (!isObject(breakpointsOption)) {
    throw new TypeError('Breakpoints option must be an object.')
  }
  if (isEmptyObject(breakpointsOption)) {
    return breakpointsDefault
  }
  let breakpointsValues = Object.values(breakpointsOption)
  if (!isArrayOfCSSUnits(breakpointsValues)) {
    throw new TypeError(
      'When you initialize `createResponsiveValues`, `breakpoints` property must contain CSS Units such as `px`, `rem`, `em`, etc (case-sensitive). and do not mix up string values and number values OR . Docs: developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units',
    )
  }
  if (isBreakpointsHaveDiffCSSUnits(breakpointsValues)) {
    throw new TypeError(
      `Do not use different CSS Unit values or combine them. Suppose using '100px' and '200rem'. But use the same CSS Units, if you want to use 'px' use 'px' for all.`,
    )
  }
  return breakpointsOption
}

export function extendsBreakpoints(
  breakpoints: Record<TRecordKeys, string>,
  breakpointsQueries: Partial<Record<TRecordKeys, Record<TRecordKeys, any>>> | undefined | null,
) {
  if (!breakpointsQueries) {
    return breakpoints
  }
  let breakpointsCurrent: Record<string, string> = { ...breakpoints }
  let breakpointsQueriesKeys = Object.keys(breakpointsQueries)
  breakpointsQueriesKeys.forEach((key) => {
    breakpointsCurrent = { ...breakpointsQueries[key], ...breakpointsCurrent }
  })
  let breakpointsCurrentKeys = Object.keys(breakpointsCurrent)
  breakpointsCurrentKeys.forEach((key) => {
    /**
     * `isCSSUnits()` is a function just only for `breakpointsQueries`.
     */
    if (isCSSUnits(key)) {
      breakpointsCurrent[key] = key
    } else {
      if (!breakpoints[key]) {
        throw new TypeError(
          `The key \`${key}\` is not valid CSS Units. Custom breakpoints must be a valid CSS Units such as \`px\`, \`rem\`, \`em\`, etc.`,
        )
      }
    }
  })
  return breakpointsCurrent
}

export function sortBreakpointsTrack(breakpointsTrack: TBreakpointsTrack[]): TBreakpointsTrack[] {
  /**
   * Sort `breakpointsTrack` by `constraintWidth` property.
   */
  return breakpointsTrack.sort((breakpointsTrackA, breakpointsTrackB) => {
    let constraintWidthA = Number(breakpointsTrackA.constraintWidth.replace(/[^0-9.]/g, ''))
    let constraintWidthB = Number(breakpointsTrackB.constraintWidth.replace(/[^0-9.]/g, ''))
    return constraintWidthA - constraintWidthB
  })
}

export function trackBreakpoints(
  breakpointsTrack: TBreakpointsTrack[],
  media: TMedia,
): {
  breakpointsCurrent: TBreakpointsTrack
  breakpointsClosest: string[]
} {
  let isCurrentBreakpointsFound = false
  let breakpointsCurrent: TBreakpointsTrack = { query: '', constraintWidth: '', status: false }
  let breakpointsClosest: string[] = []
  let idx = media === 'min' ? breakpointsTrack.length - 1 : 0

  /**
   * @description Track the breakpoints and return the current breakpoints.
   */

  for (let i = idx; media === 'min' ? i >= 0 : i < breakpointsTrack.length; media === 'min' ? i-- : i++) {
    if (breakpointsTrack[i].status && isCurrentBreakpointsFound) {
      /**
       * If media is min, `breakpointsClosest` then the order will be descending.
       * Example: ['600px', '500px', '400px'] -> ['md', 'sm', 'xs']
       * If media is max, `breakpointsClosest` then the order will be ascending.
       * Example: ['400px', '500px', '600px'] -> ['xs', 'sm', 'md']
       */
      breakpointsClosest.push(breakpointsTrack[i].query)
    }
    if (breakpointsTrack[i].status && !isCurrentBreakpointsFound) {
      breakpointsCurrent = { ...breakpointsTrack[i] }
      isCurrentBreakpointsFound = true
    }
  }

  return {
    breakpointsCurrent,
    breakpointsClosest,
  }
}
