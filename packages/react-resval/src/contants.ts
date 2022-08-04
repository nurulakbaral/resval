export const CSSAbsoluteUnits: readonly string[] = ['cm', 'mm', 'Q', 'in', 'pc', 'pt', 'px']
export const CSSRelativeUnits: readonly string[] = [
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
export const CSSUnits: readonly string[] = [...CSSAbsoluteUnits, ...CSSRelativeUnits]
