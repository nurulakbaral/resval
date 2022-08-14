// import { useCounter as useCounterDev } from 'foo'
import { useCounter as useCounterProd } from '../../../../dist/packages/foo'

export default function About() {
  //   const { count, increment } = useCounterDev()
  const { count, increment } = useCounterProd()
  return (
    <div>
      <h1>Hello World!</h1>
      <h2>Count: {count}</h2>
      <button onClick={increment}>inc</button>
    </div>
  )
}
