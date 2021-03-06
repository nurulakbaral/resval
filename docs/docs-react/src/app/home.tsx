import { createResponsiveValues } from '@resval/react-responsive-values'

const MEDIA = 'min'

export function useResponsiveValues() {
  return createResponsiveValues({
    media: MEDIA,
  })
}

export default function Home() {
  const vx = useResponsiveValues()
  const sizes = vx({
    base: '0px',
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '1080px',
    xl: '1280px',
    '600px': '600px',
    '900px': '900px',
  })
  const colors = vx({
    base: 'red',
    md: 'aqua',
    '900px': 'gray',
    '600px': 'blue',
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
        {MEDIA}: {sizes}
      </p>
    </div>
  )
}
