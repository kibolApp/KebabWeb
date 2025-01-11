const uniqueEmail = `testuser+${Date.now()}@example.com`;

describe('User Registration', () => {
  it('Registers a new user', () => {
    cy.visit('http://localhost:3000/auth');

    cy.contains('Zarejestruj się.').click();

    cy.get('input[placeholder="Nazwa użytkownika"]').type('TestUser');
    cy.get('input[placeholder="Adres E-mail"]').type(uniqueEmail);
    cy.get('input[placeholder="Hasło"]').type('password123');
    cy.get('input[placeholder="Potwierdź hasło"]').type('password123');

    cy.get('button[type="submit"]').click();

    cy.contains('Rejestracja zakończona sukcesem!').should('be.visible');
    cy.url().should('include', '/map');
  });
});
