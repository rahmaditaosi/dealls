// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('signin', (email = 'eyalia1@gmail.com', password = 'eyalia123!!') => {
    cy.viewport(1920, 1080)
    cy.visit('https://job-portal-user-dev-skx7zw44dq-et.a.run.app/sign-in?returnUrl=%2F')
    cy.get('#basic_email').type(email)
    cy.get('#basic_password').type(password)
    cy.get('button').contains('Sign In').click()
    cy.get('.ant-message-success').should('exist').and('contain.text', 'Sign in success') // muncul toast sign in success
});

Cypress.Commands.add('selectDateRangeNextMonth', (startDay, endDay) => {
    cy.get('.rmdp-arrow-container.rmdp-right').click()
    cy.get('.rmdp-day:not(.rmdp-deactive)').contains(startDay).click()
    cy.get('.rmdp-day:not(.rmdp-deactive)').contains(endDay).click()
});

Cypress.Commands.add('TimeRangeFirst', (startTime, endTime) => {
    cy.get('#proposedTimes_0_startTime').type(startTime)
    cy.get('#proposedTimes_0_endTime').type(endTime)
});

Cypress.Commands.add('TimeRangeSecond', (startTime, endTime) => {
    cy.get('#proposedTimes_1_startTime').type(startTime)
    cy.get('#proposedTimes_1_endTime').type(endTime)
});

Cypress.Commands.add('pilihMentorAvailable', () => {
    cy.visit('https://job-portal-user-dev-skx7zw44dq-et.a.run.app/mentoring')
  
    cy.get('a[class*="MentorCard_mentor_card"]').then(($cards) => {
      const total = $cards.length;
  
      let found = false;
  
      const cobaMentor = (index) => {
        if (index >= total || found) return;
  
        cy.visit('https://job-portal-user-dev-skx7zw44dq-et.a.run.app/mentoring')
        cy.get('a[class*="MentorCard_mentor_card"]').eq(index).click();
        cy.wait(5000)
        cy.get('button').then(($btn) => {
          const btnText = $btn.text().trim();
  
          if (btnText === 'Ajukan Jadwal') {
            found = true;
            cy.get('button').contains('Ajukan Jadwal').click()
          } else {
            cobaMentor(index + 1);
          }
        });
      };
  
      cobaMentor(0);
    });
  });
  
  
