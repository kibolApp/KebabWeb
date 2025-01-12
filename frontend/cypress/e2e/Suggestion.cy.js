/* eslint-env cypress */

const suggestionText = `To jest testowa sugestia ${Date.now()}`;

describe('Suggestion feature', () => {
    it('Logs in, submits a suggestion, and verifies it in the admin panel', () => {
      cy.visit('http://localhost:3000/auth');
      cy.get('input[placeholder="Adres E-mail"]').type('admin@admin.pl');
      cy.get('input[placeholder="Hasło"]').type('admin');
      cy.get('button[type="submit"]').click();
  
      cy.url().should('include', '/map');
      cy.contains('Powrót').should('be.visible');
      cy.contains('Powrót').click();

      cy.contains('SUGESTIA').should('be.visible');
      cy.contains('SUGESTIA').click();
  

      cy.get('textarea[placeholder="Wpisz swoją sugestię..."]').type(suggestionText);
  
      cy.contains('Wyślij').click();
      cy.contains('Sugestia została wysłana!').should('be.visible');
  
      cy.contains('ADMIN PANEL').click();
      cy.url().should('include', '/admin');
  
      cy.contains('Sugestie').click();
      cy.contains(suggestionText).should('be.visible');
    });
  });
  