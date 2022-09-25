/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-function */

import type { TOptions, TRecordKeys } from './types'
import { extendsBreakpoints, setBreakpoints, sortBreakpointsTrack, trackBreakpoints, setCurrentValue } from './system'
import { BreakpointsDefault } from './constants'
import { useInternalMediaQuery } from './hooks'

export function createResponsiveValues<TTypeBreakpointsOption extends Record<string, string>>(
  options: TOptions<TTypeBreakpointsOption>,
) {
  let { breakpoints: breakpointsOption, media = 'min' } = options
  let breakpoints = setBreakpoints(BreakpointsDefault, breakpointsOption)

  return function useResponsiveValues<
    TTypeBreakpointsQueries extends Record<TRecordKeys, Partial<Record<keyof TTypeBreakpointsOption, any>>>,
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

    let breakpointsArbitrary = extendsBreakpoints(breakpoints, breakpointsQueries)

    /**
     * `breakpointsArbitrary` and `breakpointsTrack` variable was guaranteed to be sanitized.
     * `breakpointsArbitrary` and `breakpointsTrack` will always return an object whose `constraintWidth` property has the same css unit value.
     */

    let { breakpointsTrack } = useInternalMediaQuery(breakpointsArbitrary, media)

    /**
     * Prerendering from SSR
     */

    if (!breakpointsTrack) {
      return undefined as any
    }

    let sortedBreakpointsTrack = sortBreakpointsTrack(breakpointsTrack)
    let { breakpointsCurrent, breakpointsClosest } = trackBreakpoints(sortedBreakpointsTrack, media)
    let currentValue = setCurrentValue(
      breakpointsQueries,
      breakpointsCurrent,
      breakpointsClosest,
    ) as TTypeReturnBreakpointsQueries

    return currentValue
  }
}

export default createResponsiveValues

/**
 *
 * Types Testing Purpose!
 * Assert for types testing.
 *
 */

// const useVx = createResponsiveValues({
//   breakpoints: {
//     base: '0px',
//     xs: '320px',
//     sm: '576px',
//     md: '768px',
//     lg: '1080px',
//     xl: '1280px',
//   },
//   media: 'min',
// })

// const utilityValues = {
//   fontSize: {
//     base: '12px',
//     xl: '24px',
//   } as const,
//   color: {
//     base: 'red',
//     '600px': 'blue',
//     xl: 'green',
//   } as const,
// }

// // eslint-disable-next-line react-hooks/rules-of-hooks
// const { fontSize, color } = useVx(utilityValues)

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// const fontSizeProp: '12px' | '24px' | undefined | null = fontSize
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// const colorProp: 'red' | 'green' | 'blue' = color
