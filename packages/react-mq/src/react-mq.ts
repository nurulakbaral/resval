/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'

const noop = (...params: any) => {}

const mockEnv: any = {
  matchMedia() {
    return {
      matches: false,
      addListener: noop,
      removeListener: noop,
    }
  },
  addEventListener: noop,
  removeEventListener: noop,
}

export function useMediaQueryHooks(query: string): boolean {
  const env = typeof window !== 'undefined' ? window : mockEnv
  const getMatches = (query: string): boolean => {
    return env.matchMedia(query).matches
  }

  const [matches, setMatches] = React.useState<boolean>(getMatches(query))

  function handleChange() {
    setMatches(getMatches(query))
  }

  React.useEffect(() => {
    const matchMedia = env.matchMedia(query)

    // Triggered at the first client-side load and if query changes
    handleChange()

    // Listen matchMedia
    matchMedia.addEventListener('change', handleChange)

    return () => {
      matchMedia.removeEventListener('change', handleChange)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return matches
}
