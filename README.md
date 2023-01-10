# Resval

Resval stands for Responsive Values, which is a hook that can return a value based on the current breakpoint. This hook can also respond to the size of the window.

### Why?

⚛️ React Responsive Values (Combine with themes from UI Libs, such as MUI, Chakra UI, etc)\
🐳 Full TypeScript Support!\
🤠 Arbitrary Breakpoints!\
⚡ Optimized Performance!

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

const useVx = createResponsiveValues({
  breakpoints: {
    base: '0px',
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '1080px',
    xl: '1280px',
  },
  media: 'min',
})

const useResval = () => {
  return useVx({
    fontSize: {
      base: '12px',
      md: '24px',
    },
    color: {
      base: 'red',
      '600px': 'blue',
      lg: 'black',
    },
    isMobileView: {
      base: true,
      md: false,
    },
  })
}

export function Component() {
  const { fontSize, color } = useResval()
  return (
    <div>
      <h1 style={{ fontSize, color }}>Hello World!</h1>
    </div>
  )
}

export default function About() {
  const { isMobileView } = useResval()
  return isMobileView ? <h3>Mobile View</h3> : <h1>Desktop View</h1>
}
```

# Contributing

# Story

- Better abstraction in v1.0 - [Read More](https://github.com/nurulakbaral/resval/pull/4)
- Rendering optimization in v1.0 - [Read More](https://github.com/nurulakbaral/resval/pull/5)
