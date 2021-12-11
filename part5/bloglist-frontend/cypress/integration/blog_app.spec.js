describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login to application')
  })

  describe('Login', function () {
    beforeEach(function () {
      const user = {
        username: 'sandesh',
        name: 'sandesh',
        password: 'sandesh',
      }
      cy.request('POST', 'http://localhost:3003/api/users', user)
    })

    it('succeeds with correct credentials', function () {
      cy.get('#username').type('sandesh')
      cy.get('#password').type('sandesh')
      cy.get('#login-button').click()

      cy.contains('sandesh logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('sandesh')
      cy.get('#password').type('sandesh1')
      cy.get('#login-button').click()

      cy.get('.notification.error').contains('Invalid username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(231, 54, 41)')
    })

    describe('When logged in', function () {
      beforeEach(function () {
        cy.login({ username: 'sandesh', password: 'sandesh' })
      })

      it('A blog can be created', function () {
        cy.get('button:contains("Create new blog")').click()

        cy.get('#title').type('A new blog')
        cy.get('#author').type('Sandesh Hyoju')
        cy.get('#url').type('http://sandesh.com/a-new-blog')
        cy.get('#create-blog').click()

        cy.contains('A new blog Sandesh Hyoju')
      })

      describe('When a blog exist', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'A new blog',
            author: 'Sandesh Hyoju',
            url: 'http://sandesh.com/a-new-blog',
          })
        })

        it('A blog can be liked', function () {
          cy.get('.blog-container').first().get('.view').click()
          cy.contains('likes 0')
          cy.get('.like').click()
          cy.contains('likes 1')
        })

        it('A blog can be deleted by its creator', function () {
          cy.get('.blog-container')
            .first()
            .as('blogContainer')
            .get('.view')
            .click()

          cy.get('@blogContainer').get('.delete').click()

          cy.get('.blog-container').should('not.exist')
        })

        describe('Other Users', function () {
          beforeEach(function () {
            const user = {
              username: 'luniva',
              name: 'luniva',
              password: 'luniva',
            }
            cy.request('POST', 'http://localhost:3003/api/users', user)

            cy.login({ username: 'luniva', password: 'luniva' })
          })
          it('A blog can only delete by its creator', function () {
            cy.get('.blog-container').first().get('.view').click()

            cy.get('.blog-container').first().get('.delete').should('not.exist')
          })
        })

        describe('Multiple blogs', function () {
          beforeEach(function () {
            cy.createBlog({
              title: 'My second blog',
              author: 'Sajani Karmacharya',
              url: 'http://sajani.com/my-second-blog',
            })
          })

          it('order blog by likes', function () {
            cy.contains('My second blog Sajani Karmacharya')
            cy.get('.blog-container').each((el, i) => {
              if (i === 0) {
                cy.get(el).contains('Sandesh Hyoju')
              }
            })

            cy.get('.blog-container:eq(1)')
              .find('.view')
              .as('secondBlog')
              .click()

            cy.get('.blog-container:eq(1)').find('.like').click()
            cy.visit('http://localhost:3000')

            cy.get('.blog-container').then((blogContainer) => {
              cy.get(blogContainer[0]).contains('Sajani Karmacharya')
            })
          })
        })
      })
    })
  })
})
