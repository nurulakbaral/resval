/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */

// dev
// import { createResponsiveValues } from '@resval/react-responsive-values'
// prod
import { createResponsiveValues } from '../../../../dist/packages/react-resval'

const vx = createResponsiveValues({
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
    md: 'salmon',
    lg: 'aqua',
    xl: 'gray',
  }
}

utilityValues['value'] = {
  base: 'base',
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
}

export function useVx() {
  return vx(utilityValues)
}
