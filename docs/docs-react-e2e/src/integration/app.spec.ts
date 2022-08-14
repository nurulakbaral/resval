import { TBreakpointsTrack } from './types'
import { HEIGHT_VIEWPORT, SET_VIEWPORT } from './constants'
/* eslint-disable cypress/no-unnecessary-waiting */

describe('docs-react', () => {
  /**
   * Default Breakpoints (Media: MIN)
   */
  beforeEach(() => cy.visit('/__test__'))
  describe('should display the appropriate value for Default Breakpoints (Media: MIN)', () => {
    it('should display for first values', () => {
      cy.fixture('db-min-first.json')
        .its('data')
        .then((list: TBreakpointsTrack) => {
          list.forEach(({ width, value }) => {
            cy.viewport(width, HEIGHT_VIEWPORT)
            cy.wait(SET_VIEWPORT)
            cy.get('[data-testid=db-min-first').should('have.text', value)
          })
        })
    })
    it('should display for second values', () => {
      cy.fixture('db-min-second.json')
        .its('data')
        .then((list: TBreakpointsTrack) => {
          list.forEach(({ width, value }) => {
            cy.viewport(width, HEIGHT_VIEWPORT)
            cy.wait(SET_VIEWPORT)
            cy.get('[data-testid=db-min-second').should('have.text', value)
          })
        })
    })
    it('should display for third values', () => {
      cy.fixture('db-min-third.json')
        .its('data')
        .then((list: TBreakpointsTrack) => {
          list.forEach(({ width, value }) => {
            cy.viewport(width, HEIGHT_VIEWPORT)
            cy.wait(SET_VIEWPORT)
            cy.get('[data-testid=db-min-third').should('have.text', value)
          })
        })
    })
    it('should display for fourth values', () => {
      cy.fixture('db-min-fourth.json')
        .its('data')
        .then((list: TBreakpointsTrack) => {
          list.forEach(({ width, value }) => {
            cy.viewport(width, HEIGHT_VIEWPORT)
            cy.wait(SET_VIEWPORT)
            cy.get('[data-testid=db-min-fourth').should('have.text', value)
          })
        })
    })
  })
  describe('should display the appropriate value for Default Breakpoints (Media: MAX)', () => {
    it('should display first values', () => {
      cy.fixture('db-max-first.json')
        .its('data')
        .then((list: TBreakpointsTrack) => {
          list.forEach(({ width, value }) => {
            cy.viewport(width, HEIGHT_VIEWPORT)
            cy.wait(SET_VIEWPORT)
            cy.get('[data-testid=db-max-first').should('have.text', value)
          })
        })
    })
    it('should display second values', () => {
      cy.fixture('db-max-second.json')
        .its('data')
        .then((list: TBreakpointsTrack) => {
          list.forEach(({ width, value }) => {
            cy.viewport(width, HEIGHT_VIEWPORT)
            cy.wait(SET_VIEWPORT)
            cy.get('[data-testid=db-max-second').should('have.text', value)
          })
        })
    })
    it('should display third values', () => {
      cy.fixture('db-max-third.json')
        .its('data')
        .then((list: TBreakpointsTrack) => {
          list.forEach(({ width, value }) => {
            cy.viewport(width, HEIGHT_VIEWPORT)
            cy.wait(SET_VIEWPORT)
            cy.get('[data-testid=db-max-third').should('have.text', value)
          })
        })
    })
    it('should display fourth values', () => {
      cy.fixture('db-max-fourth.json')
        .its('data')
        .then((list: TBreakpointsTrack) => {
          list.forEach(({ width, value }) => {
            cy.viewport(width, HEIGHT_VIEWPORT)
            cy.wait(SET_VIEWPORT)
            cy.get('[data-testid=db-max-fourth').should('have.text', value)
          })
        })
    })
  })
  describe('should display the appropriate value for Custom Breakpoints (Media: MIN)', () => {
    it('should display first values', () => {
      cy.fixture('cb-min-first.json')
        .its('data')
        .then((list: TBreakpointsTrack) => {
          list.forEach(({ width, value }) => {
            cy.viewport(width, HEIGHT_VIEWPORT)
            cy.wait(SET_VIEWPORT)
            cy.get('[data-testid=cb-min-first').should('have.text', value)
          })
        })
    })
    it('should display second values', () => {
      cy.fixture('cb-min-second.json')
        .its('data')
        .then((list: TBreakpointsTrack) => {
          list.forEach(({ width, value }) => {
            cy.viewport(width, HEIGHT_VIEWPORT)
            cy.wait(SET_VIEWPORT)
            cy.get('[data-testid=cb-min-second').should('have.text', value)
          })
        })
    })
    it('should display third values', () => {
      cy.fixture('cb-min-third.json')
        .its('data')
        .then((list: TBreakpointsTrack) => {
          list.forEach(({ width, value }) => {
            cy.viewport(width, HEIGHT_VIEWPORT)
            cy.wait(SET_VIEWPORT)
            cy.get('[data-testid=cb-min-third').should('have.text', value)
          })
        })
    })
    it('should display fourth values', () => {
      cy.fixture('cb-min-fourth.json')
        .its('data')
        .then((list: TBreakpointsTrack) => {
          list.forEach(({ width, value }) => {
            cy.viewport(width, HEIGHT_VIEWPORT)
            cy.wait(SET_VIEWPORT)
            cy.get('[data-testid=cb-min-fourth').should('have.text', value)
          })
        })
    })
    it('should display fifth values', () => {
      cy.fixture('cb-min-fifth.json')
        .its('data')
        .then((list: TBreakpointsTrack) => {
          list.forEach(({ width, value }) => {
            cy.viewport(width, HEIGHT_VIEWPORT)
            cy.wait(SET_VIEWPORT)
            cy.get('[data-testid=cb-min-fifth').should('have.text', value)
          })
        })
    })
    it('should display sixth values', () => {
      cy.fixture('cb-min-sixth.json')
        .its('data')
        .then((list: TBreakpointsTrack) => {
          list.forEach(({ width, value }) => {
            cy.viewport(width, HEIGHT_VIEWPORT)
            cy.wait(SET_VIEWPORT)
            cy.get('[data-testid=cb-min-sixth').should('have.text', value)
          })
        })
    })
    it('should display seventh values', () => {
      cy.fixture('cb-min-seventh.json')
        .its('data')
        .then((list: TBreakpointsTrack) => {
          list.forEach(({ width, value }) => {
            cy.viewport(width, HEIGHT_VIEWPORT)
            cy.wait(SET_VIEWPORT)
            cy.get('[data-testid=cb-min-seventh').should('have.text', value)
          })
        })
    })
  })
  describe('should display the appropriate value for Custom Breakpoints (Media: MAX)', () => {
    it('should display for first values', () => {
      cy.fixture('cb-max-first.json')
        .its('data')
        .then((list: TBreakpointsTrack) => {
          list.forEach(({ width, value }) => {
            cy.viewport(width, HEIGHT_VIEWPORT)
            cy.wait(SET_VIEWPORT)
            cy.get('[data-testid=cb-max-first').should('have.text', value)
          })
        })
    })
    it('should display for second values', () => {
      cy.fixture('cb-max-second.json')
        .its('data')
        .then((list: TBreakpointsTrack) => {
          list.forEach(({ width, value }) => {
            cy.viewport(width, HEIGHT_VIEWPORT)
            cy.wait(SET_VIEWPORT)
            cy.get('[data-testid=cb-max-second').should('have.text', value)
          })
        })
    })
    it('should display for third values', () => {
      cy.fixture('cb-max-third.json')
        .its('data')
        .then((list: TBreakpointsTrack) => {
          list.forEach(({ width, value }) => {
            cy.viewport(width, HEIGHT_VIEWPORT)
            cy.wait(SET_VIEWPORT)
            cy.get('[data-testid=cb-max-third').should('have.text', value)
          })
        })
    })
    it('should display for fourth values', () => {
      cy.fixture('cb-max-fourth.json')
        .its('data')
        .then((list: TBreakpointsTrack) => {
          list.forEach(({ width, value }) => {
            cy.viewport(width, HEIGHT_VIEWPORT)
            cy.wait(SET_VIEWPORT)
            cy.get('[data-testid=cb-max-fourth').should('have.text', value)
          })
        })
    })
    it('should display for fifth values', () => {
      cy.fixture('cb-max-fifth.json')
        .its('data')
        .then((list: TBreakpointsTrack) => {
          list.forEach(({ width, value }) => {
            cy.viewport(width, HEIGHT_VIEWPORT)
            cy.wait(SET_VIEWPORT)
            cy.get('[data-testid=cb-max-fifth').should('have.text', value)
          })
        })
    })
    it('should display for sixth values', () => {
      cy.fixture('cb-max-sixth.json')
        .its('data')
        .then((list: TBreakpointsTrack) => {
          list.forEach(({ width, value }) => {
            cy.viewport(width, HEIGHT_VIEWPORT)
            cy.wait(SET_VIEWPORT)
            cy.get('[data-testid=cb-max-sixth').should('have.text', value)
          })
        })
    })
    it('should display for seventh values', () => {
      cy.fixture('cb-max-seventh.json')
        .its('data')
        .then((list: TBreakpointsTrack) => {
          list.forEach(({ width, value }) => {
            cy.viewport(width, HEIGHT_VIEWPORT)
            cy.wait(SET_VIEWPORT)
            cy.get('[data-testid=cb-max-seventh').should('have.text', value)
          })
        })
    })
  })
})
