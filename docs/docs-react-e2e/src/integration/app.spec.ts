import { TBreakpointsTrack } from './types'
import { HEIGHT_VIEWPORT } from './constants'

describe('docs-react', () => {
  /**
   * Default Breakpoints (Media: MIN)
   */
  beforeEach(() => cy.visit('/__test__'))
  describe('should display the appropriate value for Default Breakpoints (Media: MIN)', () => {
    it('should display (base, xs, sm, md, lg, xl) values', () => {
      cy.fixture('db-min-first.json')
        .its('data')
        .then((list: TBreakpointsTrack) => {
          list.forEach(({ width, value }) => {
            cy.viewport(width, HEIGHT_VIEWPORT)
            cy.get('[data-testid=db-min-first').should('have.text', value)
          })
        })
    })
    it('should display (base, base, base, md, md, md) values', () => {
      cy.fixture('db-min-second.json')
        .its('data')
        .then((list: TBreakpointsTrack) => {
          list.forEach(({ width, value }) => {
            cy.viewport(width, HEIGHT_VIEWPORT)
            cy.get('[data-testid=db-min-second').should('have.text', value)
          })
        })
    })
    it('should display (undefined, xs, xs, md, md, md) values', () => {
      cy.fixture('db-min-third.json')
        .its('data')
        .then((list: TBreakpointsTrack) => {
          list.forEach(({ width, value }) => {
            cy.viewport(width, HEIGHT_VIEWPORT)
            cy.get('[data-testid=db-min-third').should('have.text', value)
          })
        })
    })
    it('should display (undefined, undefined, undefined, undefined, undefined, undefined) values', () => {
      cy.fixture('db-min-fourth.json')
        .its('data')
        .then((list: TBreakpointsTrack) => {
          list.forEach(({ width, value }) => {
            cy.viewport(width, HEIGHT_VIEWPORT)
            cy.get('[data-testid=db-min-fourth').should('have.text', value)
          })
        })
    })
  })
})
