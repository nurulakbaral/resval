/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import { useVx } from '../hooks/use-vx'

export function Text(props: any) {
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
        color,
        fontSize,
      }}
    >
      Hello Resval!
    </h1>
  )
}
