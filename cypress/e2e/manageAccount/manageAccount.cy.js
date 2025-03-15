import { faker } from '@faker-js/faker';
describe('Manage Account Functionality', () => {

    beforeEach(() => {
        cy.login() // ke halaman login
    })

    it('should display the manage account page', () => {
        cy.get('#apps a').last().click()
        cy.get('#tasks a').should('have.length', 6)
        cy.get('#tasks a').eq(3).click()

        // Assertion setelah click menu manage Account
        cy.url().should('include', '/manageAccounts') // pastikan URLnya benar
        cy.get('#breadcrumbs').contains('Manage Accounts')
    })

    it('should search successfully with valid data', () => {
        cy.get('#apps a').last().click()
        cy.get('#tasks a').should('have.length.greaterThan', 5)
        cy.get('#tasks a').eq(3).click()
        cy.get('input').type('Super User').should('have.value', 'Super User')

        // Assertion setelah search
        cy.get('#list-accounts').should('be.visible')
        cy.get('#list-accounts td').should('have.length.greaterThan', 0)
        cy.get('#list-accounts td').first().should('contain.text', 'Super User')
    });

    it('should search with invalid data', () => {
        cy.get('#apps a').last().click()
        cy.get('#tasks a').should('have.length', 6)
        cy.get('#tasks a').eq(3).click()
        cy.get('input').type('Super Admin').should('have.value', 'Super Admin')

        // Validasi hasil pencarian kosong
        cy.contains('No entries to display').should('be.visible')
    });

    it('clear search box', () => {
        cy.get('#apps a').last().click()
        cy.get('#tasks a').should('have.length.greaterThan', 5)
        cy.get('#tasks a').eq(3).click()
        cy.get('input').type('John').should('have.value', 'John')
        cy.get('#list-accounts').should('be.visible')

        // Clear box search
        cy.get('input').clear().should('have.value', '')

        // Validasi list kosong / hidden
        cy.get('#list-accounts').should('have.length.greaterThan', 0)
    });

    it('add new account', () => {
        cy.get('#apps a').last().click()
        cy.get('#tasks a').should('have.length.greaterThan', 5)
        cy.get('#tasks a').eq(3).click()
        cy.contains('a', 'Add New Account').click()

        // Validasi form
        cy.get('#breadcrumbs').contains('Add New Account')

        // Input form New Account
        const randomGivenName = faker.person.firstName()
        const randomFamilyName = faker.person.lastName()
        const randomFullName = `${randomGivenName}_${randomFamilyName}`
        const randomPassword = `${randomGivenName}${randomFamilyName}123`
        const randomConfirmPassword = `${randomGivenName}${randomFamilyName}123`
        cy.get('#adminui-familyName-field').type(randomFamilyName)
        cy.get('#adminui-givenName-field').type(randomGivenName)
        cy.get('#adminui-gender-1-field').check().should('be.checked')
        cy.get('#adminui-addUserAccount').click()
        cy.get('#adminui-username-field').type(randomFullName)
        cy.get('#adminui-privilegeLevel-field').select('Full')
        cy.get('#adminui-password-field').type(randomPassword)
        cy.get('#adminui-confirmPassword-field').type(randomConfirmPassword)
        cy.get('#adminui-forceChangePassword').click()
        cy.contains('td', 'Registers Patients').find('input[type="checkbox"]').check().should('be.checked');
        cy.get('#save-button').click()

        // Assertion setelah add new account
        cy.get('#list-accounts').should('be.visible')
        cy.get('#list-accounts').should('have.length.greaterThan', 0)
        cy.get('#list-accounts_last').click()
        cy.get('#list-accounts').last().should('contain.text', randomGivenName)
    });

    it('add new account using password < 8 char', () => {
        cy.get('#apps a').last().click()
        cy.get('#tasks a').should('have.length.greaterThan', 5)
        cy.get('#tasks a').eq(3).click()
        cy.contains('a', 'Add New Account').click()

        // Validasi form
        cy.get('#breadcrumbs').contains('Add New Account')

        // Input form New Account
        const randomGivenName = faker.person.firstName()
        const randomFamilyName = faker.person.lastName()
        const randomFullName = `${randomGivenName}_${randomFamilyName}`
        cy.get('#adminui-familyName-field').type(randomFamilyName)
        cy.get('#adminui-givenName-field').type(randomGivenName)
        cy.get('#adminui-gender-1-field').check().should('be.checked')
        cy.get('#adminui-addUserAccount').click()
        cy.get('#adminui-username-field').type(randomFullName)
        cy.get('#adminui-privilegeLevel-field').select('Full')
        cy.get('#adminui-password-field').type('123')
        cy.get('#adminui-confirmPassword-field').type('123')
        cy.get('#adminui-forceChangePassword').click()

        // Assertion error message
        cy.contains('At least 8 character(s) are required').should('be.visible');
        cy.get('#save-button').should('be.disabled');
    });

    it('add new account using password and confirm password not match', () => {
        cy.get('#apps a').last().click()
        cy.get('#tasks a').should('have.length.greaterThan', 5)
        cy.get('#tasks a').eq(3).click()
        cy.contains('a', 'Add New Account').click()

        // Validasi form
        cy.get('#breadcrumbs').contains('Add New Account')

        // Input form New Account
        const randomGivenName = faker.person.firstName()
        const randomFamilyName = faker.person.lastName()
        const randomFullName = `${randomGivenName}_${randomFamilyName}`
        const randomPassword = `${randomGivenName}${randomFamilyName}123`
        const randomConfirmPassword = `${randomGivenName}${randomFamilyName}456`
        cy.get('#adminui-familyName-field').type(randomFamilyName)
        cy.get('#adminui-givenName-field').type(randomGivenName)
        cy.get('#adminui-gender-1-field').check().should('be.checked')
        cy.get('#adminui-addUserAccount').click()
        cy.get('#adminui-username-field').type(randomFullName)
        cy.get('#adminui-privilegeLevel-field').select('Full')
        cy.get('#adminui-password-field').type('randomPassword')
        cy.get('#adminui-confirmPassword-field').type('randomConfirmPassword')
        cy.get('#adminui-forceChangePassword').click()

        // Assertion error message
        cy.contains(`Passwords don't match`).should('be.visible')
        cy.get('#save-button').should('be.disabled')
    });

    it('add new account using empty field', () => {
        cy.get('#apps a').last().click()
        cy.get('#tasks a').should('have.length.greaterThan', 5)
        cy.get('#tasks a').eq(3).click()
        cy.contains('a', 'Add New Account').click()

        // Validasi form
        cy.get('#breadcrumbs').contains('Add New Account')

        // Input form New Account
        cy.get('#adminui-familyName-field').type('a').clear()
        cy.get('#adminui-givenName-field').type('b').clear()
        cy.get('#adminui-addUserAccount').click()
        cy.get('#adminui-username-field').type('c').clear()
        cy.get('#adminui-password-field').type('randomPassword')
        cy.get('#adminui-confirmPassword-field').type('randomConfirmPassword')
        cy.get('#adminui-forceChangePassword').click()

        // Assertion error message
        cy.contains(`This Field Is Required`).should('be.visible')
        cy.get('#save-button').should('be.disabled')
    });

    it('add new account using username > 50 char', () => {
        cy.get('#apps a').last().click()
        cy.get('#tasks a').should('have.length.greaterThan', 5)
        cy.get('#tasks a').eq(3).click()
        cy.contains('a', 'Add New Account').click()

        // Validasi form
        cy.get('#breadcrumbs').contains('Add New Account')

        // Input form New Account
        const randomGivenName = faker.person.firstName()
        const randomFamilyName = faker.person.lastName()
        const randomFullName = 'a'.repeat(51)
        const randomPassword = `${randomGivenName}${randomFamilyName}123`
        const randomConfirmPassword = `${randomGivenName}${randomFamilyName}123`
        cy.get('#adminui-familyName-field').type(randomFamilyName)
        cy.get('#adminui-givenName-field').type(randomGivenName)
        cy.get('#adminui-gender-1-field').check().should('be.checked')
        cy.get('#adminui-addUserAccount').click()
        cy.get('#adminui-username-field').type(randomFullName)
        cy.get('#adminui-privilegeLevel-field').select('Full')
        cy.get('#adminui-password-field').type('randomPassword')
        cy.get('#adminui-confirmPassword-field').type('randomConfirmPassword')

        // Assertion error message
        cy.contains(`A maximum of 50 character(s) is allowed`).should('be.visible')
        cy.get('#save-button').should('be.disabled')
    });

    it('add new account using emoticon at username field', () => {
        cy.get('#apps a').last().click()
        cy.get('#tasks a').should('have.length.greaterThan', 5)
        cy.get('#tasks a').eq(3).click()
        cy.contains('a', 'Add New Account').click()

        // Validasi form
        cy.get('#breadcrumbs').contains('Add New Account')

        // Input form New Account
        const randomGivenName = faker.person.firstName()
        const randomFamilyName = faker.person.lastName()
        const randomPassword = `${randomGivenName}${randomFamilyName}123`
        const randomConfirmPassword = `${randomGivenName}${randomFamilyName}123`
        cy.get('#adminui-familyName-field').type(randomFamilyName)
        cy.get('#adminui-givenName-field').type(randomGivenName)
        cy.get('#adminui-gender-1-field').check().should('be.checked')
        cy.get('#adminui-addUserAccount').click()
        cy.get('#adminui-username-field').type('🙈🙈😩🙈')
        cy.get('#adminui-privilegeLevel-field').select('Full')
        cy.get('#adminui-password-field').type(randomPassword)
        cy.get('#adminui-confirmPassword-field').type(randomConfirmPassword)
        cy.get('#adminui-forceChangePassword').click()
        cy.contains('td', 'Registers Patients').find('input[type="checkbox"]').check().should('be.checked');
        cy.get('#save-button').click()

        // Assertion error message
        cy.contains(`Username is invalid. It must be between 2 and 50 characters. Only letters, digits, ".", "-", and "_" are allowed.`).should('be.visible')
        cy.get('#save-button').should('be.disabled')
    });

    it('add new account using duplicate data', () => {
        cy.get('#apps a').last().click()
        cy.get('#tasks a').should('have.length.greaterThan', 5)
        cy.get('#tasks a').eq(3).click()
        cy.contains('a', 'Add New Account').click()

        // Validasi form
        cy.get('#breadcrumbs').contains('Add New Account')

        // Input form New Account
        cy.get('#adminui-familyName-field').type('Rahmadita')
        cy.get('#adminui-givenName-field').type('Osi')
        cy.get('#adminui-gender-1-field').check().should('be.checked')
        cy.get('#adminui-addUserAccount').click()
        cy.get('#adminui-username-field').type('osirahmadita')
        cy.get('#adminui-privilegeLevel-field').select('Full')
        cy.get('#adminui-password-field').type('Osirahmadita123')
        cy.get('#adminui-confirmPassword-field').type('Osirahmadita123')
        cy.get('#adminui-forceChangePassword').click()
        cy.contains('td', 'Registers Patients').find('input[type="checkbox"]').check().should('be.checked');
        cy.get('#save-button').click()

        // Assertion error message
        cy.contains(`Failed to save account details`).should('be.visible')
        cy.get('#save-button').should('be.disabled')
    });

    it('edit account using valid data', () => {
        cy.get('#apps a').last().click()
        cy.get('#tasks a').should('have.length.greaterThan', 5)
        cy.get('#tasks a').eq(3).click()
        cy.get('#list-accounts').should('be.visible')
        cy.get('tr.even').last().find('.icon-pencil.edit-action').click()


        // Validasi form
        cy.get('#breadcrumbs').contains('Edit Account')
        cy.get('h2').should('have.text', 'Edit Account')

        // Klik icon Edit Form Person Details
        cy.get('.adminui-account-person-details .icon-edit.edit-action.right').should('be.visible').click()

        // Edit Form
        const randomGivenName_Edit = faker.person.firstName()
        const randomFamilyName = faker.person.lastName()
        cy.get('#adminui-familyName-field').clear().type(randomFamilyName)
        cy.get('#adminui-givenName-field').clear().type(randomGivenName_Edit)
        cy.get('#adminui-gender-0-field').check().should('be.checked')
        cy.get('#adminui-person-save').click()

        // Assertion setelah edit form
        cy.get('.adminui-border-bottom').should('contain.text', randomGivenName_Edit)

        // Klik icon Edit Form Account Details
        cy.get('.user-a8093a5d-48df-4ae9-8b56-13568239b3b3  .icon-edit.edit-action.right').should('be.visible').click()

        // Edit Form
        const randomUsername = `${randomGivenName_Edit}_${randomFamilyName}`
        cy.get('#adminui-usernamea8093a5d-48df-4ae9-8b56-13568239b3b3-field').clear().type(randomUsername)
        cy.get('#adminui-privilegeLevela8093a5d-48df-4ae9-8b56-13568239b3b3-field').select('Full')
        cy.get('#adminui-user-savea8093a5d-48df-4ae9-8b56-13568239b3b3').click()

        // Assertion setelah edit form
        cy.get('.user-a8093a5d-48df-4ae9-8b56-13568239b3b3').should('contain.text', randomUsername)

        // Cek ulang di menu Manage Account
        cy.get('#breadcrumbs').contains('Manage Account').click()
        cy.get('input').type(randomGivenName_Edit).should('have.value', randomGivenName_Edit)

        // Assertion setelah search
        cy.get('#list-accounts').should('be.visible')
        cy.get('#list-accounts td').should('have.length.greaterThan', 0)
        cy.get('#list-accounts td').first().should('contain.text', randomGivenName_Edit)
    });

    it('edit account using empty field', () => {
        cy.get('#apps a').last().click()
        cy.get('#tasks a').should('have.length.greaterThan', 5)
        cy.get('#tasks a').eq(3).click()
        cy.get('#list-accounts').should('be.visible')
        cy.get('tr.even').last().find('.icon-pencil.edit-action').click()

        // Validasi form
        cy.get('#breadcrumbs').contains('Edit Account')
        cy.get('h2').should('have.text', 'Edit Account')

        // Klik icon Edit Form Person Details
        cy.get('.adminui-account-person-details .icon-edit.edit-action.right').should('be.visible').click()

        // Edit Form
        cy.get('#adminui-familyName-field').clear()
        cy.get('#adminui-givenName-field').clear()
        cy.get('#adminui-gender-0-field').check().should('be.checked')

        // Assertion error message
        cy.contains(`This Field Is Required`).should('be.visible')
        cy.get('#adminui-person-save').should('be.disabled')
        cy.get('#adminui-person-cancel').click()
    });

    it('edit account using username > 50 char', () => {
        cy.get('#apps a').last().click()
        cy.get('#tasks a').should('have.length.greaterThan', 5)
        cy.get('#tasks a').eq(3).click()
        cy.get('#list-accounts').should('be.visible')
        cy.get('tr.even').last().find('.icon-pencil.edit-action').click()

        // Validasi form
        cy.get('#breadcrumbs').contains('Edit Account')
        cy.get('h2').should('have.text', 'Edit Account')

        // Klik icon Edit Form Account Details
        cy.get('.user-a8093a5d-48df-4ae9-8b56-13568239b3b3  .icon-edit.edit-action.right').should('be.visible').click()

        // Edit Form
        const randomUsername = 'a'.repeat(51)
        cy.get('#adminui-usernamea8093a5d-48df-4ae9-8b56-13568239b3b3-field').clear().type(randomUsername)
        cy.get('#adminui-privilegeLevela8093a5d-48df-4ae9-8b56-13568239b3b3-field').select('Full')

        // Assertion error message
        cy.contains(`A maximum of 50 character(s) is allowed`).should('be.visible')
        cy.get('#adminui-user-savea8093a5d-48df-4ae9-8b56-13568239b3b3').should('be.disabled')
        cy.get('#adminui-user-cancela8093a5d-48df-4ae9-8b56-13568239b3b3').click()
    });

    it('edit account using username using emoticon', () => {
        cy.get('#apps a').last().click()
        cy.get('#tasks a').should('have.length.greaterThan', 5)
        cy.get('#tasks a').eq(3).click()
        cy.get('#list-accounts').should('be.visible')
        cy.get('tr.even').last().find('.icon-pencil.edit-action').click()

        // Validasi form
        cy.get('#breadcrumbs').contains('Edit Account')
        cy.get('h2').should('have.text', 'Edit Account')

        // Klik icon Edit Form Account Details
        cy.get('.user-a8093a5d-48df-4ae9-8b56-13568239b3b3  .icon-edit.edit-action.right').should('be.visible').click()

        // Edit Form
        cy.get('#adminui-usernamea8093a5d-48df-4ae9-8b56-13568239b3b3-field').clear().type('🙈🙈😩🙈')
        cy.get('#adminui-privilegeLevela8093a5d-48df-4ae9-8b56-13568239b3b3-field').select('Full')
        cy.get('#adminui-user-savea8093a5d-48df-4ae9-8b56-13568239b3b3').click()

        // Assertion error message
        cy.contains(`Username is invalid. It must be between 2 and 50 characters. Only letters, digits, ".", "-", and "_" are allowed.`).should('be.visible')
        cy.get('#adminui-user-cancela8093a5d-48df-4ae9-8b56-13568239b3b3').click()
    });

    it('edit account using duplicate data', () => {
        cy.get('#apps a').last().click()
        cy.get('#tasks a').should('have.length.greaterThan', 5)
        cy.get('#tasks a').eq(3).click()
        cy.get('#list-accounts').should('be.visible')
        cy.get('tr.even').last().find('.icon-pencil.edit-action').click()


        // Validasi form
        cy.get('#breadcrumbs').contains('Edit Account')
        cy.get('h2').should('have.text', 'Edit Account')

        // Klik icon Edit Form Person Details
        cy.get('.adminui-account-person-details .icon-edit.edit-action.right').should('be.visible').click()

        // Edit Form
        cy.get('#adminui-familyName-field').clear().type('Rahmadita')
        cy.get('#adminui-givenName-field').clear().type('Osi')
        cy.get('#adminui-gender-1-field').check().should('be.checked')
        cy.get('#adminui-person-save').click()

        // Assertion setelah edit form
        cy.contains(`Failed to save account details`).should('be.visible')

        // Klik icon Edit Form Account Details
        cy.get('.user-a8093a5d-48df-4ae9-8b56-13568239b3b3  .icon-edit.edit-action.right').should('be.visible').click()

        // Edit For
        cy.get('#adminui-usernamea8093a5d-48df-4ae9-8b56-13568239b3b3-field').clear().type('osirahmadita')
        cy.get('#adminui-privilegeLevela8093a5d-48df-4ae9-8b56-13568239b3b3-field').select('Full')
        cy.get('#adminui-user-savea8093a5d-48df-4ae9-8b56-13568239b3b3').click()

        // Assertion setelah edit form
        cy.contains(`Failed to save account details`).should('be.visible')

    });
})
