/* eslint-disable prefer-const */
import { createResponsiveValues, TDefaultBreakpoints } from '@resval/react-responsive-values'

export function useVx(breakpoints: TDefaultBreakpoints) {
  return createResponsiveValues({
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

  return (
    <div>
      {/**
       *
       * Default Breakpoints (Media: MIN)
       *
       */}

      <h1 data-testid='db-min-first'>{valFirst}</h1>
    </div>
  )
}
