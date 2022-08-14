# Resval

Resval stands for Responsive Values, which is a hook that can return a value based on the current breakpoint. This hook can also respond to the size of the window.

### Why?

⚛️ React Responsive Values (Can be combined with breakpoints from the Libs UI theme)\
🐳 Full TypeScript Support!\
📦 Zero-Dependency!\
🤠 Arbitrary Breakpoints!

# Installation

```sh
$ yarn add @resval/react-responsive-values

# or

$ npm i @resval/react-responsive-values
```

# Documentation

### Quick Start

```jsx
import { createResponsiveValues } from '@resval/react-responsive-values'

const breakpoints = {
  base: '0px',
  xs: '320px',
  sm: '576px',
  md: '768px',
  lg: '1080px',
  xl: '1280px',
}

const useVx = createResponsiveValues({
  breakpoints: { ...breakpoints },
  media: 'min',
})

export function Component() {
  const fontSize = useVx({ base: '12px', md: '24px' })
  const color = useVx({ base: 'red', '600px': 'blue', lg: 'black' })
  return (
    <div>
      <h1 style={{ fontSize, color }}>Hello World!</h1>
    </div>
  )
}

export default function About() {
  const isMobileView = useVx({ base: true, md: false })
  return isMobileView ? <h3>Mobile View</h3> : <h1>Desktop View</h1>
}
```

# Contributing
