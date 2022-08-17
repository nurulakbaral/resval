const defaultBreakpoints = {
  base: {
    name: 'base',
    styles: {
      width: '160px',
      height: '720px',
    },
  },
  xs: {
    name: 'xs',
    styles: {
      width: '320px',
      height: '720px',
    },
  },
  sm: {
    name: 'sm',
    styles: {
      width: '576px',
      height: '720px',
    },
  },
  md: {
    name: 'md',
    styles: {
      width: '768px',
      height: '720px',
    },
  },
  lg: {
    name: 'lg',
    styles: {
      width: '1080px',
      height: '720px',
    },
  },
  xl: {
    name: 'xl',
    styles: {
      width: '1280px',
      height: '720px',
    },
  },
}

export const parameters = {
  viewport: {
    viewports: defaultBreakpoints,
  },
}
