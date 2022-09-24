/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-function */

import * as React from 'react'
import type { TOptions, TPrimitive } from './types'
import { extendsBreakpoints, setBreakpoints, sortBreakpointsTrack, trackBreakpoints, setCurrentValue } from './system'
import { BreakpointsDefault } from './constants'
import { useInternalMediaQuery } from './hooks'

export function createResponsiveValues<TTypeBreakpointsOption extends Record<string, string>>(
  options: TOptions<TTypeBreakpointsOption>,
) {
  let { breakpoints: breakpointsOption, media = 'min' } = options
  let breakpoints = setBreakpoints(BreakpointsDefault, breakpointsOption)

  return function useResponsiveValues<
    TTypeBreakpointsQueries extends Record<
      string,
      Partial<Record<keyof TTypeBreakpointsOption | TPrimitive<string>, TTypeValues>>
    >,
    TTypeValues extends TPrimitive<string> | TPrimitive<number> | {} | null | undefined,
  >(
    breakpointsQueries: TTypeBreakpointsQueries,
  ): {
    /**
     * TODO! Write docs for this types, what is happening here?
     */
    [Param in keyof TTypeBreakpointsQueries]: TTypeBreakpointsQueries[Param][Exclude<
      keyof TTypeBreakpointsOption | keyof TTypeBreakpointsQueries[Param],
      Exclude<keyof TTypeBreakpointsOption | keyof TTypeBreakpointsQueries[Param], keyof TTypeBreakpointsQueries[Param]>
    >]
  } {
    /**
     * `breakpoints` variable was guaranteed to be sanitized.
     * `breakpoints` will return an object with keys and appropriate value (CSS Units Rule).
     */
    let breakpointsArbitrary = extendsBreakpoints(breakpoints, breakpointsQueries)
    /**
     * `breakpointsArbitrary` and `breakpointsTrack` variable was guaranteed to be sanitized.
     * `breakpointsArbitrary` and `breakpointsTrack` will always return an object whose `constraintWidth` property has the same css unit value.
     */
    let { breakpointsTrack } = useInternalMediaQuery(breakpointsArbitrary, media)
    // Notes: Prerendering from SSR
    if (!breakpointsTrack) {
      return undefined as any
    }
    let sortedBreakpointsTrack = sortBreakpointsTrack(breakpointsTrack)
    let { breakpointsCurrent, breakpointsClosest } = trackBreakpoints(sortedBreakpointsTrack, media)
    let currentValue = setCurrentValue(breakpointsQueries, breakpointsCurrent, breakpointsClosest)

    return currentValue as any
  }
}

export default createResponsiveValues

/**
 *
 * Types Testing Purpose!
 * Assert for types testing.
 *
 */

const useVx = createResponsiveValues({
  breakpoints: {
    base: '0px',
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '1080px',
    xl: '1280px',
  },
  media: 'min',
})

// eslint-disable-next-line react-hooks/rules-of-hooks
const { fontSize, color } = useVx({
  fontSize: {
    base: '12px',
    xl: '24px',
  },
  color: {
    base: 'red',
    '600px': 'blue',
    xl: 'green',
  },
})

const fontSizeProp: '12px' | '24px' | undefined | null = fontSize
