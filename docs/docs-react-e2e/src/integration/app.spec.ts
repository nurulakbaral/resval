describe('docs-react', () => {
  const HEIGHT_VIEWPORT = 1000
  /**
   * Default Breakpoints (Media: MIN)
   */
  const breakpointsDefaultMinFirst = [
    {
      width: 280,
      value: 'val: base',
    },
    {
      width: 350,
      value: 'val: xs',
    },
    {
      width: 576,
      value: 'val: sm',
    },
    {
      width: 768,
      value: 'val: md',
    },
    {
      width: 1080,
      value: 'val: lg',
    },
    {
      width: 1280,
      value: 'val: xl',
    },
  ]
  beforeEach(() => cy.visit('/__test__'))
  it('should display the appropriate value for Default Breakpoints (Media: MIN)', () => {
    breakpointsDefaultMinFirst.forEach(({ width, value }) => {
      cy.viewport(width, HEIGHT_VIEWPORT)
      cy.get('[data-testid=db-min-first').contains(value)
    })
  })
})
