import { useMediaQueryChakra, useMediaQueryHooks } from 'react-mq'

export default function Index() {
  const chakraValue = useMediaQueryChakra('(min-width: 768px)')
  // const hooksValue = useMediaQueryHooks('(min-width: 768px)')
  return (
    <>
      <div>Value: {`${chakraValue}`}</div>
      {/* <div>Value: {`${hooksValue}`}</div> */}
    </>
  )
}
