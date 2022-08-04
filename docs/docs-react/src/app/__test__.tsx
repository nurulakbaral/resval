/* eslint-disable prefer-const */
import { createResponsiveValues, TDefaultBreakpoints } from '@resval/react-responsive-values'

export function useVx(breakpoints: TDefaultBreakpoints) {
  return createResponsiveValues({
    breakpoints: {
      base: 0,
      xs: '320',
      sm: 576,
      md: '768',
      lg: 1080,
      xl: '1280',
    },
    media: 'min',
  })(breakpoints)
}

export default function TestField() {
  /**
   * Default Breakpoints (Media: MIN)
   */
  let valFirst = useVx({
    base: 'val: base',
    xs: 'val: xs',
    sm: 'val: sm',
    md: 'val: md',
    lg: 'val: lg',
    xl: 'val: xl',
  })
  let valSecond = useVx({
    base: 'val: base',
    md: 'val: md',
  })
  let valThird = useVx({
    xs: 'val: xs',
    md: 'val: md',
  })
  let valFourth = useVx({})

  return (
    <div>
      {/**
       *
       * Default Breakpoints (Media: MIN)
       *
       */}

      <h1 data-testid='db-min-first'>{valFirst}</h1>
      <h1 data-testid='db-min-second'>{valSecond}</h1>
      <h1 data-testid='db-min-third'>{valThird}</h1>
      <h1 data-testid='db-min-fourth'>{valFourth}</h1>
    </div>
  )
}
