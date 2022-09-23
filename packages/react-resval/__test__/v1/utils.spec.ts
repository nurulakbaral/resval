/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */

import {
  isEmptyObject,
  isObject,
  isArrayOfCSSUnits,
  isCSSUnits,
  isBreakpointsHaveDiffCSSUnits,
} from '../../src/v1/utils'
import { CSSUnits } from '../../src/v1/constants'

describe('isEmptyObject()', () => {
  it('should return true, because empty object', () => {
    expect(isEmptyObject({})).toBe(true)
  })
  it('should return false, because not empty object', () => {
    expect(isEmptyObject({ name: 'Resval' })).toBe(false)
    expect(isEmptyObject({ name: 'Resval', age: 12 })).toBe(false)
  })
})

describe('isObject()', () => {
  it('should return true, because object', () => {
    expect(isObject({})).toBe(true)
    expect(isObject({ name: 'Resval' })).toBe(true)
  })
  it('should return false, because non-object lteral', () => {
    expect(isObject((() => {}) as any)).toBe(false)
    expect(isObject(['Resval'] as any)).toBe(false)
    expect(isObject(null as any)).toBe(false)
    expect(isObject(undefined as any)).toBe(false)
  })
})

describe('isArrayOfCSSUnits()', () => {
  it('should return true, because array of CSSUnits', () => {
    expect(isArrayOfCSSUnits(['100px', '200px', '300px', '400px'])).toBe(true)
    expect(isArrayOfCSSUnits(CSSUnits.map((unit) => `100${unit}`))).toBe(true)
  })
  it('should return false, because not array of CSSUnits', () => {
    expect(isArrayOfCSSUnits(['100pX', '200rem', '300em'])).toBe(false)
    expect(isArrayOfCSSUnits(['100px', '200Rem', '300em'])).toBe(false)
    expect(isArrayOfCSSUnits(['100pxs', '200rem', '300em'])).toBe(false)
    expect(isArrayOfCSSUnits(['100px', '200rempx', '300em'])).toBe(false)
    expect(isArrayOfCSSUnits(['100px', '200rem', '300emem'])).toBe(false)
    expect(isArrayOfCSSUnits(['3e0em'])).toBe(false)
    expect(isArrayOfCSSUnits([100, '200rem', '300em'])).toBe(false)
    expect(isArrayOfCSSUnits(['100px', null, undefined])).toBe(false)
    expect(isArrayOfCSSUnits(['px', 'rem', 'em'])).toBe(false)
    expect(isArrayOfCSSUnits([...CSSUnits])).toBe(false)
  })
})

describe('isCSSUnits()', () => {
  it('should return true, because this string part of CSSUnits', () => {
    CSSUnits.forEach((unit) => {
      expect(isCSSUnits(`100${unit}`)).toBe(true)
    })
  })
  it('should return false, because this string is not CSSUnits', () => {
    expect(isCSSUnits(100 as any)).toBe(false)
    expect(isCSSUnits('100pxem')).toBe(false)
    expect(isCSSUnits('100p0px')).toBe(false)
    expect(isCSSUnits('100')).toBe(false)
    expect(isCSSUnits('px100')).toBe(false)
    expect(isCSSUnits('100ppx')).toBe(false)
  })
})

describe('isBreakpointsHaveDiffCSSUnits()', () => {
  it('should return true, because becase have all same CSS Units', () => {
    CSSUnits.forEach((unit) => {
      expect(isBreakpointsHaveDiffCSSUnits([`100${unit}`, `200${unit}`, `300${unit}`, `400${unit}`])).toBe(false)
    })
  })
  it('should return false, because have diffrent CSS Units values in same time', () => {
    expect(isBreakpointsHaveDiffCSSUnits(['100px', '200px', '300rem'])).toBe(true)
    expect(isBreakpointsHaveDiffCSSUnits(['100px', '200rem', '300rem'])).toBe(true)
  })
})
