import * as React from 'react'
import { latest } from '@resval/react-responsive-values'

const useVx = latest.createResponsiveValues({
  breakpoints: {
    base: '0px',
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '1080px',
    xl: '1280px',
  },
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
    },
    fontSize: {
      base: '12px',
      md: '24px',
    },
    color: {
      base: 'red',
      '600px': 'blue',
      lg: 'green',
    },
    isMobileView: {
      base: true,
      md: false,
    },
  })
}

export default function Home() {
  const [state, forceRender] = React.useState(0)
  const { fontSize, color, value } = useResponsiveValues()
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
      <h2>{state}</h2>
      <button onClick={() => forceRender((r) => ++r)}>Click</button>
    </div>
  )
}
