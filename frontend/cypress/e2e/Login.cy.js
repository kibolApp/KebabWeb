describe('User Login', () => {
    it('Logs in an existing user successfully', () => {
      cy.visit('http://localhost:3000/auth');
  
      cy.get('input[placeholder="Adres E-mail"]').type('admin@admin.pl');
      cy.get('input[placeholder="Hasło"]').type('admin');
  
      cy.get('button[type="submit"]').click();
  
      cy.contains('Logowanie zakończone sukcesem!').should('be.visible');
      cy.url().should('include', '/map');
    });
  
    it('Shows an error for invalid credentials', () => {
      cy.visit('http://localhost:3000/auth');
  
      cy.get('input[placeholder="Adres E-mail"]').type('FDOMFSDOMNF@wp.pl');
      cy.get('input[placeholder="Hasło"]').type('sdffsdfsdsfsdfsdfgsdfgdfgdfgdfg');
  
      cy.get('button[type="submit"]').click();
  
      cy.contains('Błąd logowania. Sprawdź swoje dane.').should('be.visible');
      cy.url().should('include', '/auth');
    });
  });
  