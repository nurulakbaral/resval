/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react'
import { useVxOptimized } from '../hooks/use-resval-optimized'

export default function Optimized() {
  const [count, setCount] = React.useState(0)
  const { color1 } = useVxOptimized()

  return (
    <div>
      <h1>Hello OPTIMIZED!</h1>
      <button onClick={() => setCount((r) => ++r)}>Count</button>
      <h1
        style={{
          color: color1,
        }}
      >
        Count: {count}
      </h1>
    </div>
  )
}
