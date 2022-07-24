/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import type { TDefaultBreakpoints, TBaseObject, TMedia, TBreakpointsTrack } from './types'

export function trackBreakpoints<TTypeBreakpointTrack extends Array<TBreakpointsTrack>, TTypeBreakpointsQuery>(
  breakpointsTrack: TTypeBreakpointTrack,
  breakpointsQuery: TTypeBreakpointsQuery,
  media: TMedia,
): {
  currentBreakpoints: TBreakpointsTrack
  snapshotBreakpoints: TBreakpointsTrack
} {
  let initBreakpoints = {
    query: '',
    constraintWidth: '',
    status: false,
  }
  let isCurrentBreakpointsFound = false
  let isQueryDefined: TTypeBreakpointsQuery[keyof TTypeBreakpointsQuery] | string = ''
  let currentBreakpoints: TBreakpointsTrack = { ...initBreakpoints }
  let snapshotBreakpoints: TBreakpointsTrack = { ...initBreakpoints }
  let idx = media === 'min' ? breakpointsTrack.length - 1 : 0

  /**
   * @description Track the breakpoints and return the current breakpoints.
   */

  for (let i = idx; media === 'min' ? i >= 0 : i < breakpointsTrack.length; media === 'min' ? i-- : i++) {
    isQueryDefined = breakpointsQuery[breakpointsTrack[i].query as keyof TTypeBreakpointsQuery]
    if (breakpointsTrack[i].status && !isCurrentBreakpointsFound) {
      currentBreakpoints = { ...breakpointsTrack[i] }
      isCurrentBreakpointsFound = true
    }
    if (breakpointsTrack[i].status && isQueryDefined) {
      snapshotBreakpoints = { ...breakpointsTrack[i] }
      break
    }
  }

  return {
    currentBreakpoints,
    snapshotBreakpoints,
  }
}

export function isEmptyObject<TTypeObject extends TBaseObject>(obj: TTypeObject) {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

/**
 * @description Use default breakpoints if option breakpoints is empty.
 */

export function setBreakpoints<TTypeBreakpointsOptions extends TBaseObject>(
  defaultBeakpoints: TDefaultBreakpoints,
  optionBreakpoints: TTypeBreakpointsOptions | undefined,
) {
  if (typeof optionBreakpoints === 'undefined' || isEmptyObject(optionBreakpoints)) {
    return defaultBeakpoints
  }

  return optionBreakpoints
}

export function sortBreakpointsTrack(breakpointsTrack: TBreakpointsTrack[]): TBreakpointsTrack[] {
  // FIXME: Sort breakpointsTrack by constraintWidth by (rem, px, vh, ...etc) units
  return breakpointsTrack.sort((a, b) => {
    let aWidth = Number(a.constraintWidth.replace(/[^0-9.]/g, ''))
    let bWidth = Number(b.constraintWidth.replace(/[^0-9.]/g, ''))
    return aWidth - bWidth
  })
}

export function extendsBreakpoints<
  TTypeBreakpointsQuery extends Record<string, any>,
  TTypeCurrentBreakpoints extends TDefaultBreakpoints | TBaseObject,
>(breakpointsQuery: TTypeBreakpointsQuery, currentBreakpoints: TTypeCurrentBreakpoints) {
  let breakpointsQueryKeys = Object.keys(breakpointsQuery)
  let currentBreakpointsKeys = Object.keys(currentBreakpoints)
  function getArbitraryKeys(key: string) {
    return !currentBreakpointsKeys.includes(key)
  }
  let arbitraryKeys = breakpointsQueryKeys.filter(getArbitraryKeys)
  if (!arbitraryKeys.length) {
    return currentBreakpoints
  }
  let arbitraryObject: Record<string, any> = {}
  breakpointsQueryKeys.forEach((key) => {
    if (arbitraryKeys.includes(key)) {
      arbitraryObject[key] = key
    }
  })
  return { ...arbitraryObject, ...currentBreakpoints }
}
