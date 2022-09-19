/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-function */

import * as React from 'react'
import type { TOptions, TPrimitive } from './types'
import { extendsBreakpoints, setBreakpoints } from './system'
import { DefaultBreakpoints } from './constants'

function useMediaQuery() {}

export function createResponsiveValues<TTypeOptionBreakpoints extends Record<string, string>>(
  options: TOptions<TTypeOptionBreakpoints>,
) {
  let { breakpoints: breakpointsOptions, media = 'min' } = options
  let breakpoints = setBreakpoints(DefaultBreakpoints, breakpointsOptions)

  return function useResponsiveValues<
    TTypeQueriesBreakpoints extends Record<string, Partial<Record<keyof TTypeOptionBreakpoints, Values>>>,
    Values extends TPrimitive<string> | TPrimitive<number> | {} | null | undefined,
  >(
    queriesBreakpoints: TTypeQueriesBreakpoints,
  ): {
    /**
     * TODO! Write docs for this types, what is happening here?
     */
    [K in keyof TTypeQueriesBreakpoints]: TTypeQueriesBreakpoints[K][Exclude<
      keyof TTypeOptionBreakpoints,
      Exclude<keyof TTypeOptionBreakpoints, keyof TTypeQueriesBreakpoints[K]>
    >]
  } {
    let arbitraryBreakpoints = extendsBreakpoints(breakpoints, queriesBreakpoints)
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
