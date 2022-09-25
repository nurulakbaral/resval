import { v1 } from '@resval/react-responsive-values'

const breakpoints = {
  base: '0px',
  xs: '320px',
  sm: '576px',
  md: '768px',
  lg: '1080px',
  xl: '1280px',
} as const

const utilityValues = {
  value: {
    base: 'base',
    xs: 'xs',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
  } as const,
  fontSize: {
    base: '12px',
    md: '24px',
  } as const,
  color: {
    base: 'red',
    '600px': 'blue',
    lg: 'black',
  } as const,
  isMobileView: {
    base: true,
    md: false,
  } as const,
}

const useVx = v1.createResponsiveValues({
  breakpoints: { ...breakpoints },
  media: 'min',
})

export function Component() {
  const { fontSize, color, value } = useVx(utilityValues) ?? {}
  return (
    <div>
      <h1 style={{ fontSize, color }}>Hello World: {value}</h1>
    </div>
  )
}

export default function V1() {
  const { isMobileView } = useVx(utilityValues) ?? {}
  return isMobileView ? (
    <>
      <Component />
      <h3>Mobile View</h3>
    </>
  ) : (
    <>
      <Component />
      <h1>Desktop View</h1>
    </>
  )
}
