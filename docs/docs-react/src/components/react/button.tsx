import * as React from 'react'
import { useVxV0 } from '../../hooks/use-vx-v0'

export interface ButtonProps {
  style: React.CSSProperties
}

export function Button({ style }: ButtonProps) {
  const rounded = useVxV0({
    base: '4px',
    md: '8px',
  })
  const width = useVxV0({
    base: '200px',
    md: '100%',
  })
  const backgroundColor = useVxV0({
    base: '#4338ca',
    md: '#6d28d9',
  })
  return (
    <button
      style={{
        color: 'white',
        padding: '12px 0',
        fontFamily: 'sans-serif',
        width,
        borderRadius: rounded,
        border: '0px',
        backgroundColor,
        ...style,
      }}
    >
      Button
    </button>
  )
}
