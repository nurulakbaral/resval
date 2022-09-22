/* eslint-disable prefer-const */
import { renderHook } from '@testing-library/react-hooks'
import { useInternalMediaQuery } from '../../src/v1/hooks'
import { BreakpointsDefault } from '../../src/v1/constants'

let mockTrueMatches = [
  ['(min-width: 0px)', '(min-width: 320px)', '(min-width: 576px)', '(min-width: 768px)'],
  ['(max-width: 1080px)', '(max-width: 1280px)'],
  ['(min-width: 0px)', '(min-width: 320px)', '(min-width: 576px)', '(min-width: 600px)', '(min-width: 768px)'],
  ['(max-width: 900px)', '(max-width: 1080px)', '(max-width: 1280px)'],
]
let mockCount = 0

function mockSetViewport({ width, height }: { width: number; height: number }) {
  window.innerWidth = width
  window.innerHeight = height
  window.dispatchEvent(new Event('resize'))
}

describe('useInternalMediaQuery()', () => {
  beforeEach(() => {
    const trueMatches = mockTrueMatches[mockCount++]
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      // Notes: `query` return the `(min-width: ${constraintWidth})` value
      value: jest.fn().mockImplementation((query) => ({
        matches: trueMatches.includes(query),
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })
  })
  describe('Unsorted breakpoints track', () => {
    /**
     * Default Breakpoints
     */

    it('should return `true` for base, xs, sm, md (custom)', () => {
      const { result } = renderHook(() => useInternalMediaQuery(BreakpointsDefault, 'min'))
      mockSetViewport({ width: 768, height: 1080 })
      expect(result.current.breakpointsTrack).toEqual([
        { query: 'base', constraintWidth: '0px', status: true },
        { query: 'xs', constraintWidth: '320px', status: true },
        { query: 'sm', constraintWidth: '576px', status: true },
        { query: 'md', constraintWidth: '768px', status: true },
        { query: 'lg', constraintWidth: '1080px', status: false },
        { query: 'xl', constraintWidth: '1280px', status: false },
      ])
    })
    it('should return `true` for lg, xl (custom)', () => {
      const { result } = renderHook(() => useInternalMediaQuery(BreakpointsDefault, 'max'))
      mockSetViewport({ width: 960, height: 1080 })
      expect(result.current.breakpointsTrack).toEqual([
        { query: 'base', constraintWidth: '0px', status: false },
        { query: 'xs', constraintWidth: '320px', status: false },
        { query: 'sm', constraintWidth: '576px', status: false },
        { query: 'md', constraintWidth: '768px', status: false },
        { query: 'lg', constraintWidth: '1080px', status: true },
        { query: 'xl', constraintWidth: '1280px', status: true },
      ])
    })

    /**
     * Arbitrary Breakpoints
     */

    it('should return `true` for base, xs, sm, 600px, md (arbitrary)', () => {
      const { result } = renderHook(() =>
        useInternalMediaQuery({ ...BreakpointsDefault, '600px': '600px', '900px': '900px' }, 'min'),
      )
      mockSetViewport({ width: 890, height: 1080 })
      expect(result.current.breakpointsTrack).toEqual([
        { query: 'base', constraintWidth: '0px', status: true },
        { query: 'xs', constraintWidth: '320px', status: true },
        { query: 'sm', constraintWidth: '576px', status: true },
        { query: 'md', constraintWidth: '768px', status: true },
        { query: 'lg', constraintWidth: '1080px', status: false },
        { query: 'xl', constraintWidth: '1280px', status: false },
        { query: '600px', constraintWidth: '600px', status: true },
        { query: '900px', constraintWidth: '900px', status: false },
      ])
    })
    it('should return `true` 900px, lg, xl (arbitrary)', () => {
      const { result } = renderHook(() =>
        useInternalMediaQuery({ ...BreakpointsDefault, '600px': '600px', '900px': '900px' }, 'max'),
      )
      mockSetViewport({ width: 890, height: 1080 })
      expect(result.current.breakpointsTrack).toEqual([
        { query: 'base', constraintWidth: '0px', status: false },
        { query: 'xs', constraintWidth: '320px', status: false },
        { query: 'sm', constraintWidth: '576px', status: false },
        { query: 'md', constraintWidth: '768px', status: false },
        { query: 'lg', constraintWidth: '1080px', status: true },
        { query: 'xl', constraintWidth: '1280px', status: true },
        { query: '600px', constraintWidth: '600px', status: false },
        { query: '900px', constraintWidth: '900px', status: true },
      ])
    })
  })
})
