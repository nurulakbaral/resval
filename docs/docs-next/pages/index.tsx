import { createResponsiveValues } from '@resval/react-responsive-values'
import { createMQ } from 'react-mq'

export const useVx = createResponsiveValues({
  media: 'min',
})

export const useMQ = createMQ('(min-width: 768px)')

export default function Index() {
  const matches = useMQ()
  // const value = useVx({
  //   base: 'hello',
  //   md: 'hai',
  // })
  return <div>Value: {`${matches}`}</div>
}
