/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
// import { createResponsiveValues } from '@resval/react-responsive-values'
import { createResponsiveValues } from '../../../../dist/packages/react-resval'

export const useVxDbMin = createResponsiveValues({
  media: 'min',
})

export const useVxDbMax = createResponsiveValues({
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

const customBreakpointsMax = {
  base: 0,
  smallMobile: 320,
  mediumMobile: 576,
  largeMobile: 768,
  tablet: 1080,
  desktop: 1280,
}

export const useVxCbMax = createResponsiveValues({
  breakpoints: { ...customBreakpointsMax },
  media: 'max',
})

const formatValue = (value: any) => {
  if (typeof value === 'string' || typeof value === 'bigint' || typeof value === 'function') return `${value}`
  return `${JSON.stringify(value)}`
}

export default function TestField() {
  /**
   * Default Breakpoints (Media: MIN)
   */

  const valFirstDbMin = useVxDbMin({
    base: false,
    xs: true,
    sm: null,
    md: undefined,
    lg: 100,
    xl: {},
  })
  const valSecondDbMin = useVxDbMin({
    base: 'val: base',
    md: () => {},
  })
  const valThirdDbMin = useVxDbMin({
    xs: 'val: xs',
    md: BigInt(9007199254740991),
  })
  const valFourthDbMin = useVxDbMin({})

  /**
   * Default Breakpoints (Media: Max)
   */

  const valFirstDbMax = useVxDbMax({
    base: 'val: base',
    xs: 'val: xs',
    sm: 'val: sm',
    md: 'val: md',
    lg: 'val: lg',
    xl: 'val: xl',
  })
  const valSecondDbMax = useVxDbMax({
    base: 'val: base',
    md: 'val: md',
  })
  const valThirdDbMax = useVxDbMax({
    xs: 'val: xs',
    md: 'val: md',
  })
  const valFourthDbMax = useVxDbMax({})

  /**
   * Custom Breakpoints (Media: MIN)
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

  /**
   * Custom Breakpoints (Media: MAX)
   */

  const valFirstCbMax = useVxCbMax({
    base: 'val: base',
    smallMobile: 'val: smallMobile',
    mediumMobile: 'val: mediumMobile',
    largeMobile: 'val: largeMobile',
    tablet: 'val: tablet',
    desktop: 'val: desktop',
  })
  const valSecondCbMax = useVxCbMax({
    base: 'val: base',
    largeMobile: 'val: largeMobile',
  })
  const valThirdCbMax = useVxCbMax({
    smallMobile: 'val: smallMobile',
    largeMobile: 'val: largeMobile',
  })
  const valFourthCbMax = useVxCbMax({
    base: 'val: base',
    smallMobile: 'val: smallMobile',
    mediumMobile: 'val: mediumMobile',
    largeMobile: 'val: largeMobile',
    tablet: 'val: tablet',
    desktop: 'val: desktop',
    '900px': 'val: 900px',
    '600px': 'val: 600px',
  })
  const valFifthCbMax = useVxCbMax({
    base: 'val: base',
    '900px': 'val: 900px',
    '600px': 'val: 600px',
  })
  const valSixthCbMax = useVxCbMax({
    '900px': 'val: 900px',
    '600px': 'val: 600px',
  })
  const valSeventhCbMax = useVxCbMax({})

  return (
    <div>
      {/**
       *
       * Default Breakpoints (Media: MIN)
       *
       */}

      <h1 data-testid='db-min-first'>{formatValue(valFirstDbMin)}</h1>
      <h1 data-testid='db-min-second'>{formatValue(valSecondDbMin)}</h1>
      <h1 data-testid='db-min-third'>{formatValue(valThirdDbMin)}</h1>
      <h1 data-testid='db-min-fourth'>{formatValue(valFourthDbMin)}</h1>

      {/**
       *
       * Default Breakpoints (Media: MAX)
       *
       */}

      <h1 data-testid='db-max-first'>{formatValue(valFirstDbMax)}</h1>
      <h1 data-testid='db-max-second'>{formatValue(valSecondDbMax)}</h1>
      <h1 data-testid='db-max-third'>{formatValue(valThirdDbMax)}</h1>
      <h1 data-testid='db-max-fourth'>{formatValue(valFourthDbMax)}</h1>

      {/**
       *
       * Custom Breakpoints (Media: MIN)
       *
       */}

      <h1 data-testid='cb-min-first'>{formatValue(valFirstCbMin)}</h1>
      <h1 data-testid='cb-min-second'>{formatValue(valSecondCbMin)}</h1>
      <h1 data-testid='cb-min-third'>{formatValue(valThirdCbMin)}</h1>
      <h1 data-testid='cb-min-fourth'>{formatValue(valFourthCbMin)}</h1>
      <h1 data-testid='cb-min-fifth'>{formatValue(valFifthCbMin)}</h1>
      <h1 data-testid='cb-min-sixth'>{formatValue(valSixthCbMin)}</h1>
      <h1 data-testid='cb-min-seventh'>{formatValue(valSeventhCbMin)}</h1>

      {/**
       *
       * Custom Breakpoints (Media: MAX)
       *
       */}

      <h1 data-testid='cb-max-first'>{formatValue(valFirstCbMax)}</h1>
      <h1 data-testid='cb-max-second'>{formatValue(valSecondCbMax)}</h1>
      <h1 data-testid='cb-max-third'>{formatValue(valThirdCbMax)}</h1>
      <h1 data-testid='cb-max-fourth'>{formatValue(valFourthCbMax)}</h1>
      <h1 data-testid='cb-max-fifth'>{formatValue(valFifthCbMax)}</h1>
      <h1 data-testid='cb-max-sixth'>{formatValue(valSixthCbMax)}</h1>
      <h1 data-testid='cb-max-seventh'>{formatValue(valSeventhCbMax)}</h1>
    </div>
  )
}
