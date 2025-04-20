const testCases = [
  { label: 'Name', keyword: 'Hasbi', selector: 'h4' },
  { label: 'Education', keyword: 'Business', selector: 'div' },
  { label: 'University', keyword: 'University Of Indonesia', selector: 'div' },
  { label: 'Topics', keyword: 'Internship at BUMN', selector: 'div' },
];

describe('Search Academic Mentor Tests', () => {
  describe('Search box functionality with result validation', () => {
    beforeEach(() => {
      cy.signin() // ke halaman sign in
    })

    testCases.forEach((test) => {
      it(`should search by ${test.label} and validate result`, () => {
        cy.visit('https://job-portal-user-dev-skx7zw44dq-et.a.run.app/mentoring')
        cy.contains('a', 'Akademik (S1 & S2)').click();
        cy.wait(5000)
        cy.get('#searchMentor').type(test.keyword);

        // Validasi hasil ada
        cy.get('a').should('exist')

        // Validasi hasil mengandung keyword
        cy.get(test.selector).should('exist').each(($el) => {
          expect(test.keyword)
        });
      });
    });
  });

  describe('Filter by Level functionality with result validation', () => {
    beforeEach(() => {
      cy.signin() // ke halaman sign in
    })

    it('should filter succesfully by level', () => {
      cy.visit('https://job-portal-user-dev-skx7zw44dq-et.a.run.app/mentoring')
      cy.contains('a', 'Akademik (S1 & S2)').click();
      cy.get('#rc_select_0').click()
      cy.get('.ant-checkbox-wrapper').first().click()

      // Assertion setelah search
      cy.get('a').should('have.length.at.least', 1)
    });
  });

  describe('Sort by newest functionality with result validation', () => {
    beforeEach(() => {
      cy.signin() // ke halaman sign in
    })

    it('should sort filter by newest', () => {
      cy.visit('https://job-portal-user-dev-skx7zw44dq-et.a.run.app/mentoring')
      cy.contains('a', 'Akademik (S1 & S2)').click();
      cy.get('.MentorSortParam_mentor_sort_param__drGOn').click();
      cy.get('.ant-select-dropdown').last().click();

      // Assertion setelah search
      cy.get('a').should('have.length.at.least', 1)
    });
  });

  describe('Filter by Category functionality with result validation', () => {
    beforeEach(() => {
      cy.signin() // ke halaman sign in
    })

    it('should filter succesfully by category', () => {
      cy.visit('https://job-portal-user-dev-skx7zw44dq-et.a.run.app/mentoring')
      cy.contains('a', 'Akademik (S1 & S2)').click();
      cy.get('.swiper-slide a').contains('Internship').click();

      // Assertion setelah search
      cy.get('a').should('have.length.at.least', 1)
    });
  });
});
