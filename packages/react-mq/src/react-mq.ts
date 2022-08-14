/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'

const noop = () => {}

const ssrDocument: any = {
  body: {
    classList: {
      add() {},
      remove() {},
    },
  },
  addEventListener() {},
  removeEventListener() {},
  activeElement: {
    blur() {},
    nodeName: '',
  },
  querySelector() {
    return null
  },
  querySelectorAll() {
    return []
  },
  getElementById() {
    return null
  },
  createEvent() {
    return {
      initEvent() {},
    }
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName() {
        return []
      },
    }
  },
}

const ssrWindow: any = {
  document: ssrDocument,
  navigator: {
    userAgent: '',
  },
  CustomEvent: function CustomEvent() {
    return this
  },
  addEventListener: noop,
  removeEventListener: noop,
  getComputedStyle() {
    return {
      getPropertyValue() {
        return ''
      },
    }
  },
  matchMedia() {
    return {
      matches: false,
      addListener: noop,
      removeListener: noop,
    }
  },
  requestAnimationFrame(callback: () => void) {
    if (typeof setTimeout === 'undefined') {
      callback()
      return null
    }
    return setTimeout(callback, 0)
  },
  cancelAnimationFrame(id: number) {
    if (typeof setTimeout === 'undefined') return
    clearTimeout(id)
  },
  setTimeout: () => 0,
  clearTimeout: noop,
  setInterval: () => 0,
  clearInterval: noop,
}

const mockEnv = {
  window: ssrWindow,
  document: ssrDocument,
}

export function useEnvironment() {
  return typeof window !== 'undefined' ? { window, document } : mockEnv
}

export function useMediaQueryHooks(query: string): boolean {
  const env = useEnvironment()
  const getMatches = (query: string): boolean => {
    return env.window.matchMedia(query).matches
  }

  const [matches, setMatches] = React.useState<boolean>(getMatches(query))

  function handleChange() {
    setMatches(getMatches(query))
  }

  React.useEffect(() => {
    const matchMedia = env.window.matchMedia(query)

    // Triggered at the first client-side load and if query changes
    handleChange()

    // Listen matchMedia
    matchMedia.addEventListener('change', handleChange)

    return () => {
      matchMedia.removeEventListener('change', handleChange)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return matches
}
