/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react'
import { useBreakpointValue } from '../hooks/use-breakpoint-value'
import { useVx } from '../hooks/use-vx'

export default function Benchamark() {
  const [count, setCount] = React.useState(0)
  const { color1: color, value } = useVx()
  // From Chakra UI
  // const { color } = useBreakpointValue()

  return (
    <div>
      <h1>Hello Benchmark</h1>
      <button onClick={() => setCount((r) => ++r)}>Render</button>
      <h1 style={{ color }}>Count: {count}</h1>
      <h1>{color}</h1>
    </div>
  )
}
