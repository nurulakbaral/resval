import * as React from 'react'
import { useVxV0 } from '../../hooks/use-vx-v0'

export interface TextProps {
  style: React.CSSProperties
}

export function Text({ style }: TextProps) {
  const color = useVxV0({
    base: 'red',
    md: 'green',
  })
  const fontSize = useVxV0({
    base: '24px',
    md: '32px',
  })
  return (
    <h1
      style={{
        fontFamily: 'sans-serif',
        color,
        fontSize,
        ...style,
      }}
    >
      Hello Resval!
    </h1>
  )
}
