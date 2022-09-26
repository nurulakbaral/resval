/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react'
// v0.1.0
import { useVxV0 } from '../hooks/use-vx-v0'
// v1.0.0
import { useVxV1 } from '../hooks/use-vx-v1'

export default function Home() {
  const [, forceRender] = React.useState(false)

  // For v1-beta without cache!
  // WIN! 🏆 in initial render

  const values = useVxV1()

  // For v0 With cache!
  // WIN! 🏆 in re-render (cause of cache)

  //   for (let i = 0; i < 10_000; i++) {
  //     // eslint-disable-next-line react-hooks/rules-of-hooks
  //     useVxV0({
  //       base: '0px',
  //       xs: '320px',
  //     })
  //   }

  return (
    <div>
      <h1>Hello World!</h1>
      <button onClick={() => forceRender((r) => !r)}>Render</button>
    </div>
  )
}
