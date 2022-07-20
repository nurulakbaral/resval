import { render } from '@testing-library/react'

import ReactResponsiveValues from './react-responsive-values'

describe('ReactResponsiveValues', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactResponsiveValues />)
    expect(baseElement).toBeTruthy()
  })
})
