/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-function */

import * as React from 'react'
import type { TOptions } from './types'

function useMediaQuery() {}

export function createResponsiveValues<TTypeBreakpointsOption extends Record<string, string>>(
  options: TOptions<TTypeBreakpointsOption>,
) {}

export default createResponsiveValues

/**
 *
 * Assert for types testing.
 *
 */

const useVx = createResponsiveValues({
  breakpoints: {
    base: '100px',
  },
  media: 'min',
})
