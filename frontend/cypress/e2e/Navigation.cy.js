/* eslint-env cypress */

describe('Navigate between Home and Map', () => {
  it('Navigates from Home to Map and back to Home', () => {
    cy.visit('http://localhost:3000'); 

    cy.contains('LEGNICA KEBAB CITY TOUR').should('be.visible');

    cy.contains('MAPA').click();

    cy.url().should('include', '/map-clone');
    cy.contains('Powrót').should('be.visible');

    cy.contains('Powrót').click();

    cy.url().should('eq', 'http://localhost:3000/');
    cy.contains('LEGNICA KEBAB CITY TOUR').should('be.visible');
  });
});
