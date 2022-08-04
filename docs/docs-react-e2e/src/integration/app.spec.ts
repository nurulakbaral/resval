import { TBreakpointsTract } from './types'
describe('docs-react', () => {
  const HEIGHT_VIEWPORT = 1000
  /**
   * Default Breakpoints (Media: MIN)
   */

  beforeEach(() => cy.visit('/__test__'))
  it('should display the appropriate value for Default Breakpoints (Media: MIN)', () => {
    cy.fixture('bd-min-first.json')
      .its('data')
      .then((list: TBreakpointsTract) => {
        list.forEach(({ width, value }) => {
          cy.viewport(width, HEIGHT_VIEWPORT)
          cy.get('[data-testid=db-min-first').contains(value)
        })
      })
  })
})
