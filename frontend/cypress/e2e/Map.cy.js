describe('Map Page Interactions', () => {
    it('Logs in and interacts with the map', () => {
      cy.visit('http://localhost:3000/auth');
      cy.get('input[placeholder="Adres E-mail"]').type('admin@admin.pl');
      cy.get('input[placeholder="Hasło"]').type('admin');
      cy.get('button[type="submit"]').click();
  
      cy.contains('Logowanie zakończone sukcesem!').should('be.visible');
      cy.url().should('include', '/map');
  
      cy.get('.leaflet-container').should('be.visible');
  
      cy.get('.leaflet-marker-icon').should('have.length.greaterThan', 0); 
      cy.get('.leaflet-marker-icon').first().click();

      cy.get('.leaflet-popup-content').should('be.visible');
      cy.get('.leaflet-popup-content button').contains('Szczegóły').click();
  
      cy.contains('©kibolAPP').should('be.visible');
    });
  });
  