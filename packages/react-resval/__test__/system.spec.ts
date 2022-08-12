/* eslint-disable @typescript-eslint/no-explicit-any */
import { setBreakpoints, extendsBreakpoints, sortBreakpointsTrack, trackBreakpoints } from '../src/system'
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

describe('Check the `sortBreakpointsTrack` utility so that it gives the expected output.', () => {
  const base = { query: 'base', constraintWidth: '0px', status: false }
  const xs = { query: 'xs', constraintWidth: '320px', status: false }
  const sm = { query: 'sm', constraintWidth: '576px', status: false }
  const md = { query: 'md', constraintWidth: '768px', status: false }
  const lg = { query: 'lg', constraintWidth: '1080px', status: false }
  const xl = { query: 'xl', constraintWidth: '1280px', status: false }
  const $900px = { query: '900px', constraintWidth: '900px', status: false }
  const $600px = { query: '600px', constraintWidth: '600px', status: false }
  const $500dot123px = { query: '500.123px', constraintWidth: '500.123px', status: false }
  const $500dot321px = { query: '500.321px', constraintWidth: '500.321px', status: false }
  const sortedIntegerBreakpointsTrack = [base, xs, sm, $600px, md, $900px, lg, xl]
  const sortedFloatBreakpointsTrack = [base, xs, $500dot123px, $500dot321px, sm, $600px, md, $900px, lg, xl]
  test('should return sorted array', () => {
    expect(sortBreakpointsTrack([base, xs, sm, md, lg, xl, $900px, $600px])).toEqual(sortedIntegerBreakpointsTrack)
    expect(sortBreakpointsTrack([xl, $900px, base, xs, sm, md, lg, $600px])).toEqual(sortedIntegerBreakpointsTrack)
    expect(sortBreakpointsTrack([xl, $900px, base, xs, sm, md, lg, $600px])).toEqual(sortedIntegerBreakpointsTrack)
    expect(sortBreakpointsTrack([$500dot123px, xl, $900px, base, xs, $500dot321px, sm, md, lg, $600px])).toEqual(
      sortedFloatBreakpointsTrack,
    )
  })
})

describe('Check the `trackBreakpoints` utility so that it gives the expected output.', () => {
  const base = { query: 'base', constraintWidth: '0px', status: false }
  const tbase = { query: 'base', constraintWidth: '0px', status: true }

  const xs = { query: 'xs', constraintWidth: '320px', status: false }
  const txs = { query: 'xs', constraintWidth: '320px', status: true }

  const sm = { query: 'sm', constraintWidth: '576px', status: false }
  const tsm = { query: 'sm', constraintWidth: '576px', status: true }

  const $600px = { query: '600px', constraintWidth: '600px', status: false }
  const t$600px = { query: '600px', constraintWidth: '600px', status: true }

  const md = { query: 'md', constraintWidth: '768px', status: false }
  const tmd = { query: 'md', constraintWidth: '768px', status: true }

  const $900px = { query: '900px', constraintWidth: '900px', status: false }
  const t$900px = { query: '900px', constraintWidth: '900px', status: true }

  const lg = { query: 'lg', constraintWidth: '1080px', status: false }
  const tlg = { query: 'lg', constraintWidth: '1080px', status: true }

  const xl = { query: 'xl', constraintWidth: '1280px', status: false }
  const txl = { query: 'xl', constraintWidth: '1280px', status: true }

  const emptyTrack = { query: '', constraintWidth: '', status: false }

  const sortedBreakpointsTrack01 = [tbase, txs, tsm, t$600px, tmd, $900px, lg, xl]
  const sortedBreakpointsTrack02 = [tbase, txs, tsm, t$600px, md, $900px, lg, xl]
  const sortedBreakpointsTrack03 = [tbase, txs, sm, $600px, md, $900px, lg, xl]
  const sortedBreakpointsTrack04 = [base, xs, sm, $600px, tmd, t$900px, tlg, txl]
  const sortedBreakpointsTrack05 = [base, xs, sm, $600px, md, t$900px, tlg, txl]

  test('should return snapshot current (md) and snapshot (md) - Media (MIN)', () => {
    expect(
      trackBreakpoints(
        sortedBreakpointsTrack01,
        {
          base: 'val: base',
          md: 'val: md',
        },
        'min',
      ),
    ).toEqual({
      currentBreakpoints: tmd,
      snapshotBreakpoints: tmd,
    })
  })
  test('should return snapshot current (600px) and snapshot (base) - Media (MIN)', () => {
    expect(
      trackBreakpoints(
        sortedBreakpointsTrack02,
        {
          base: 'val: base',
          md: 'val: md',
        },
        'min',
      ),
    ).toEqual({
      currentBreakpoints: t$600px,
      snapshotBreakpoints: tbase,
    })
  })
  test('should return snapshot current (xs) and snapshot (empty) - Media (MIN)', () => {
    expect(
      trackBreakpoints(
        sortedBreakpointsTrack03,
        {
          sm: 'val: sm',
          '900px': 'vl: 900px',
        },
        'min',
      ),
    ).toEqual({
      currentBreakpoints: txs,
      snapshotBreakpoints: emptyTrack,
    })
  })
  test('should return snapshot current (md) and snapshot (md) - Media (MAX)', () => {
    expect(
      trackBreakpoints(
        sortedBreakpointsTrack04,
        {
          base: 'val: base',
          md: 'val: md',
        },
        'max',
      ),
    ).toEqual({
      currentBreakpoints: tmd,
      snapshotBreakpoints: tmd,
    })
  })
  test('should return snapshot current (900px) and snapshot (empty) - Media (MAX)', () => {
    expect(
      trackBreakpoints(
        sortedBreakpointsTrack05,
        {
          base: 'val: base',
          md: 'val: md',
        },
        'max',
      ),
    ).toEqual({
      currentBreakpoints: t$900px,
      snapshotBreakpoints: emptyTrack,
    })
  })
})
