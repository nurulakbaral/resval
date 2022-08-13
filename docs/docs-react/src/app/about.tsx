import { createResponsiveValues } from '@resval/react-responsive-values'

const breakpoints = {
  base: '0px',
  xs: '320px',
  sm: '576px',
  md: '768px',
  lg: '1080px',
  xl: '1280px',
}

export const useVx = createResponsiveValues({
  breakpoints: { ...breakpoints },
  media: 'min',
})

export function Component() {
  const fontSize = useVx({ base: '12px', md: '24px' })
  const color = useVx({ base: 'red', '600px': 'blue', lg: 'black' })
  return (
    <div>
      <h1 style={{ fontSize, color }}>Hello World!</h1>
    </div>
  )
}

export default function About() {
  const isMobileView = useVx({ base: true, md: false })
  return isMobileView ? <h3>Mobile View</h3> : <h1>Desktop View</h1>
}
