describe('Sign In Functionality', () => {

  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.visit('https://job-portal-user-dev-skx7zw44dq-et.a.run.app/sign-in?returnUrl=%2F') // ke halaman sign in
  })

  it('should display the sign in page', () => {
    cy.url().should('include', '/sign-in') // pastikan URLnya benar
    cy.get('h1').should('contain', 'Sign In') // pastikan ada tulisan Sign In
  })

  it('should sign in successfully with valid credentials', () => {
    cy.get('#basic_email').type('eyalia@gmail.com') // isi email
    cy.get('#basic_password').type('eyalia123!!') // isi password
    cy.get('button').contains('Sign In').click() // klik tombol sign in

    // Assertion success
    cy.wait(5000)
    cy.get('.ant-message-success').should('exist').and('contain.text', 'Sign in success') // muncul toast sign in success
    cy.get('img[alt="user photo"]').should('be.visible').click() // pastikan muncul user photo ketika berhasil sign in
    cy.contains('Keluar').should('be.visible') // pastikan ada tulisan Keluar
  })

  it('should show error message with wrong password', () => {
    cy.get('#basic_email').type('eyalia@gmail.com') // isi email
    cy.get('#basic_password').type('eyalia123!!1') // isi password
    cy.get('button').contains('Sign In').click() // klik tombol sign in

    // Assertion error message
    cy.get('.flex.flex-col.items-start').should('exist').and('contain.text', 'Password WRONG');
  })

  it('should show error message with wrong email', () => {
    cy.get('#basic_email').type('eyalia1@gmail.com') // isi email
    cy.get('#basic_password').type('eyalia123!!') // isi password
    cy.get('button').contains('Sign In').click() // klik tombol sign in

    // Assertion error message
    cy.get('.flex.flex-col.items-start').should('exist').and('contain.text', 'Email Not found');
  })

  it('should show error message with blank data', () => {
    cy.get('button').contains('Sign In').click() // klik tombol sign in

    // Assertion error message
    cy.get('#basic_email_help > .ant-form-item-explain-error').should('contain.text', 'Missing email');
    cy.get('#basic_password_help > .ant-form-item-explain-error').should('contain.text', 'Missing password');
  })

  it('should show error message with wrong format email', () => {
    cy.get('#basic_email').type('eyalia1gmail.com') // isi email
    cy.get('#basic_password').type('eyalia123!!') // isi password
    cy.get('button').contains('Sign In').click() // klik tombol sign in

    // Assertion error message
    cy.get('#basic_email_help > .ant-form-item-explain-error').should('contain.text', 'Invalid email format');
  })

  it('should show error message with wrong format password', () => {
    cy.get('#basic_email').type('eyalia@gmail.com') // isi email
    cy.get('#basic_password').type('eya') // isi password
    cy.get('button').contains('Sign In').click() // klik tombol sign in

    // Assertion error message
    cy.get('#basic_password_help > .ant-form-item-explain-error').should('contain.text', 'Password must be at least 8 characters');
  })

  it('should show forgot password page', () => {
    cy.get('a[href="/forgot-password"]').click() // klik tombol forget password

    // Assertion success
    cy.url().should('include', '/forgot-password') // pastikan URLnya benar
  })

  it('should show register page', () => {
    cy.get('a[href="/sign-up?returnUrl=%2F"]').click() // klik tombol forget password

    // Assertion success
    cy.url().should('include', '/sign-up') // pastikan URLnya benar
  })
})
