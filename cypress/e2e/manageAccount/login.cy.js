describe('Login Functionality', () => {

  beforeEach(() => {
    cy.visit('https://o2.openmrs.org/openmrs/referenceapplication/login.page') // ke halaman login
  })

  it('should display the login page', () => {
    cy.url().should('include', '/login') // pastikan URLnya benar
    cy.get('.w-auto').should('contain', 'Login') // pastikan ada tulisan Login
  })

  it('should login successfully with valid credentials', () => {
    cy.get('#username').type('admin') // isi username
    cy.get('#password').type('Admin123') // isi password
    cy.get('#Pharmacy').click() // pilih lokasi
    cy.get('#loginButton').click() // klik tombol login

    // Assertion setelah login
    cy.url().should('include', '/home') // pastikan URLnya benar
    cy.contains('Logout').should('be.visible') // pastikan ada tulisan Logout
    cy.get('span#selected-location').should('have.text', 'Pharmacy') // pastikan ada tulisan Pharmacy
    cy.get('h4').contains('Logged in as Super User (admin) at Pharmacy.')
    cy.get('#apps a').should('have.length.greaterThan', 8)
  })

  it('should show error message with invalid credentials', () => {
    cy.get('#username').type('invalidUser') // isi username
    cy.get('#password').type('wrongPassword') // isi password
    cy.get('#Laboratory').click() // pilih lokasi
    cy.get('#loginButton').click() // klik tombol login

    // Assertion error message
    cy.get('#error-message')
      .should('be.visible')
      .and('contain', 'Invalid username/password. Please try again.')
  })

  it('should require location', () => {
    cy.get('#username').type('admin') // isi username
    cy.get('#password').type('Admin123') // isi password
    cy.get('#loginButton').click() // klik tombol login

    // Assertion error message
    cy.get('#sessionLocationError')
      .should('be.visible')
      .and('contain', 'You must choose a location!')
  })

  it('cannot login link', () => {
    cy.get('#cantLogin').click()

    // Assertion dialog instructions
    cy.get('.dialog-instructions')
      .should('be.visible')
      .and('contain', 'Please contact your System Administrator.')
    cy.get('.dialog-content > .confirm').click()
  })
})
