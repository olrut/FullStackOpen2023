describe('Blog ', function () {
  it('front page can be opened', function () {
    cy.visit('')
    cy.contains('blogs')
  })
})

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.visit('')
  })

  it('Login form is shown and empty login information show warning about wrong credentials', function () {
    cy.contains('login')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    beforeEach(function () {
      cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
      const user = {
        name: 'Test User',
        username: 'tester',
        password: 'password'
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
      cy.visit('')
    })

    it('Succeeds with correct credentials', function () {
      cy.get('#username').type('tester')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.contains('Test User logged in')
      cy.contains('Logout').click()
    })

    it('Fails with wrong credentials', function () {
      cy.get('#username').type('tester')
      cy.get('#password').type('wrong-password')
      cy.get('#login-button').click()
      cy.contains('Wrong credentials')
    })
  }
  )
  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
      const user = {
        name: 'Test User',
        username: 'tester',
        password: 'password'
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
      cy.login({ username: 'tester', password: 'password' })
      cy.visit('')
    })

    it('Blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#create-blog-submit').click()
      cy.contains('test title')
      cy.contains('test author')
    })
    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.contains('new blog').click()
        cy.get('#title').type('test title')
        cy.get('#author').type('test author')
        cy.get('#url').type('test url')
        cy.get('#create-blog-submit').click()
        cy.contains('view').click()
      })

      it('Blog can be liked', function () {
        cy.contains('like').click()
        cy.contains('Likes 1')
      })

      it('Blog can be deleted', function () {
        cy.contains('remove').click()
        cy.contains('view').should('not.exist')
      })

      it('Unauthorized users cannot delete blog', function () {
        cy.contains('Logout').click()
        cy.contains('remove').should('not.exist')
        const user = {
          name: 'Test User',
          username: 'tester2',
          password: 'password'
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
        cy.login({ username: 'tester2', password: 'password' })
        cy.contains('view').click()
        cy.contains('remove').should('not.exist')
      })

      it('Blogs are ordered by likes', function () {
        cy.contains('new blog').click()
        cy.get('#title').type('Most liked blog')
        cy.get('#author').type('test author 2')
        cy.get('#url').type('test url 2')
        cy.get('#create-blog-submit').click()
        cy.contains('view').click()
        cy.get('.blog').eq(0).should('contain', 'test title').and('contain', 'Likes 0')
        cy.get('.blog').eq(1).should('contain', 'Most liked blog').and('contain', 'Likes 0')
        cy.get('.blog').eq(1).contains('like').click()
        cy.get('.blog').eq(0).should('contain', 'Most liked blog').and('contain', 'Likes 1')
      })
    })
  })
})