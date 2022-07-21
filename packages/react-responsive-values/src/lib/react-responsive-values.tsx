/* eslint-disable prefer-const */
import * as React from 'react'

/**
 *
 * Types
 *
 */

export type TBreakpointsTrack = {
  query: string
  constraintWidth: string
  status: boolean
}

export type TBaseObject = Record<string, string>

export type TMedia = 'min' | 'max'

export type TDefaultBreakpoints = {
  base?: string
  xs?: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
}

export type TOptions<TTypeBreakpointsOptions = TDefaultBreakpoints> = {
  breakpoints?: TTypeBreakpointsOptions
  media: TMedia
}

/**
 *
 * Utilities
 *
 */

export function trackBreakpoints<TTypeBreakpointTrack extends Array<TBreakpointsTrack>, TTypeBreakpointsQuery>(
  breakpointsTrack: TTypeBreakpointTrack,
  breakpointsQuery: TTypeBreakpointsQuery,
  media: TMedia,
): {
  currentBreakpoints: TBreakpointsTrack
  snapshotBreakpoints: TBreakpointsTrack
} {
  let initBreakpoints = {
    query: '',
    constraintWidth: '',
    status: false,
  }
  let isCurrentBreakpointsFound = false
  let isQueryDefined: TTypeBreakpointsQuery[keyof TTypeBreakpointsQuery] | string = ''
  let currentBreakpoints: TBreakpointsTrack = { ...initBreakpoints }
  let snapshotBreakpoints: TBreakpointsTrack = { ...initBreakpoints }
  let idx = media === 'min' ? breakpointsTrack.length - 1 : 0

  /**
   * @description Track the breakpoints and return the current breakpoints.
   */

  for (let i = idx; media === 'min' ? i >= 0 : i < breakpointsTrack.length; media === 'min' ? i-- : i++) {
    isQueryDefined = breakpointsQuery[breakpointsTrack[i].query as keyof TTypeBreakpointsQuery]
    if (breakpointsTrack[i].status && !isCurrentBreakpointsFound) {
      currentBreakpoints = { ...breakpointsTrack[i] }
      isCurrentBreakpointsFound = true
    }
    if (breakpointsTrack[i].status && isQueryDefined) {
      snapshotBreakpoints = { ...breakpointsTrack[i] }
      break
    }
  }

  return {
    currentBreakpoints,
    snapshotBreakpoints,
  }
}

function isEmptyObject<TTypeObject extends TBaseObject>(obj: TTypeObject) {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

/**
 * @description Use default breakpoints if option breakpoints is empty.
 */

function setBreakpoints<TTypeBreakpointsOptions extends TBaseObject>(
  defaultBeakpoints: TDefaultBreakpoints,
  optionBreakpoints: TTypeBreakpointsOptions | undefined,
) {
  if (typeof optionBreakpoints === 'undefined' || isEmptyObject(optionBreakpoints)) {
    return defaultBeakpoints
  }

  return optionBreakpoints
}

/**
 *
 * Core
 *
 */

/**
 * @docs Thanks to usehooks-ts.com/react-hook/use-media-query.
 */

export function useMediaQuery(queries: TBaseObject | TDefaultBreakpoints, media: TMedia) {
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

  function getMatches(queries: TBaseObject | TDefaultBreakpoints) {
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

  return function useResponsiveValue(breakpointsQuery: Partial<Record<keyof TTypeBreakpointsOptions, string>>) {
    let { breakpointsTrack } = useMediaQuery(breakpoints, media) as { breakpointsTrack: Array<TBreakpointsTrack> }
    let { currentBreakpoints, snapshotBreakpoints } = trackBreakpoints(breakpointsTrack, breakpointsQuery, media)
    let currentQuery = currentBreakpoints.query
    let snapshotQuery = snapshotBreakpoints.query

    return breakpointsQuery[currentQuery] || breakpointsQuery[snapshotQuery]
  }
}

export default createResponsiveValues
