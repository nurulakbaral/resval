import { createResponsiveValues } from '@resval/react-responsive-values'

export function useResponsiveValues() {
  return createResponsiveValues({
    media: 'min',
  })
}

export default function Home() {
  const vx = useResponsiveValues()

  const sizes = vx({
    base: 'base',
    xs: 'xs',
    md: 'md',
  })

  const colors = vx({
    base: 'red',
    md: 'aqua',
  })

  const textAlign = vx({
    xs: 'left',
    md: 'center',
  })

  return (
    <div>
      <h1>Hello Home</h1>
      <p
        style={{
          backgroundColor: colors,
          fontSize: '64px',
          textAlign: textAlign,
        }}
      >
        The value: {sizes}
      </p>
    </div>
  )
}
