/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Types Utils
 */

export type TRecordKeys = string | number | symbol

export type TPrimitive<T = string> = T & {}

export type TCSSAbsoluteUnits = 'px' | 'cm' | 'mm' | 'Q' | 'in' | 'pc' | 'pt'

export type Numbs = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

export type TCSSRelativeUnits =
  | 'em'
  | 'ex'
  | 'ch'
  | 'rem'
  | 'lh'
  | 'rlh'
  | 'vw'
  | 'vh'
  | 'vmin'
  | 'vmax'
  | 'vb'
  | 'vi'
  | 'svw'
  | 'svh'
  | 'lvw'
  | 'lvh'
  | 'dvw'
  | 'dvh'

/**
 * Types System
 */

export type TCSSSWidthValues<T extends string> = T extends `${infer Numb extends Numbs}${infer TUnit}`
  ? `${Numb}${TCSSSWidthValues<TUnit>}`
  : `${TCSSAbsoluteUnits | TCSSRelativeUnits}`

export type TBreakpointsDefault = {
  base?: string
  xs?: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
}

export type TBreakpointsOption<T extends Record<string, string>> = {
  /**
   * TCSSSWidthValues<T[P]> will return `<number><unit>` e.g `100px` | `100rem` etc. OR just the `<unit>` e.g `px` | `rem` etc.
   * So we need to check if the value is a just unit or not.
   */
  [P in keyof T]: TCSSSWidthValues<T[P]> extends TCSSAbsoluteUnits | TCSSRelativeUnits
    ? `${number}${TCSSAbsoluteUnits | TCSSRelativeUnits}`
    : TCSSSWidthValues<T[P]>
}

export type TMedia = 'min' | 'max'

export type TOptions<T extends Record<string, string>> = {
  breakpoints?: T extends TBreakpointsOption<T> ? T : TBreakpointsOption<T>
  media: TMedia
}

export type TBreakpointsTrack = {
  query: string
  constraintWidth: string
  status: boolean
}
