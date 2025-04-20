describe('Booking Mentor functionality', () => {
  beforeEach(() => {
    cy.signin() // ke halaman sign in
  })

  it('should successfully booking mentor', () => {
    cy.pilihMentorAvailable();
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
    cy.get('#notes').click().type('Helooo')
    cy.contains('button', 'Selanjutnya').scrollIntoView().wait(200).click({ force: true })
    cy.get('#portfolios').check()
    cy.get('#customPortfolios_0_url').type('eyalia.com')
    cy.get('input[type="checkbox"]').each(($el) => {
      cy.wrap($el).check();
    });
    cy.get('button').contains('Selesai').click()
    cy.get('h2').should('contain', 'Sesi mentoring kamu telah dikirimkan!')
    cy.get('button').contains('Lihat Detailnya').click()
    cy.get('div.grid').should('exist')
  })
})