/* eslint-disable @typescript-eslint/no-explicit-any */

import { setBreakpoints, extendsBreakpoints } from '../../src/v1/system'
import { BreakpointsDefault } from '../../src/v1/constants'

describe('Check the `setBreakpoints` utility so that it gives the expected output.', () => {
  test('01', () => {
    expect(setBreakpoints(BreakpointsDefault, {})).toEqual(BreakpointsDefault)
    expect(
      setBreakpoints(BreakpointsDefault, {
        smallMobile: '100px',
        mediumMobile: '200px',
        largeMobile: '300px',
      }),
    ).toEqual({
      smallMobile: '100px',
      mediumMobile: '200px',
      largeMobile: '300px',
    })
  })
})

describe('Check the `extendsBreakpoints` utility so that it gives the expected output.', () => {
  test('01', () => {
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
})
