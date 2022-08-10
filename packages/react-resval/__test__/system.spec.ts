/* eslint-disable @typescript-eslint/no-explicit-any */
import { setBreakpoints, extendsBreakpoints } from '../src/system'
import { DefaultBreakpoints } from '../src/constants'

describe('Check the `setBreakpoints` utility so that it gives the expected output.', () => {
  test('should return default breakpoints values', () => {
    // Notes: Primitive values
    expect(setBreakpoints(DefaultBreakpoints, undefined)).toEqual(DefaultBreakpoints)
    expect(setBreakpoints(DefaultBreakpoints, null as any)).toEqual(DefaultBreakpoints)
    expect(setBreakpoints(DefaultBreakpoints, '' as any)).toEqual(DefaultBreakpoints)
    expect(setBreakpoints(DefaultBreakpoints, 12 as any)).toEqual(DefaultBreakpoints)
    expect(setBreakpoints(DefaultBreakpoints, true as any)).toEqual(DefaultBreakpoints)
    // Notes: Non-primitive values
    expect(setBreakpoints(DefaultBreakpoints, {})).toEqual(DefaultBreakpoints)
    expect(setBreakpoints(DefaultBreakpoints, { base: 0, xs: 320, sm: 576, md: 768, lg: 1080, xl: 1280 })).toEqual(
      DefaultBreakpoints,
    )
    expect(
      setBreakpoints(DefaultBreakpoints, { base: '0', xs: '320', sm: '576', md: '768', lg: '1080', xl: '1280' }),
    ).toEqual(DefaultBreakpoints)
    expect(
      setBreakpoints(DefaultBreakpoints, { base: '0', xs: '320', sm: 576, md: 768, lg: '1080', xl: '1280' }),
    ).toEqual(DefaultBreakpoints)
    expect(setBreakpoints(DefaultBreakpoints, ['Hello'] as any)).toEqual(DefaultBreakpoints)
    expect(setBreakpoints(DefaultBreakpoints, (() => '') as any)).toEqual(DefaultBreakpoints)
  })
  test('should return options breakpoints values', () => {
    expect(
      setBreakpoints(DefaultBreakpoints, {
        base: '0px',
        smallMobile: '350px',
        mediumMobile: '768px',
        tablet: '1080px',
        desktop: '1280px',
      }),
    ).toEqual({
      base: '0px',
      smallMobile: '350px',
      mediumMobile: '768px',
      tablet: '1080px',
      desktop: '1280px',
    })
    expect(
      setBreakpoints(DefaultBreakpoints, {
        base: 0,
        smallMobile: 350,
        mediumMobile: 768,
        tablet: 1080,
        desktop: 1280,
      }),
    ).toEqual({
      base: '0px',
      smallMobile: '350px',
      mediumMobile: '768px',
      tablet: '1080px',
      desktop: '1280px',
    })
  })
  test('should throw error, because pass invalid breakpoints', () => {
    expect(() =>
      setBreakpoints(DefaultBreakpoints, { base: 0, xs: '320px', sm: 576, md: 768, lg: '1080px', xl: 1280 }),
    ).toThrow()
    expect(() =>
      setBreakpoints(DefaultBreakpoints, {
        base: '0px',
        xs: '320px',
        sm: '576px',
        md: '768px',
        lg: '1080px',
        xl: '1280pxrem',
      }),
    ).toThrow()
    expect(() =>
      setBreakpoints(DefaultBreakpoints, { base: '100pxsm', xs: 320, sm: '576', md: 768, lg: 1080, xl: 1280 }),
    ).toThrow()
    expect(() =>
      setBreakpoints(DefaultBreakpoints, { base: '100', xs: 320, sm: '576', md: 768, lg: 1080, xl: '1280q' }),
    ).toThrow()
    expect(() =>
      setBreakpoints(DefaultBreakpoints, {
        base: {} as any,
        xs: [] as any,
        sm: '576ps',
        md: 768,
        lg: 1080,
        xl: 'hello',
      }),
    ).toThrow()
  })
})

describe('Check the `extendsBreakpoints` utility so that it gives the expected output.', () => {
  test('should return original options breakpoints', () => {
    expect(
      extendsBreakpoints(
        {
          base: 'val: base',
          xs: 'val: xs',
          sm: 'val: sm',
          md: 'val: md',
          lg: 'val: lg',
          xl: 'val: xl',
        },
        DefaultBreakpoints,
      ),
    ).toEqual(DefaultBreakpoints)
    expect(
      extendsBreakpoints(
        {
          base: 'val: base',
          md: 'val: md',
        },
        DefaultBreakpoints,
      ),
    ).toEqual(DefaultBreakpoints)
    expect(
      extendsBreakpoints(
        {
          lg: 'val: lg',
          xl: 'val: xl',
        },
        DefaultBreakpoints,
      ),
    ).toEqual(DefaultBreakpoints)
    expect(extendsBreakpoints({}, DefaultBreakpoints)).toEqual(DefaultBreakpoints)
  })
  test('should return custom breakpoints', () => {
    const CustomBreakpoints = {
      base: '0px',
      xs: '320px',
      sm: '576px',
      md: '768px',
      lg: '1080px',
      xl: '1280px',
      '900px': '900px',
      '600px': '600px',
    }
    expect(
      extendsBreakpoints(
        {
          base: 'val: base',
          xs: 'val: xs',
          sm: 'val: sm',
          md: 'val: md',
          lg: 'val: lg',
          xl: 'val: xl',
          '900px': 'val: 900px',
          '600px': 'val: 600px',
        },
        CustomBreakpoints,
      ),
    ).toEqual(CustomBreakpoints)
    expect(
      extendsBreakpoints(
        {
          base: 'val: base',
          md: 'val: md',
          '900px': 'val: 900px',
          '600px': 'val: 600px',
        },
        DefaultBreakpoints,
      ),
    ).toEqual(CustomBreakpoints)
    expect(
      extendsBreakpoints(
        {
          lg: 'val: lg',
          xl: 'val: xl',
          '900px': 'val: 900px',
          '600px': 'val: 600px',
        },
        DefaultBreakpoints,
      ),
    ).toEqual(CustomBreakpoints)
  })
  test('should throw error, because pass invalid breakpointsQuery', () => {
    expect(() => extendsBreakpoints(undefined as any, DefaultBreakpoints)).toThrow()
    expect(() => extendsBreakpoints(null as any, DefaultBreakpoints)).toThrow()
    expect(() => extendsBreakpoints(['Hello'] as any, DefaultBreakpoints)).toThrow()
    expect(() => extendsBreakpoints(100 as any, DefaultBreakpoints)).toThrow()
  })
})
