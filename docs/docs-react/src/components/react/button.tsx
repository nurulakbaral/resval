import * as React from 'react'
import { useVx } from '../../hooks/use-vx'

export interface ButtonProps {
  style: React.CSSProperties
}

export function Button({ style }: ButtonProps) {
  const rounded = useVx({
    base: '4px',
    md: '8px',
  })
  const width = useVx({
    base: '200px',
    md: '100%',
  })
  const backgroundColor = useVx({
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
