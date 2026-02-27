/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when username is empty
 *   - should display alert when password is empty
 *   - should display alert when username and password are wrong
 *   - should display homepage when username and password are correct
 */
describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('should display login page correctly', () => {
    cy.get('input[placeholder="Enter email"]').should('be.visible')
    cy.get('input[placeholder="Enter password"]').should('be.visible')
    cy.get('button').contains(/^Login$/).should('be.visible')
  })

  it('should display alert when email is empty', () => {
    cy.get('button').contains(/^Login$/).click()

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty')
    })
  })

  it('should display alert when password is empty', () => {
    cy.get('input[placeholder="Enter email"]').type('testuser@test.com')

    cy.get('button').contains(/^Login$/).click()

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty')
    })
  })

  it('should display alert when email and password are wrong', () => {
    cy.get('input[placeholder="Enter email"]').type('testuser@test.com')

    cy.get('input[placeholder="Enter password"]').type('wrong_password')

    cy.get('button').contains(/^Login$/).click()

    cy.on('window:alert', (str) => {
      expect(str).to.equal('User email or password is wrong')
    })
  })

  it('should display homepage when username and password are correct', () => {
    cy.intercept('POST', '**/login').as('loginRequest')

    cy.get('input[placeholder="Enter email"]')
      .type('angelz28@angelz28.com')

    cy.get('input[placeholder="Enter password"]')
      .type('123456')

    cy.get('button').contains(/^Login$/).click()

    cy.wait('@loginRequest')

    cy.contains('Logout').should('be.visible')
    cy.contains('Halo,').should('be.visible')
  })
})
