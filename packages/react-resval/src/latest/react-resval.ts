/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-function */

import * as React from 'react'
import type { TOptions, TRecordKeys, TNarrowable } from './types'
import { extendsBreakpoints, setBreakpoints, sortBreakpointsTrack, trackBreakpoints, setCurrentValue } from './system'
import { BreakpointsDefault } from './constants'
import { useInternalMediaQuery } from './hooks'

export function createResponsiveValues<TTypeBreakpointsOption extends Record<string, string>>(
  options: TOptions<TTypeBreakpointsOption>,
) {
  /**
   * Cache the values for every viewport!
   */
  const cache = new Map()
  let { breakpoints: breakpointsOption, media = 'min' } = options
  let breakpoints = setBreakpoints(BreakpointsDefault, breakpointsOption)

  return function useResponsiveValues<
    TTypePrimitives extends TNarrowable,
    TTypeObject extends { [K: TRecordKeys]: TTypePrimitives | TTypeObject | [] | {} },
    TTypeBreakpointsQueries extends Record<
      TRecordKeys,
      /**
       * TTypeBreakpointsOption will narrow down to `base`, `xs`, etc.
       * `string` will narrow down to `600px`, `800px`, etc.
       */
      Partial<Record<keyof TTypeBreakpointsOption | string, TTypePrimitives | TTypeObject>>
    >,
    /**
     * TTypeReturnBreakpointsQueries
     *
     * Let's say TTypeBreakpointsQueries is :
     * {
     *  fontSize: { base: '12px', xl: '24px' },
     *  color: { base: 'red', '600px': 'blue', xl: 'green' }
     * }
     *
     * So,
     * `keyof TTypeBreakpointsQueries` is 'fontSize' OR 'color' (Param)
     * `keyof TTypeBreakpointsQueries[Param]` is 'base' | 'xl' OR 'base' | '600px' | 'xl'
     *
     */

    TTypeReturnBreakpointsQueries = {
      [Param in keyof TTypeBreakpointsQueries]: TTypeBreakpointsQueries[Param][keyof TTypeBreakpointsQueries[Param]]
    },
  >(breakpointsQueries: TTypeBreakpointsQueries): TTypeReturnBreakpointsQueries {
    /**
     * `breakpoints` variable was guaranteed to be sanitized.
     * `breakpoints` will return an object with keys and appropriate value (CSS Units Rule).
     */

    let breakpointsArbitrary = React.useMemo(() => {
      return extendsBreakpoints(breakpoints, breakpointsQueries)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /**
     * `breakpointsArbitrary` and `breakpointsTrack` variable was guaranteed to be sanitized.
     * `breakpointsArbitrary` and `breakpointsTrack` will always return an object whose `constraintWidth` property has the same css unit value.
     */

    let { breakpointsTrack } = useInternalMediaQuery(breakpointsArbitrary, media)

    let sortedBreakpointsTrack = React.useMemo(() => {
      if (!breakpointsTrack) {
        return {} as any
      }

      return sortBreakpointsTrack(breakpointsTrack)
    }, [breakpointsTrack])

    let { breakpointsCurrent, breakpointsClosest } = React.useMemo(() => {
      if (!breakpointsTrack) {
        return {} as any
      }

      return trackBreakpoints(sortedBreakpointsTrack, media)
    }, [breakpointsTrack, sortedBreakpointsTrack])

    if (breakpointsCurrent) {
      let currentQuery = breakpointsCurrent.query
      if (cache.has(currentQuery)) {
        return cache.get(currentQuery)
      }
      let currentValue = setCurrentValue(breakpointsQueries, breakpointsCurrent, breakpointsClosest)
      cache.set(currentQuery, currentValue)
      return currentValue
    } else {
      return {} as any
    }
  }
}

export default createResponsiveValues
