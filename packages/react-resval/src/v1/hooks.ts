/* eslint-disable prefer-const */

import * as React from 'react'
import type { TBreakpointsDefault, TMedia, TBreakpointsTrack } from './types'

export function useInternalMediaQuery<TTypeBreakpointsOption extends Record<string, string> = TBreakpointsDefault>(
  queries: TTypeBreakpointsOption,
  media: TMedia,
) {
  // Notes: Get initial breakpoints
  let [matches, setMatches] = React.useState<Array<TBreakpointsTrack> | false | undefined>(undefined)

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

  function getMatches(queries: TTypeBreakpointsOption) {
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
