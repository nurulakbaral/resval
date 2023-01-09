/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  setBreakpoints,
  extendsBreakpoints,
  sortBreakpointsTrack,
  trackBreakpoints,
  setCurrentValue,
} from '../../src/latest/system'
import { BreakpointsDefault, CSSUnits } from '../../src/constants'
import { TBreakpointsTrack } from '../../src/latest/types'

describe('setBreakpoints()', () => {
  /**
   * Default Breakpoints
   */

  it('should give the default breakpoints when passing the empty object', () => {
    expect(setBreakpoints(BreakpointsDefault, {})).toEqual(BreakpointsDefault)
  })

  it('should give the default breakpoints when the value is nullable', () => {
    expect(setBreakpoints(BreakpointsDefault, undefined)).toEqual(BreakpointsDefault)
    expect(setBreakpoints(BreakpointsDefault, null)).toEqual(BreakpointsDefault)
  })

  /**
   * Custom Breakpoints
   */

  it('should override default breakpoints with custom breakpoints and appropriate property value', () => {
    CSSUnits.forEach((unit) => {
      expect(
        setBreakpoints(BreakpointsDefault, {
          smallMobile: `100${unit}`,
          mediumMobile: `200${unit}`,
          largeMobile: `300${unit}`,
        }),
      ).toEqual({
        smallMobile: `100${unit}`,
        mediumMobile: `200${unit}`,
        largeMobile: `300${unit}`,
      })
    })
    expect(
      setBreakpoints(BreakpointsDefault, {
        base: `100px`,
        xs: `200px`,
        sm: `300px`,
      }),
    ).toEqual({
      base: `100px`,
      xs: `200px`,
      sm: `300px`,
    })
  })

  /**
   * Error Breakpoints
   */

  it('should throw an error when passing non-object (literal)', () => {
    expect(() => setBreakpoints(BreakpointsDefault, 1 as any)).toThrow()
    expect(() => setBreakpoints(BreakpointsDefault, [] as any)).toThrow()
    expect(() => setBreakpoints(BreakpointsDefault, 'Hello' as any)).toThrow()
    expect(() => setBreakpoints(BreakpointsDefault, (() => {}) as any)).toThrow()
  })

  it('should throw an error when passing custom breakpoints with wrong value (non css units)', () => {
    expect(() =>
      setBreakpoints(BreakpointsDefault, {
        smallMobile: '',
      }),
    ).toThrow()
    expect(() =>
      setBreakpoints(BreakpointsDefault, {
        smallMobile: '100psx',
      }),
    ).toThrow()
    expect(() =>
      setBreakpoints(BreakpointsDefault, {
        smallMobile: '100pX',
      }),
    ).toThrow()
    expect(() =>
      setBreakpoints(BreakpointsDefault, {
        smallMobile: '100Px',
      }),
    ).toThrow()
    expect(() =>
      setBreakpoints(BreakpointsDefault, {
        smallMobile: '100reM',
      }),
    ).toThrow()
    expect(() =>
      setBreakpoints(BreakpointsDefault, {
        mediumMobile: '1s0px',
      }),
    ).toThrow()
    expect(() =>
      setBreakpoints(BreakpointsDefault, {
        largeMobile: '100pxrem',
      }),
    ).toThrow()
    expect(() =>
      setBreakpoints(BreakpointsDefault, {
        largeMobile: '100',
      }),
    ).toThrow()
  })

  it('should throw an error when passing custom breakpoints with non-string value', () => {
    expect(() =>
      setBreakpoints(BreakpointsDefault, {
        smallMobile: 100,
      } as any),
    ).toThrow()
    expect(() =>
      setBreakpoints(BreakpointsDefault, {
        smallMobile: null,
      } as any),
    ).toThrow()
    expect(() =>
      setBreakpoints(BreakpointsDefault, {
        smallMobile: () => {},
      } as any),
    ).toThrow()
    expect(() =>
      setBreakpoints(BreakpointsDefault, {
        smallMobile: {},
      } as any),
    ).toThrow()
    expect(() =>
      setBreakpoints(BreakpointsDefault, {
        smallMobile: [],
      } as any),
    ).toThrow()
  })

  it('should throw an error when passing custom breakpoints with different css units in the same time', () => {
    expect(() =>
      setBreakpoints(BreakpointsDefault, {
        base: '100px',
        xs: '200px',
        sm: '300rem',
      } as any),
    ).toThrow()
    expect(() =>
      setBreakpoints(BreakpointsDefault, {
        base: '100rem',
        xs: '200rem',
        sm: '300px',
      } as any),
    ).toThrow()
  })
})

describe('extendsBreakpoints()', () => {
  /**
   * Default Breakpoints Queries
   */

  it('should give a default breakpoints', () => {
    expect(
      extendsBreakpoints(BreakpointsDefault, {
        fontSize: {
          xs: '12px',
          sm: '14px',
        },
        color: {
          xs: 'red',
          sm: 'blue',
        },
      }),
    ).toEqual(BreakpointsDefault)
    expect(extendsBreakpoints(BreakpointsDefault, {})).toEqual(BreakpointsDefault)
    expect(extendsBreakpoints(BreakpointsDefault, undefined)).toEqual(BreakpointsDefault)
    expect(extendsBreakpoints(BreakpointsDefault, null)).toEqual(BreakpointsDefault)
  })

  /**
   * Custom Breakpoints Queries
   */

  it('should give custom breakpoints', () => {
    expect(
      extendsBreakpoints(BreakpointsDefault, {
        fontSize: {
          xs: '12px',
          sm: '14px',
          '600px': '16px',
        },
        color: {
          xs: 'red',
          sm: 'blue',
          '900px': 'green',
        },
      }),
    ).toEqual({
      ...BreakpointsDefault,
      '600px': '600px',
      '900px': '900px',
    })
  })

  it('should give unsorted custom breakpoints', () => {
    const unsortedCustomBreakpointsKeys = Object.keys(
      extendsBreakpoints(BreakpointsDefault, {
        fontSize: {
          xs: '12px',
          sm: '14px',
          '600px': '16px',
        },
        color: {
          xs: 'red',
          sm: 'blue',
          '900px': 'green',
        },
      }),
    )
    expect(unsortedCustomBreakpointsKeys).not.toEqual(['base', 'xs', 'sm', '600px', 'md', '900px', 'lg', 'xl'])
  })

  /**
   * Error Custom Breakpoints Queries
   */

  it('should give an error with not valid custom breakpoints keys', () => {
    expect(() =>
      extendsBreakpoints(BreakpointsDefault, {
        fontSize: {
          xs: '12px',
          sm: '14px',
          '': '16px',
        },
        color: {
          xs: 'red',
          sm: 'blue',
          '900px': 'green',
        },
      }),
    ).toThrow()
    expect(() =>
      extendsBreakpoints(BreakpointsDefault, {
        fontSize: {
          xs: '12px',
          sm: '14px',
          '600px': '16px',
        },
        color: {
          xs: 'red',
          sm: 'blue',
          '100psx': 'green',
        },
      }),
    ).toThrow()
    expect(() =>
      extendsBreakpoints(BreakpointsDefault, {
        fontSize: {
          xs: '12px',
          sm: '14px',
          '600px': '16px',
        },
        color: {
          xs: 'red',
          sm: 'blue',
          '1s0px': 'green',
        },
      }),
    ).toThrow()
    expect(() =>
      extendsBreakpoints(BreakpointsDefault, {
        fontSize: {
          xs: '12px',
          sm: '14px',
          '600px': '16px',
        },
        color: {
          xs: 'red',
          sm: 'blue',
          '100': 'green',
        },
      }),
    ).toThrow()
  })
})

describe('sortBreakpointsTrack()', () => {
  /**
   * Be careful, the sort() method sorts the elements of an array in place and returns the reference to the same array.
   */

  const getBreakpointsConstraintWidth = (breakpoints: TBreakpointsTrack) => breakpoints.constraintWidth

  it('should give a sorted breakpointsTrack (default breakpoints)', () => {
    CSSUnits.forEach((cssUnit) => {
      expect(
        sortBreakpointsTrack([
          { query: `xs`, constraintWidth: `320${cssUnit}`, status: false },
          { query: `base`, constraintWidth: `0${cssUnit}`, status: false },
          { query: `sm`, constraintWidth: `576${cssUnit}`, status: false },
          { query: `lg`, constraintWidth: `1080${cssUnit}`, status: false },
          { query: `md`, constraintWidth: `768${cssUnit}`, status: false },
          { query: `xl`, constraintWidth: `1280${cssUnit}`, status: false },
        ]).map(getBreakpointsConstraintWidth),
      ).toEqual([`0${cssUnit}`, `320${cssUnit}`, `576${cssUnit}`, `768${cssUnit}`, `1080${cssUnit}`, `1280${cssUnit}`])
    })
  })

  it('should give a unsorted breakpointsTrack (default breakpoints)', () => {
    CSSUnits.forEach((cssUnit) => {
      expect(
        [
          { query: `xs`, constraintWidth: `320${cssUnit}`, status: false },
          { query: `base`, constraintWidth: `0${cssUnit}`, status: false },
          { query: `sm`, constraintWidth: `576${cssUnit}`, status: false },
          { query: `lg`, constraintWidth: `1080${cssUnit}`, status: false },
          { query: `md`, constraintWidth: `768${cssUnit}`, status: false },
          { query: `xl`, constraintWidth: `1280${cssUnit}`, status: false },
        ].map(getBreakpointsConstraintWidth),
      ).toEqual([`320${cssUnit}`, `0${cssUnit}`, `576${cssUnit}`, `1080${cssUnit}`, `768${cssUnit}`, `1280${cssUnit}`])
    })
  })

  it('should give a sorted breakpointsTrack (default breakpoints with decimal value)', () => {
    CSSUnits.forEach((cssUnit) => {
      expect(
        sortBreakpointsTrack([
          { query: `xs`, constraintWidth: `100.09${cssUnit}`, status: false },
          { query: `base`, constraintWidth: `100.9${cssUnit}`, status: false },
          { query: `sm`, constraintWidth: `100.78${cssUnit}`, status: false },
          { query: `lg`, constraintWidth: `100.12${cssUnit}`, status: false },
          { query: `md`, constraintWidth: `100.17${cssUnit}`, status: false },
          { query: `xl`, constraintWidth: `100.89${cssUnit}`, status: false },
        ]).map(getBreakpointsConstraintWidth),
      ).toEqual([
        `100.09${cssUnit}`,
        `100.12${cssUnit}`,
        `100.17${cssUnit}`,
        `100.78${cssUnit}`,
        `100.89${cssUnit}`,
        `100.9${cssUnit}`,
      ])
    })
  })

  it('should give a sorted breakpointsTrack (custom breakpoints)', () => {
    CSSUnits.forEach((cssUnit) => {
      expect(
        sortBreakpointsTrack([
          { query: `900px`, constraintWidth: `900${cssUnit}`, status: false },
          { query: `xs`, constraintWidth: `320${cssUnit}`, status: false },
          { query: `base`, constraintWidth: `0${cssUnit}`, status: false },
          { query: `sm`, constraintWidth: `576${cssUnit}`, status: false },
          { query: `lg`, constraintWidth: `1080${cssUnit}`, status: false },
          { query: `md`, constraintWidth: `768${cssUnit}`, status: false },
          { query: `xl`, constraintWidth: `1280${cssUnit}`, status: false },
          { query: `600px`, constraintWidth: `600${cssUnit}`, status: false },
        ]).map(getBreakpointsConstraintWidth),
      ).toEqual([
        `0${cssUnit}`,
        `320${cssUnit}`,
        `576${cssUnit}`,
        `600${cssUnit}`,
        `768${cssUnit}`,
        `900${cssUnit}`,
        `1080${cssUnit}`,
        `1280${cssUnit}`,
      ])
    })
  })

  it('should give a unsorted breakpointsTrack (custom breakpoints)', () => {
    CSSUnits.forEach((cssUnit) => {
      expect(
        [
          { query: `xs`, constraintWidth: `320${cssUnit}`, status: false },
          { query: `base`, constraintWidth: `0${cssUnit}`, status: false },
          { query: `sm`, constraintWidth: `576${cssUnit}`, status: false },
          { query: `lg`, constraintWidth: `1080${cssUnit}`, status: false },
          { query: `md`, constraintWidth: `768${cssUnit}`, status: false },
          { query: `xl`, constraintWidth: `1280${cssUnit}`, status: false },
          { query: `600px`, constraintWidth: `600${cssUnit}`, status: false },
          { query: `900px`, constraintWidth: `900${cssUnit}`, status: false },
        ].map(getBreakpointsConstraintWidth),
      ).toEqual([
        `320${cssUnit}`,
        `0${cssUnit}`,
        `576${cssUnit}`,
        `1080${cssUnit}`,
        `768${cssUnit}`,
        `1280${cssUnit}`,
        `600${cssUnit}`,
        `900${cssUnit}`,
      ])
    })
  })
})

describe('trackBreakpoints()', () => {
  it('media: min, viewport: 800px (for example), and default breakpoints', () => {
    const sortedBreakpointsTrack = (cssUnit: string) => [
      { query: `base`, constraintWidth: `0${cssUnit}`, status: true },
      { query: `xs`, constraintWidth: `320${cssUnit}`, status: true },
      { query: `sm`, constraintWidth: `576${cssUnit}`, status: true },
      { query: `md`, constraintWidth: `768${cssUnit}`, status: true },
      { query: `lg`, constraintWidth: `1080${cssUnit}`, status: false },
      { query: `xl`, constraintWidth: `1280${cssUnit}`, status: false },
    ]

    CSSUnits.forEach((cssUnit) => {
      expect(trackBreakpoints(sortedBreakpointsTrack(cssUnit), 'min')).toEqual({
        breakpointsCurrent: { query: `md`, constraintWidth: `768${cssUnit}`, status: true },
        breakpointsClosest: ['sm', 'xs', 'base'],
      })
      expect(trackBreakpoints(sortedBreakpointsTrack(cssUnit), 'min')).not.toEqual({
        breakpointsCurrent: { query: `md`, constraintWidth: `768${cssUnit}`, status: true },
        breakpointsClosest: ['base', 'xs', 'sm'],
      })
    })
  })
  it('media: max, viewport: 600px (for example), and default breakpoints', () => {
    const sortedBreakpointsTrack = (cssUnit: string) => [
      { query: `base`, constraintWidth: `0${cssUnit}`, status: false },
      { query: `xs`, constraintWidth: `320${cssUnit}`, status: false },
      { query: `sm`, constraintWidth: `576${cssUnit}`, status: false },
      { query: `md`, constraintWidth: `768${cssUnit}`, status: true },
      { query: `lg`, constraintWidth: `1080${cssUnit}`, status: true },
      { query: `xl`, constraintWidth: `1280${cssUnit}`, status: true },
    ]
    CSSUnits.forEach((cssUnit) => {
      expect(trackBreakpoints(sortedBreakpointsTrack(cssUnit), 'max')).toEqual({
        breakpointsCurrent: { query: `md`, constraintWidth: `768${cssUnit}`, status: true },
        breakpointsClosest: ['lg', 'xl'],
      })
      expect(trackBreakpoints(sortedBreakpointsTrack(cssUnit), 'max')).not.toEqual({
        breakpointsCurrent: { query: `md`, constraintWidth: `768${cssUnit}`, status: true },
        breakpointsClosest: ['xl', 'lg'],
      })
    })
  })
  it('media: min, viewport: 1000px (for example), and custom breakpoints', () => {
    const sortedBreakpointsTrack = (cssUnit: string) => [
      { query: `base`, constraintWidth: `0${cssUnit}`, status: true },
      { query: `xs`, constraintWidth: `320${cssUnit}`, status: true },
      { query: `sm`, constraintWidth: `576${cssUnit}`, status: true },
      { query: `600${cssUnit}`, constraintWidth: `600${cssUnit}`, status: true },
      { query: `md`, constraintWidth: `768${cssUnit}`, status: true },
      { query: `900${cssUnit}`, constraintWidth: `900${cssUnit}`, status: true },
      { query: `lg`, constraintWidth: `1080${cssUnit}`, status: false },
      { query: `xl`, constraintWidth: `1280${cssUnit}`, status: false },
    ]

    CSSUnits.forEach((cssUnit) => {
      expect(trackBreakpoints(sortedBreakpointsTrack(cssUnit), 'min')).toEqual({
        breakpointsCurrent: { query: `900${cssUnit}`, constraintWidth: `900${cssUnit}`, status: true },
        breakpointsClosest: ['md', `600${cssUnit}`, 'sm', 'xs', 'base'],
      })
      expect(trackBreakpoints(sortedBreakpointsTrack(cssUnit), 'min')).not.toEqual({
        breakpointsCurrent: { query: `900`, constraintWidth: `900${cssUnit}`, status: true },
        breakpointsClosest: ['base', 'xs', 'sm', `600${cssUnit}`, 'md'],
      })
    })
  })
  it('media: max, viewport: 500px (for example), and custom breakpoints', () => {
    const sortedBreakpointsTrack = (cssUnit: string) => [
      { query: `base`, constraintWidth: `0${cssUnit}`, status: false },
      { query: `xs`, constraintWidth: `320${cssUnit}`, status: false },
      { query: `sm`, constraintWidth: `576${cssUnit}`, status: false },
      { query: `600${cssUnit}`, constraintWidth: `600${cssUnit}`, status: true },
      { query: `md`, constraintWidth: `768${cssUnit}`, status: true },
      { query: `900${cssUnit}`, constraintWidth: `900${cssUnit}`, status: true },
      { query: `lg`, constraintWidth: `1080${cssUnit}`, status: true },
      { query: `xl`, constraintWidth: `1280${cssUnit}`, status: true },
    ]

    CSSUnits.forEach((cssUnit) => {
      expect(trackBreakpoints(sortedBreakpointsTrack(cssUnit), 'max')).toEqual({
        breakpointsCurrent: { query: `600${cssUnit}`, constraintWidth: `600${cssUnit}`, status: true },
        breakpointsClosest: ['md', `900${cssUnit}`, 'lg', 'xl'],
      })
      expect(trackBreakpoints(sortedBreakpointsTrack(cssUnit), 'max')).not.toEqual({
        breakpointsCurrent: { query: `600${cssUnit}`, constraintWidth: `600${cssUnit}`, status: true },
        breakpointsClosest: ['xl', `lg`, `900${cssUnit}`, 'md'],
      })
    })
  })
})
describe('setCurrentValue()', () => {
  const breakpointsQueries = {
    fontSize: {
      base: '15px',
      md: '20px',
    },
  }

  /**
   * Default breakpoints
   */

  it('default breakpoints, currentQuery, and min', () => {
    const breakpointsCurrent = { query: `md`, constraintWidth: `768px`, status: true }
    const breakpointsClosest = ['sm', 'xs', 'base']
    expect(setCurrentValue(breakpointsQueries, breakpointsCurrent, breakpointsClosest)).toEqual({
      fontSize: '20px',
    })
  })

  it('default breakpoints, currentQuery, and max', () => {
    const breakpointsCurrent = { query: `md`, constraintWidth: `768px`, status: true }
    const breakpointsClosest = ['lg', 'xl']
    expect(
      setCurrentValue(
        { ...breakpointsQueries, color: { base: 'red', md: 'green' } },
        breakpointsCurrent,
        breakpointsClosest,
      ),
    ).toEqual({
      fontSize: '20px',
      color: 'green',
    })
  })

  it('default breakpoints, closestQuery, and min', () => {
    const breakpointsCurrent = { query: `md`, constraintWidth: `768px`, status: true }
    const breakpointsClosest = ['sm', 'xs', 'base']
    expect(
      setCurrentValue(
        { ...breakpointsQueries, isMobile: { base: 'Yes', lg: 'No' } },
        breakpointsCurrent,
        breakpointsClosest,
      ),
    ).toEqual({
      fontSize: '20px',
      isMobile: 'Yes',
    })
  })

  it('default breakpoints, closestQuery, and max', () => {
    const breakpointsCurrent = { query: `sm`, constraintWidth: `768px`, status: true }
    const breakpointsClosest = ['md', 'lg', 'xl']
    expect(
      setCurrentValue(
        { ...breakpointsQueries, color: { base: 'red', lg: 'green' } },
        breakpointsCurrent,
        breakpointsClosest,
      ),
    ).toEqual({
      fontSize: '20px',
      color: 'green',
    })
  })

  /**
   * Custom breakpoints
   */

  it('custom breakpoints, currentQuery & closestQuery, and min', () => {
    const breakpointsCurrent = { query: `900px`, constraintWidth: `900px`, status: true }
    const breakpointsClosest = ['md', '600px', 'sm', 'xs', 'base']
    expect(
      setCurrentValue(
        { ...breakpointsQueries, color: { base: 'green', '600px': 'red', '900px': 'blue' } },
        breakpointsCurrent,
        breakpointsClosest,
      ),
    ).toEqual({
      fontSize: '20px',
      color: 'blue',
    })
  })

  it('custom breakpoints, currentQuery & closestQuery, and max', () => {
    const breakpointsCurrent = { query: `600px`, constraintWidth: `600px`, status: true }
    const breakpointsClosest = ['md', '900px', 'lg', 'xl']
    expect(
      setCurrentValue(
        { ...breakpointsQueries, color: { base: 'green', '900px': 'blue' } },
        breakpointsCurrent,
        breakpointsClosest,
      ),
    ).toEqual({
      fontSize: '20px',
      color: 'blue',
    })
  })

  /**
   * Test for falsy values
   */

  it('default breakpoints, currentQuery & closestQuery, min, and falsy values', () => {
    const breakpointsCurrent = { query: `900px`, constraintWidth: `900px`, status: true }
    const breakpointsClosest = ['md', '600px', 'sm', 'xs', 'base']
    expect(
      setCurrentValue(
        {
          nullValue: {
            base: undefined,
            md: null,
          },
          undefinedValue: {
            base: undefined,
            md: null,
            '900px': undefined,
          },
          falseValue: {
            base: true,
            md: false,
          },
          zeroNumberValue: {
            base: undefined,
            md: null,
            '900px': 0,
          },
          emptyStringValue: {
            base: undefined,
            md: '',
          },
        },
        breakpointsCurrent,
        breakpointsClosest,
      ),
    ).toEqual({
      nullValue: null,
      undefinedValue: undefined,
      falseValue: false,
      zeroNumberValue: 0,
      emptyStringValue: '',
    })
  })
})
