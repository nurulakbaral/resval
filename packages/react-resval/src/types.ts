/* eslint-disable @typescript-eslint/ban-types */
export type TString = {} & string
export type TNumber = {} & number
export type TNullable = undefined | null
export type TObject = {}

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
