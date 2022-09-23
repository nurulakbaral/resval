/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { setBreakpoints, extendsBreakpoints, sortBreakpointsTrack } from '../../src/v1/system'
import { BreakpointsDefault, CSSUnits } from '../../src/v1/constants'
import { TBreakpointsTrack } from '../../src/v1/types'

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
