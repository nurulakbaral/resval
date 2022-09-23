/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-function */

import * as React from 'react'
import type { TOptions, TPrimitive } from './types'
import { extendsBreakpoints, setBreakpoints } from './system'
import { BreakpointsDefault } from './constants'
import { useInternalMediaQuery } from './hooks'

export function createResponsiveValues<TTypeBreakpointsOption extends Record<string, string>>(
  options: TOptions<TTypeBreakpointsOption>,
) {
  let { breakpoints: breakpointsOption, media = 'min' } = options
  let breakpoints = setBreakpoints(BreakpointsDefault, breakpointsOption)

  return function useResponsiveValues<
    TTypeBreakpointsQueries extends Record<string, Partial<Record<keyof TTypeBreakpointsOption, TTypeValues>>>,
    TTypeValues extends TPrimitive<string> | TPrimitive<number> | {} | null | undefined,
  >(
    breakpointsQueries: TTypeBreakpointsQueries,
  ): {
    /**
     * TODO! Write docs for this types, what is happening here?
     */
    [K in keyof TTypeBreakpointsQueries]: TTypeBreakpointsQueries[K][Exclude<
      keyof TTypeBreakpointsOption,
      Exclude<keyof TTypeBreakpointsOption, keyof TTypeBreakpointsQueries[K]>
    >]
  } {
    /**
     * `breakpoints` variable was guaranteed to be sanitized.
     * `breakpoints` will return an object with keys and appropriate value (CSS Units Rule).
     */
    let breakpointsArbitrary = extendsBreakpoints(breakpoints, breakpointsQueries)
    /**
     * `breakpointsArbitrary` variable was guaranteed to be sanitized.
     * `breakpointsArbitrary` will return an object with keys and appropriate value (CSS Units Rule).
     */
    let { breakpointsTrack } = useInternalMediaQuery(breakpointsArbitrary, media)
    return {} as any
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
const { fontSize } = useVx({
  fontSize: {
    base: '12px',
    xs: '24px',
  },
})

const fontSizeProp: '12px' | '24px' | undefined | null = fontSize
