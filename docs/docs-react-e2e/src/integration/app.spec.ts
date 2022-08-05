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
  describe('should display the appropriate value for Default Breakpoints (Media: MAX)', () => {
    it('should display (base, xs, sm, md, lg, xl) values', () => {
      cy.fixture('db-max-first.json')
        .its('data')
        .then((list: TBreakpointsTrack) => {
          list.forEach(({ width, value }) => {
            cy.viewport(width, HEIGHT_VIEWPORT)
            cy.get('[data-testid=db-max-first').should('have.text', value)
          })
        })
    })
    it('should display (base, md, md, md, undefined, undefined) values', () => {
      cy.fixture('db-max-second.json')
        .its('data')
        .then((list: TBreakpointsTrack) => {
          list.forEach(({ width, value }) => {
            cy.viewport(width, HEIGHT_VIEWPORT)
            cy.get('[data-testid=db-max-second').should('have.text', value)
          })
        })
    })
    it('should display (xs, xs, md, md, undefined, undefined) values', () => {
      cy.fixture('db-max-third.json')
        .its('data')
        .then((list: TBreakpointsTrack) => {
          list.forEach(({ width, value }) => {
            cy.viewport(width, HEIGHT_VIEWPORT)
            cy.get('[data-testid=db-max-third').should('have.text', value)
          })
        })
    })
    it('should display (undefined, undefined, undefined, undefined, undefined, undefined) values', () => {
      cy.fixture('db-max-fourth.json')
        .its('data')
        .then((list: TBreakpointsTrack) => {
          list.forEach(({ width, value }) => {
            cy.viewport(width, HEIGHT_VIEWPORT)
            cy.get('[data-testid=db-max-fourth').should('have.text', value)
          })
        })
    })
  })
})
