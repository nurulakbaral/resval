import { createResponsiveValues } from '@resval/react-responsive-values'

// FIXME: Add type for breakpointsQuery
export function useVx(breakpointsQuery: Record<string, string>) {
  return createResponsiveValues({
    media: 'min',
  })(breakpointsQuery)
}

export default function Home() {
  const value = useVx({
    base: 'base',
    sm: 'sm',
    md: 'md',
  })
  return (
    <div>
      <h1>Hello Home</h1>
      <p
        style={{
          textAlign: 'center',
          fontSize: '64px',
        }}
      >
        The value: {value as string}
      </p>
    </div>
  )
}
