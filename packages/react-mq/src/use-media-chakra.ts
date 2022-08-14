/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import { useEffect, useState } from 'react'

const noop = () => {}
export function isFunction<T extends Function = Function>(value: any): value is T {
  return typeof value === 'function'
}

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

export type UseMediaQueryOptions = {
  fallback?: boolean | boolean[]
  ssr?: boolean
}

/**
 * React hook that tracks state of a CSS media query
 *
 * @param query the media query to match
 * @param options the media query options { fallback, ssr }
 */
export function useMediaQueryChakra(query: string | string[], options: UseMediaQueryOptions = {}): boolean[] {
  const { ssr = true, fallback } = options

  const env = useEnvironment()

  const queries = Array.isArray(query) ? query : [query]

  let fallbackValues = Array.isArray(fallback) ? fallback : [fallback]
  fallbackValues = fallbackValues.filter((v) => v != null) as boolean[]

  const [value, setValue] = useState(() => {
    return queries.map((query, index) => ({
      media: query,
      matches: ssr ? !!fallbackValues[index] : env.window.matchMedia(query).matches,
    }))
  })

  useEffect(() => {
    setValue(
      queries.map((query) => ({
        media: query,
        matches: env.window.matchMedia(query).matches,
      })),
    )

    const mql = queries.map((query) => env.window.matchMedia(query))

    const handler = (evt: MediaQueryListEvent) => {
      setValue((prev) => {
        return prev.slice().map((item) => {
          if (item.media === evt.media) return { ...item, matches: evt.matches }
          return item
        })
      })
    }

    mql.forEach((mql) => {
      if (isFunction(mql.addListener)) mql.addListener(handler)
      else mql.addEventListener('change', handler)
    })

    return () => {
      mql.forEach((mql) => {
        if (isFunction(mql.removeListener)) mql.removeListener(handler)
        else mql.removeEventListener('change', handler)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [env.window])

  return value.map((item) => item.matches)
}
