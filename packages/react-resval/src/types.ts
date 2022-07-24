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
