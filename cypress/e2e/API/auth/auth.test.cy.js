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

    //Validate Status Code
    it('Successfully validate status code', () => {
        cy.request('https://pokeapi.co/api/v2/pokemon/ditto').as('ditto')
        cy.get('@ditto').its('status').should('equal', 200)
    });
    
    it('Successfully validate status code with params', () => {
        cy.request({
            method: 'Get',
            url:'https://reqres.in/api/users?page=2&per_pages=1&delay=3'
        }).as('users')
        cy.get('@users').its('status').should('equal', 200)
    });

    //Validate Content
    it('Successfully validate content', () => {
        cy.request('https://pokeapi.co/api/v2/pokemon/bulbasaur').as('bulbasaur')
        cy.get('@bulbasaur').its('body').should('include', {name: 'bulbasaur'})
    });
    
    //Negative Response
    it.only('Successfully validate negative respone', () => {
        cy.request({
            method: 'GET',
            url: 'https://pokeapi.co/api/v2/pokemon/eduwork',
            failOnStatusCode: false
        }).as('eduwork')
        cy.get('@eduwork').its('status').should('equal', 404)
    });
});
