/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react'
// v0.1.0
// import { useVxV0 } from '../hooks/use-vx-v0'
// v1.0.0
import { useVxV1 } from '../hooks/use-vx-v1'

export default function Home() {
  const [state, forceRender] = React.useState(0)
  const { color1 } = useVxV1()

  return (
    <div>
      <h1>Hello World!</h1>
      <button onClick={() => forceRender((r) => ++r)}>Render</button>
      <h1
        style={{
          color: color1,
        }}
      >
        state {state}
      </h1>
    </div>
  )
}
