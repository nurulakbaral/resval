import { isEmptyObject, isArrayOfNumber, isArrayOfCSSUnits } from '../src/utils'
import { CSSUnits } from '../src/constants'

describe('Check the `isEmptyObject` utility so that it gives the expected output.', () => {
  test('should return true, because empty object', () => {
    expect(isEmptyObject({})).toBe(true)
  })
  test('should return false, because not empty object', () => {
    expect(isEmptyObject({ name: 'Reval' })).toBe(false)
    expect(isEmptyObject({ name: 'Reval', age: 12 })).toBe(false)
  })
})
describe('Check the `isArrayOfNumber` utility so that it gives the expected output.', () => {
  test('should return true, because array of number  and not NaN', () => {
    expect(isArrayOfNumber([1, 2, 3, 4])).toBe(true)
    expect(isArrayOfNumber([1.1, 2.2, 3.91, 3.1787])).toBe(true)
    expect(isArrayOfNumber([1, 2, 3, NaN])).not.toBe(true)
    expect(isArrayOfNumber([false, 100, 200, '300', '400.199', true])).toBe(true)
  })

  test('should return false, because not array of number', () => {
    expect(isArrayOfNumber([1, 2, '', undefined, null])).toBe(false)
    expect(isArrayOfNumber([{}, []])).toBe(false)
  })
})

describe('Check the `isArrayOfCSSUnits` utility so that it gives the expected output.', () => {
  test('should return true, because array of CSSUnits', () => {
    expect(isArrayOfCSSUnits(['100px', '200px', '300px', '400px'])).toBe(true)
    expect(isArrayOfCSSUnits(CSSUnits.map((unit) => `100${unit}`))).toBe(true)
  })
  test('should return false, because not array of CSSUnits', () => {
    expect(isArrayOfCSSUnits(['100pxs', '200rempx', '300emem'])).toBe(false)
    expect(isArrayOfCSSUnits(['pxs', 'rempx', 'emem'])).toBe(false)
    expect(isArrayOfCSSUnits(['px', 'rem', 'em'])).toBe(false)
    expect(isArrayOfCSSUnits([...CSSUnits])).toBe(false)
    expect(isArrayOfCSSUnits([100, null, undefined])).toBe(false)
    expect(isArrayOfCSSUnits(['100pxs', 1, '300emem'])).toBe(false)
  })
})
