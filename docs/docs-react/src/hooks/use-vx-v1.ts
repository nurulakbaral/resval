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

for (let i = 0; i < 10_000; i++) {
  utilityValues[`fontSize${i}`] = {
    base: '12px',
    md: '14px',
  } as const
}

export function useVxV1() {
  return vx({
    ...utilityValues,
  })
}
