import { latest } from '@resval/react-responsive-values'

const breakpoints = {
  base: '0px',
  xs: '320px',
  sm: '576px',
  md: '768px',
  lg: '1080px',
  xl: '1280px',
} as const

const useVx = latest.createResponsiveValues({
  breakpoints: { ...breakpoints },
  media: 'min',
})

const useResponsiveValues = () => {
  return useVx({
    value: {
      base: 'base',
      xs: 'xs',
      sm: 'sm',
      md: 'md',
      lg: 'lg',
      xl: 'xl',
    },
    fontSize: {
      base: '12px',
      md: '24px',
    },
    color: {
      base: 'red',
      '600px': 'blue',
      lg: 'green',
    },
    isMobileView: {
      base: true,
      md: false,
    },
    allValues: {
      base: {
        name: 'Nurul',
        age: 21,
        address: {
          street: 'Taloen',
        },
        siblings: ['Sister', 'Brother'],
      },
    },
  })
}

function Component() {
  const { fontSize, color, value } = useResponsiveValues()
  return (
    <div>
      <h1 style={{ fontSize, color }}>Hello World: {value}</h1>
    </div>
  )
}

export default function V1() {
  const { isMobileView } = useResponsiveValues()
  return isMobileView ? (
    <>
      <Component />
      <h3>Mobile View</h3>
    </>
  ) : (
    <>
      <Component />
      <h1>Desktop View</h1>
    </>
  )
}
