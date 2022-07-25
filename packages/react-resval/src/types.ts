/* eslint-disable @typescript-eslint/ban-types */
export type TPrimivite<T = string> = T & {}

export type TNullable = undefined | null

export type TObject = {}

export type TCSSAbsoluteUnits = 'cm' | 'mm' | 'Q' | 'in' | 'pc' | 'pt' | 'px'
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

export type TCSSWidthValues = `${number}${TCSSAbsoluteUnits | TCSSRelativeUnits}`

export type TBreakpointsTrack = {
  query: string
  constraintWidth: string
  status: boolean
}

export type TBaseObject = Record<string, string>

export type TMedia = 'min' | 'max'

export type TDefaultBreakpoints = {
  base?: string
  xs?: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
}

export type TOptions<TTypeBreakpointsOptions = TDefaultBreakpoints> = {
  breakpoints?: TTypeBreakpointsOptions
  media: TMedia
}
