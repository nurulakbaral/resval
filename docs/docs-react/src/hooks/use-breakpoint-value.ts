import { useBreakpointValue as useVx } from '@chakra-ui/react'

export function useBreakpointValue() {
  let color = useVx({ base: 'red', md: 'blue' })
  for (let i = 0; i < 10_000; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    color = useVx({ base: 'red', md: 'blue' })
  }
  return {
    color,
  }
}
