/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react'
import { useVx } from '../hooks/use-vx'

export default function Resval() {
  const [count, setCount] = React.useState(0)
  const { color1 } = useVx()

  return (
    <div>
      <h1>Hello Resval!!</h1>
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
