import { createResponsiveValues } from '@resval/react-responsive-values'

const breakpoints = {
  base: '0px',
  xs: '320px',
  sm: '576px',
  md: '768px',
  lg: '1080px',
  xl: '1280px',
}

const useVx = createResponsiveValues({
  breakpoints: { ...breakpoints },
  media: 'min',
})

export default function About() {
  const isMobileView = useVx({ base: 'mobile', md: 'desktop' })
  return isMobileView === 'mobile' ? <h3>Mobile View</h3> : <h1>Desktop View</h1>
}
