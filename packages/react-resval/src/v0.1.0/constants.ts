import type { TCSSAbsoluteUnits, TCSSRelativeUnits, TDefaultBreakpoints } from './types'

export const CSSAbsoluteUnits: readonly TCSSAbsoluteUnits[] = ['cm', 'mm', 'Q', 'in', 'pc', 'pt', 'px']
export const CSSRelativeUnits: readonly TCSSRelativeUnits[] = [
  'em',
  'ex',
  'ch',
  'rem',
  'lh',
  'rlh',
  'vw',
  'vh',
  'vmin',
  'vmax',
  'vb',
  'vi',
  'svw',
  'svh',
  'lvw',
  'lvh',
  'dvw',
  'dvh',
]
export const CSSUnits: readonly (TCSSAbsoluteUnits | TCSSRelativeUnits)[] = [...CSSAbsoluteUnits, ...CSSRelativeUnits]

export const DefaultBreakpoints: TDefaultBreakpoints = {
  base: '0px',
  xs: '320px',
  sm: '576px',
  md: '768px',
  lg: '1080px',
  xl: '1280px',
}
