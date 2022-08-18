import * as React from 'react'
import { useVx } from '../../hooks/use-vx'

export interface TextProps {
  style: React.CSSProperties
}

export function Text({ style }: TextProps) {
  const color = useVx({
    base: 'red',
    md: 'green',
  })
  const fontSize = useVx({
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
