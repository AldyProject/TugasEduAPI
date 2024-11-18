describe('Validate Header and Response Body', () => {
    it('Successfully validate content-type and response body', () => {
        cy.request('https://pokeapi.co/api/v2/pokemon/ditto').as('pokemon')
        
        cy.get('@pokemon').its('headers').its('content-type')
            .should('include', 'application/json; charset=utf-8');
        
        // Validate response body
        cy.get('@pokemon').its('body').should('include', {
            name: 'ditto',    
            id: 132          
        });

        cy.get('@pokemon').its('body').then((body) => {
            expect(body).to.have.property('name', 'ditto');
            expect(body).to.have.property('id', 132);
            expect(body).to.have.property('types').to.be.an('array').that.is.not.empty;
        });
    });
});
