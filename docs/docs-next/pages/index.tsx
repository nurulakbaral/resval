import * as React from 'react'
import { latest } from '@resval/react-responsive-values'

const breakpoints = {
  base: '0px',
  xs: '320px',
  sm: '576px',
  md: '768px',
  lg: '1080px',
  xl: '1280px',
} as const

const useVx = latest.createResponsiveValues({
  breakpoints: { ...breakpoints },
  media: 'min',
})

const useResponsiveValues = () => {
  return useVx({
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
      lg: 'green',
    } as const,
    isMobileView: {
      base: true,
      md: false,
    } as const,
  })
}

export default function Home() {
  const [, forceRender] = React.useState(false)
  const { fontSize, color, value } = useResponsiveValues()
  console.log('render')
  return (
    <div>
      <h1
        style={{
          fontSize,
          color,
        }}
      >
        {value}
      </h1>
      <button onClick={() => forceRender((r) => !r)}>Render</button>
    </div>
  )
}
