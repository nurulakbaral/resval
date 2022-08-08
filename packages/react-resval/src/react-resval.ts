/* eslint-disable prefer-const */
import * as React from 'react'
import type {
  TDefaultBreakpoints,
  TBaseObject,
  TMedia,
  TOptions,
  TBreakpointsTrack,
  TNullable,
  TObject,
  TPrimitive,
  TCSSWidthValues,
} from './types'
import { trackBreakpoints, setBreakpoints, extendsBreakpoints, sortBreakpointsTrack } from './system'

/**
 * @docs Thanks to usehooks-ts.com/react-hook/use-media-query.
 */

export function useMediaQuery<TTypeBreakpointsOptions = TDefaultBreakpoints>(
  queries: TTypeBreakpointsOptions,
  media: TMedia,
) {
  // Notes: Get initial breakpoints
  let [matches, setMatches] = React.useState<Array<TBreakpointsTrack> | false>(getMatches(queries))

  React.useEffect(() => {
    // Notes: Get breakpoints on mount
    let mediaQueryList = Object.values(queries).map((value) => window.matchMedia(`(${media}-width: ${value})`))
    function handleChange() {
      setMatches(getMatches(queries))
    }
    handleChange()

    // Notes: Listen for breakpoints changes
    for (let matchMedia of mediaQueryList) {
      matchMedia.addEventListener('change', handleChange)
    }
    return () => {
      for (let matchMedia of mediaQueryList) {
        matchMedia.removeEventListener('change', handleChange)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function getMatches(queries: TTypeBreakpointsOptions) {
    // Notes: Prevents SSR issues
    if (typeof window !== 'undefined') {
      return Object.entries(queries).map(function ([query, constraintWidth]) {
        return {
          query,
          constraintWidth,
          status: window.matchMedia(`(${media}-width: ${constraintWidth})`).matches,
        }
      })
    }
    return false
  }

  return { breakpointsTrack: matches }
}

export function createResponsiveValues<TTypeBreakpointsOptions extends TBaseObject = TDefaultBreakpoints>(
  options: keyof TTypeBreakpointsOptions extends never ? TOptions<never> : TOptions<TTypeBreakpointsOptions>,
) {
  let defaultBeakpoints: TDefaultBreakpoints = {
    base: '0px',
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '1080px',
    xl: '1280px',
  }
  let { breakpoints: breakpointsOptions, media = 'min' } = options
  let breakpoints = setBreakpoints(defaultBeakpoints, breakpointsOptions)

  return function useResponsiveValues<
    TTypeBreakpointsKeys extends keyof TTypeBreakpointsOptions | TCSSWidthValues,
    TTypeBreakpointValues extends TPrimitive<string> | TPrimitive<number> | TObject | TNullable,
    TTypeBreakpointsQuery extends Partial<Record<TTypeBreakpointsKeys, TTypeBreakpointValues>>,
  >(
    breakpointsQuery: keyof TTypeBreakpointsQuery extends TTypeBreakpointsKeys ? TTypeBreakpointsQuery : never,
  ): TTypeBreakpointsQuery[keyof TTypeBreakpointsQuery] {
    /**
     * @description Since the value is done only on the first render, it is optimized with useMemo.
     */

    let arbitraryBreakpoints = React.useMemo(function () {
      return extendsBreakpoints(breakpointsQuery, breakpoints)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    let { breakpointsTrack } = useMediaQuery(arbitraryBreakpoints, media)
    if (!breakpointsTrack) {
      throw new Error('Window is not defined')
    }
    let sortedBreakpointsTrack = React.useMemo(
      function () {
        return sortBreakpointsTrack(breakpointsTrack as Array<TBreakpointsTrack>)
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [breakpointsTrack],
    )
    let { currentBreakpoints, snapshotBreakpoints } = React.useMemo(
      function () {
        return trackBreakpoints(sortedBreakpointsTrack, breakpointsQuery, media)
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [breakpointsTrack],
    )

    let currentQuery = currentBreakpoints.query as TTypeBreakpointsKeys
    let snapshotQuery = snapshotBreakpoints.query as TTypeBreakpointsKeys
    return breakpointsQuery[currentQuery] || breakpointsQuery[snapshotQuery]
  }
}

export default createResponsiveValues
