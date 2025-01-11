describe('User Logout', () => {
    it('Logs the user out and redirects to the login page', () => {
        cy.visit('http://localhost:3000/auth');
        cy.get('input[placeholder="Adres E-mail"]').type('admin@admin.pl');
        cy.get('input[placeholder="Hasło"]').type('admin');
        cy.get('button[type="submit"]').click();

        cy.url().should('include', '/map');
        cy.contains('Powrót').should('be.visible');
        cy.contains('Powrót').click();
        cy.contains('WYLOGUJ').click();

        cy.window().then((win) => {
          expect(win.localStorage.getItem('authToken')).to.be.null;
        });
    
        cy.contains('WYLOGUJ').should('not.exist');
    });
  });
  