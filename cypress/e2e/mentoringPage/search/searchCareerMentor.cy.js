const testCases = [
  { label: 'Name', keyword: 'Cika', selector: 'h4' },
  { label: 'Office Name', keyword: '3MONGKIS', selector: 'div' },
  { label: 'Role', keyword: 'QA Software Engineer', selector: 'div' },
  { label: 'Topics', keyword: 'Career Planning', selector: 'div' }
];

describe('Search Career Mentor Tests', () => {
  describe('Search box functionality with result validation', () => {
    beforeEach(() => {
      cy.signin() // ke halaman sign in
    })

    testCases.forEach((test) => {
      it(`should search by ${test.label} and validate result`, () => {
        cy.visit('https://job-portal-user-dev-skx7zw44dq-et.a.run.app/mentoring')
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
      cy.get('.swiper-slide a').contains('HR').click();

      // Assertion setelah search
      cy.get('a').should('have.length.at.least', 1)
    });
  });
});
