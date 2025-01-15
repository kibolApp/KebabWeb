/* eslint-env cypress */

describe('Filter and search for a kebab', () => {
    it('Searches for a kebab by name and expands its details', () => {
      cy.visit('http://localhost:3000/auth');
      cy.get('input[placeholder="Adres E-mail"]').type('admin@admin.pl');
      cy.get('input[placeholder="Hasło"]').type('admin');
      cy.get('button[type="submit"]').click();
      cy.wait(3000);
  
      cy.url().should('include', '/map');
  
      cy.get('input[placeholder="Szukaj kebaba..."]').type('Maxi Kebab');

      cy.get('.grid > :nth-child(1) > .justify-between > .fa-arrow-down > path').click();

      cy.contains('Godziny otwarcia:').should('be.visible');
      cy.contains('Poniedziałek: 11:30-20:00').should('exist');
      
      cy.contains('Mięsa:').should('exist');
      cy.contains('kurczak, baran, mieszane').should('exist');
      cy.contains('Sosy:').should('exist');
      cy.contains('łagodny, czosnkowy, miętowy, ostry, mieszany, musztardowy').should('exist');
      cy.contains('Status:').should('exist');
      cy.contains('Istnieje').should('exist');
      cy.contains('Rzemieślniczy: Tak').should('exist');
      cy.contains('Na miejscu: Nie').should('exist');
      cy.contains('Sieciówka: Nie').should('exist');
      cy.contains('Opcje zamówień:').should('exist');
      cy.contains('na miejscu').should('exist');
      cy.contains('na wynos').should('exist');
  });
});