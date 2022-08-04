import { TBreakpointsTrack } from './types'
import { HEIGHT_VIEWPORT } from './constants'

describe('docs-react', () => {
  /**
   * Default Breakpoints (Media: MIN)
   */
  beforeEach(() => cy.visit('/__test__'))
  it('should display the appropriate value for Default Breakpoints (Media: MIN)', () => {
    cy.fixture('db-min-first.json')
      .its('data')
      .then((list: TBreakpointsTrack) => {
        list.forEach(({ width, value }) => {
          cy.viewport(width, HEIGHT_VIEWPORT)
          cy.get('[data-testid=db-min-first').contains(value)
        })
      })
    cy.fixture('db-min-second.json')
      .its('data')
      .then((list: TBreakpointsTrack) => {
        list.forEach(({ width, value }) => {
          cy.viewport(width, HEIGHT_VIEWPORT)
          cy.get('[data-testid=db-min-second').contains(value)
        })
      })
    cy.fixture('db-min-third.json')
      .its('data')
      .then((list: TBreakpointsTrack) => {
        list.forEach(({ width, value }) => {
          cy.viewport(width, HEIGHT_VIEWPORT)
          cy.get('[data-testid=db-min-third').contains(value)
        })
      })
    cy.fixture('db-min-fourth.json')
      .its('data')
      .then((list: TBreakpointsTrack) => {
        list.forEach(({ width, value }) => {
          cy.viewport(width, HEIGHT_VIEWPORT)
          cy.get('[data-testid=db-min-fourth').contains(value)
        })
      })
  })
})
