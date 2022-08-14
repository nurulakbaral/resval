/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMediaQueryChakra, useMediaQueryHooks } from 'react-mq'

export default function Index() {
  // const chakraValue = useMediaQueryChakra('(min-width: 768px)')
  const hooksValue = useMediaQueryHooks('(min-width: 768px)')
  return (
    <>
      {/* <div>Value Chakra: {`${chakraValue}`}</div> */}
      <div>Value Hooks: {`${hooksValue}`}</div>
    </>
  )
}
