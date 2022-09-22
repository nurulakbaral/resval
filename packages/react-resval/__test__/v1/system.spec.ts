/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { setBreakpoints, extendsBreakpoints } from '../../src/v1/system'
import { BreakpointsDefault, CSSUnits } from '../../src/v1/constants'

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
