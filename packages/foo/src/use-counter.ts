import * as React from 'react'

export default function useCounter() {
  const [count, setCount] = React.useState(0)
  return {
    count,
    setCount,
  }
}
