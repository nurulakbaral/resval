/* eslint-disable prefer-const */
import { createResponsiveValues, TDefaultBreakpoints } from '@resval/react-responsive-values'

export function useVxBdMin(breakpoints: TDefaultBreakpoints) {
  return createResponsiveValues({
    media: 'min',
  })(breakpoints)
}

export function useVxBdMax(breakpoints: TDefaultBreakpoints) {
  return createResponsiveValues({
    media: 'max',
  })(breakpoints)
}

export default function TestField() {
  /**
   * Default Breakpoints (Media: MIN)
   */

  let valFirstBdMin = useVxBdMin({
    base: 'val: base',
    xs: 'val: xs',
    sm: 'val: sm',
    md: 'val: md',
    lg: 'val: lg',
    xl: 'val: xl',
  })
  let valSecondBdMin = useVxBdMin({
    base: 'val: base',
    md: 'val: md',
  })
  let valThirdBdMin = useVxBdMin({
    xs: 'val: xs',
    md: 'val: md',
  })
  let valFourthBdMin = useVxBdMin({})

  /**
   * Default Breakpoints (Media: Max)
   */

  let valFirstBdMax = useVxBdMax({
    base: 'val: base',
    xs: 'val: xs',
    sm: 'val: sm',
    md: 'val: md',
    lg: 'val: lg',
    xl: 'val: xl',
  })
  let valSecondBdMax = useVxBdMax({
    base: 'val: base',
    md: 'val: md',
  })
  let valThirdBdMax = useVxBdMax({
    xs: 'val: xs',
    md: 'val: md',
  })
  let valFourthBdMax = useVxBdMax({})

  return (
    <div>
      {/**
       *
       * Default Breakpoints (Media: MIN)
       *
       */}

      <h1 data-testid='db-min-first'>{valFirstBdMin}</h1>
      <h1 data-testid='db-min-second'>{valSecondBdMin}</h1>
      <h1 data-testid='db-min-third'>{valThirdBdMin}</h1>
      <h1 data-testid='db-min-fourth'>{valFourthBdMin}</h1>
      {/**
       *
       * Default Breakpoints (Media: MAX)
       *
       */}

      <h1 data-testid='db-max-first'>{valFirstBdMax}</h1>
      <h1 data-testid='db-max-second'>{valSecondBdMax}</h1>
      <h1 data-testid='db-max-third'>{valThirdBdMax}</h1>
      <h1 data-testid='db-max-fourth'>{valFourthBdMax}</h1>
    </div>
  )
}
