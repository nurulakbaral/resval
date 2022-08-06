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
  describe('should display the appropriate value for Custom Breakpoints (Media: MIN)', () => {
    it('should display (base, smallMobile, mediumMobile, largeMobile, tablet, desktop) values', () => {
      cy.fixture('cb-min-first.json')
        .its('data')
        .then((list: TBreakpointsTrack) => {
          list.forEach(({ width, value }) => {
            cy.viewport(width, HEIGHT_VIEWPORT)
            cy.get('[data-testid=cb-min-first').should('have.text', value)
          })
        })
    })
    it('should display (base, base, base, largeMobile, largeMobile, largeMobile) values', () => {
      cy.fixture('cb-min-second.json')
        .its('data')
        .then((list: TBreakpointsTrack) => {
          list.forEach(({ width, value }) => {
            cy.viewport(width, HEIGHT_VIEWPORT)
            cy.get('[data-testid=cb-min-second').should('have.text', value)
          })
        })
    })
    it('should display (undefined, smallMobile, smallMobile, largeMobile, largeMobile, largeMobile) values', () => {
      cy.fixture('cb-min-third.json')
        .its('data')
        .then((list: TBreakpointsTrack) => {
          list.forEach(({ width, value }) => {
            cy.viewport(width, HEIGHT_VIEWPORT)
            cy.get('[data-testid=cb-min-third').should('have.text', value)
          })
        })
    })
    it('should display (base, smallMobile, mediumMobile, 600px, largeMobile, 900px, tablet, desktop) values', () => {
      cy.fixture('cb-min-fourth.json')
        .its('data')
        .then((list: TBreakpointsTrack) => {
          list.forEach(({ width, value }) => {
            cy.viewport(width, HEIGHT_VIEWPORT)
            cy.get('[data-testid=cb-min-fourth').should('have.text', value)
          })
        })
    })
    it('should display (base, base, base, 600px, 600px, 900px, 900px, 900px) values', () => {
      cy.fixture('cb-min-fifth.json')
        .its('data')
        .then((list: TBreakpointsTrack) => {
          list.forEach(({ width, value }) => {
            cy.viewport(width, HEIGHT_VIEWPORT)
            cy.get('[data-testid=cb-min-fifth').should('have.text', value)
          })
        })
    })
    it('should display (undefined, undefined, undefined, 600px, 600px, 900px, 900px, 900px) values', () => {
      cy.fixture('cb-min-sixth.json')
        .its('data')
        .then((list: TBreakpointsTrack) => {
          list.forEach(({ width, value }) => {
            cy.viewport(width, HEIGHT_VIEWPORT)
            cy.get('[data-testid=cb-min-sixth').should('have.text', value)
          })
        })
    })
    it('should display (undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined) values', () => {
      cy.fixture('cb-min-seventh.json')
        .its('data')
        .then((list: TBreakpointsTrack) => {
          list.forEach(({ width, value }) => {
            cy.viewport(width, HEIGHT_VIEWPORT)
            cy.get('[data-testid=cb-min-seventh').should('have.text', value)
          })
        })
    })
  })
})
