/* eslint-disable prefer-const */
import { createResponsiveValues } from '@resval/react-responsive-values'

export const useVxBdMin = createResponsiveValues({
  media: 'min',
})

export const useVxBdMax = createResponsiveValues({
  media: 'max',
})

const customBreakpointsMin = {
  base: '0px',
  smallMobile: '320px',
  mediumMobile: '576px',
  largeMobile: '768px',
  tablet: '1080px',
  desktop: '1280px',
}

export const useVxCbMin = createResponsiveValues({
  breakpoints: { ...customBreakpointsMin },
  media: 'min',
})

export default function TestField() {
  /**
   * Default Breakpoints (Media: MIN)
   */

  const valFirstBdMin = useVxBdMin({
    base: 'val: base',
    xs: 'val: xs',
    sm: 'val: sm',
    md: 'val: md',
    lg: 'val: lg',
    xl: 'val: xl',
  })
  const valSecondBdMin = useVxBdMin({
    base: 'val: base',
    md: 'val: md',
  })
  const valThirdBdMin = useVxBdMin({
    xs: 'val: xs',
    md: 'val: md',
  })
  const valFourthBdMin = useVxBdMin({})

  /**
   * Default Breakpoints (Media: Max)
   */

  const valFirstBdMax = useVxBdMax({
    base: 'val: base',
    xs: 'val: xs',
    sm: 'val: sm',
    md: 'val: md',
    lg: 'val: lg',
    xl: 'val: xl',
  })
  const valSecondBdMax = useVxBdMax({
    base: 'val: base',
    md: 'val: md',
  })
  const valThirdBdMax = useVxBdMax({
    xs: 'val: xs',
    md: 'val: md',
  })
  const valFourthBdMax = useVxBdMax({})

  /**
   * Default Breakpoints (Media: MIN)
   */

  const valFirstCbMin = useVxCbMin({
    base: 'val: base',
    smallMobile: 'val: smallMobile',
    mediumMobile: 'val: mediumMobile',
    largeMobile: 'val: largeMobile',
    tablet: 'val: tablet',
    desktop: 'val: desktop',
  })
  const valSecondCbMin = useVxCbMin({
    base: 'val: base',
    largeMobile: 'val: largeMobile',
  })
  const valThirdCbMin = useVxCbMin({
    smallMobile: 'val: smallMobile',
    largeMobile: 'val: largeMobile',
  })
  const valFourthCbMin = useVxCbMin({
    base: 'val: base',
    smallMobile: 'val: smallMobile',
    mediumMobile: 'val: mediumMobile',
    largeMobile: 'val: largeMobile',
    tablet: 'val: tablet',
    desktop: 'val: desktop',
    '900px': 'val: 900px',
    '600px': 'val: 600px',
  })
  const valFifthCbMin = useVxCbMin({
    base: 'val: base',
    '900px': 'val: 900px',
    '600px': 'val: 600px',
  })
  const valSixthCbMin = useVxCbMin({
    '900px': 'val: 900px',
    '600px': 'val: 600px',
  })
  const valSeventhCbMin = useVxCbMin({})

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

      {/**
       *
       * Custom Breakpoints (Media: Min)
       *
       */}

      <h1 data-testid='cb-min-first'>{valFirstCbMin}</h1>
      <h1 data-testid='cb-min-second'>{valSecondCbMin}</h1>
      <h1 data-testid='cb-min-third'>{valThirdCbMin}</h1>
      <h1 data-testid='cb-min-fourth'>{valFourthCbMin}</h1>
      <h1 data-testid='cb-min-fifth'>{valFifthCbMin}</h1>
      <h1 data-testid='cb-min-sixth'>{valSixthCbMin}</h1>
      <h1 data-testid='cb-min-seventh'>{valSeventhCbMin}</h1>
    </div>
  )
}
