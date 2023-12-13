beforeEach(() => {
  cy.visit('/')
})

describe('login page', () => {

  it('should login with valid email and password', () => {

    cy.login('test@test.com', 'test')

    cy.contains('Добро пожаловать test@test.com').should('be.visible')
  })

  it('should not login with empty mail', () => {

    cy.login(null, 'test')

    cy.get('#mail').then((elements) => {
      expect(elements[0].checkValidity()).to.be.false
      expect(elements[0].validationMessage).to.be.eql('Заполните это поле.')
    })
  })

  it('should not login with empty password', () => {

    cy.login('test@test.com', null)

    cy.get('#pass').then((elements) => {
      expect(elements[0].checkValidity()).to.be.false
      expect(elements[0].validationMessage).to.be.eql('Заполните это поле.')
    })
  })
})

describe('Favorites page', () => {

  beforeEach(() => {
    cy.login('test@test.com', 'test')
  })

  it('should add book to favorites', () => {

    cy.addNewBook(
      "100 лет одиночества",
      "About the labors of Hercules",
      "Габриэль Гарсиа")
      cy.contains('100 лет одиночества').should('be.visible')
      cy.contains('Add to favorite').click()
      cy.get('h4').click()
      cy.contains('100 лет одиночества').should('be.visible')

  })

  it('should delete book from favorites', () => {

    cy.get('h4').click()
    cy.contains('100 лет одиночества').should('be.visible')
    cy.contains('Delete from favorite').click()
    cy.contains('Please add some book to favorit on home page!').should('be.visible')

  })

  it('should not add new book without title', () => {

    cy.contains('Add new').click()
    cy.get('#description').type('About the labors of Hercules')
    cy.get('#authors').type('Габриэль Гарсиа')
    cy.get('#title').then((elements) => {
      expect(elements[0].checkValidity()).to.be.false
      expect(elements[0].validationMessage).to.be.eql('Заполните это поле.')
    })

  })
})
