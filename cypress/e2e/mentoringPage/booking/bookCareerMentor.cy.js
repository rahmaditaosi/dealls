describe('Booking Mentor functionality', () => {
  beforeEach(() => {
    cy.signin() // ke halaman sign in
  })

  it('should successfully booking mentor', () => {
    cy.visit('https://job-portal-user-dev-skx7zw44dq-et.a.run.app/mentoring')
    cy.get('a[class*="MentorCard_mentor_card"]').first().click()
    cy.get('button').contains('Ajukan Jadwal').click()
    cy.get('ul.grid > li.h-full').each(($li, index) => {
      cy.wrap($li).within(() => {
        cy.get('button').click()
      });
    });
    cy.get('button').contains('Selanjutnya').click()
    cy.get('button').contains('Select Date Range').click()
    cy.selectDateRangeNextMonth(3, 7)  
    cy.TimeRangeFirst('09:00', '12:00')
    cy.get('button').contains('Add Time Range Proposal').click()
    cy.TimeRangeSecond('20:00', '21:00')
    cy.get('button').contains('Selanjutnya').click()
  })

});

// describe('Filter by Level functionality with result validation', () => {
//   beforeEach(() => {
//     cy.signin() // ke halaman sign in
//   })

//   it('should filter succesfully by level', () => {
//     cy.visit('https://job-portal-user-dev-skx7zw44dq-et.a.run.app/mentoring')
//     cy.contains('a', 'Akademik (S1 & S2)').click();
//     cy.get('#rc_select_0').click()
//     cy.get('.ant-checkbox-wrapper').first().click()

//     // Assertion setelah search
//     cy.get('a').should('have.length.at.least', 1)
//   });
// });

// describe('Sort by newest functionality with result validation', () => {
//   beforeEach(() => {
//     cy.signin() // ke halaman sign in
//   })

//   it('should sort filter by newest', () => {
//     cy.visit('https://job-portal-user-dev-skx7zw44dq-et.a.run.app/mentoring')
//     cy.contains('a', 'Akademik (S1 & S2)').click();
//     cy.get('.MentorSortParam_mentor_sort_param__drGOn').click();
//     cy.get('.ant-select-dropdown').last().click();

//     // Assertion setelah search
//     cy.get('a').should('have.length.at.least', 1)
//   });
// });

// describe('Filter by Category functionality with result validation', () => {
//   beforeEach(() => {
//     cy.signin() // ke halaman sign in
//   })

//   it('should filter succesfully by category', () => {
//     cy.visit('https://job-portal-user-dev-skx7zw44dq-et.a.run.app/mentoring')
//     cy.contains('a', 'Akademik (S1 & S2)').click();
//     cy.get('.swiper-slide a').contains('Internship').click();

//     // Assertion setelah search
//     cy.get('a').should('have.length.at.least', 1)
//   });
// });
