/* eslint-disable @typescript-eslint/no-explicit-any */
import { setBreakpoints } from '../src/system'
import { DefaultBeakpoints } from '../src/constants'

describe('Check the `setBreakpoints` utility so that it gives the expected output.', () => {
  test('should return default breakpoints values', () => {
    // Notes: Primitive values
    expect(setBreakpoints(DefaultBeakpoints, undefined)).toEqual(DefaultBeakpoints)
    expect(setBreakpoints(DefaultBeakpoints, null as any)).toEqual(DefaultBeakpoints)
    expect(setBreakpoints(DefaultBeakpoints, '' as any)).toEqual(DefaultBeakpoints)
    expect(setBreakpoints(DefaultBeakpoints, 12 as any)).toEqual(DefaultBeakpoints)
    expect(setBreakpoints(DefaultBeakpoints, true as any)).toEqual(DefaultBeakpoints)
    // Notes: Non-primitive values
    expect(setBreakpoints(DefaultBeakpoints, {})).toEqual(DefaultBeakpoints)
    expect(setBreakpoints(DefaultBeakpoints, { base: 0, xs: 320, sm: 576, md: 768, lg: 1080, xl: 1280 })).toEqual(
      DefaultBeakpoints,
    )
    expect(
      setBreakpoints(DefaultBeakpoints, { base: '0', xs: '320', sm: '576', md: '768', lg: '1080', xl: '1280' }),
    ).toEqual(DefaultBeakpoints)
    expect(
      setBreakpoints(DefaultBeakpoints, { base: '0', xs: '320', sm: 576, md: 768, lg: '1080', xl: '1280' }),
    ).toEqual(DefaultBeakpoints)
    expect(setBreakpoints(DefaultBeakpoints, ['Hello'] as any)).toEqual(DefaultBeakpoints)
    expect(setBreakpoints(DefaultBeakpoints, (() => '') as any)).toEqual(DefaultBeakpoints)
  })
  test('should return options breakpoints values', () => {
    expect(
      setBreakpoints(DefaultBeakpoints, {
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
      setBreakpoints(DefaultBeakpoints, {
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
      setBreakpoints(DefaultBeakpoints, { base: 0, xs: '320px', sm: 576, md: 768, lg: '1080px', xl: 1280 }),
    ).toThrow()
    expect(() =>
      setBreakpoints(DefaultBeakpoints, {
        base: '0px',
        xs: '320px',
        sm: '576px',
        md: '768px',
        lg: '1080px',
        xl: '1280pxrem',
      }),
    ).toThrow()
    expect(() =>
      setBreakpoints(DefaultBeakpoints, { base: '100pxsm', xs: 320, sm: '576', md: 768, lg: 1080, xl: 1280 }),
    ).toThrow()
    expect(() =>
      setBreakpoints(DefaultBeakpoints, { base: '100', xs: 320, sm: '576', md: 768, lg: 1080, xl: '1280q' }),
    ).toThrow()
    expect(() =>
      setBreakpoints(DefaultBeakpoints, {
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
