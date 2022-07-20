import { useResponsiveValues } from '@resval/react-responsive-values'

export default function Home() {
  const resval = useResponsiveValues()
  return (
    <div>
      <h1>Hello Home</h1>
      <p>{resval}</p>
    </div>
  )
}
