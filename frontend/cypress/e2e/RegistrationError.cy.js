describe('User Registration with Existing Email', () => {
    it('Shows an error when trying to register with an existing email', () => {
      cy.visit('http://localhost:3000/auth');
  
      cy.contains('Zarejestruj się.').click();
  
      cy.get('input[placeholder="Nazwa użytkownika"]').type('AdminUser');
      cy.get('input[placeholder="Adres E-mail"]').type('admin@admin.pl');
      cy.get('input[placeholder="Hasło"]').type('password123');
      cy.get('input[placeholder="Potwierdź hasło"]').type('password123');
  
      cy.get('button[type="submit"]').click();
  
      cy.contains('Błąd serwera: The email has already been taken.').should('be.visible');
      cy.url().should('include', '/auth');
    });
  });
  