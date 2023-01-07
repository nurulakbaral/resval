/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */

import { latest } from '@resval/react-responsive-values'

const vx = latest.createResponsiveValues({
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

let utilityValues: any = {}

for (let i = 0; i < 100_000; i++) {
  utilityValues[`color${i}`] = {
    base: 'red',
    xs: 'green',
    sm: 'blue',
    md: 'aqua',
    lg: 'salmon',
    xl: 'black',
  }
}

export function useVxV1() {
  return vx(utilityValues)
}
