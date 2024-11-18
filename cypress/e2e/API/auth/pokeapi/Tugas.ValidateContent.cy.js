describe('Validate Content and Respone body', () => {
    it('Successfully validate content and respone body', () => {
        cy.request('https://pokeapi.co/api/v2/pokemon/ditto').as('pokemon')
    cy.get('@pokemon').its('body').then((response) => {
    // Validasi nama ability pertama
    expect(response.abilities[0].ability.name).to.eq('limber');
    // Validasi URL ability pertama
    expect(response.abilities[0].ability.url).to.eq('https://pokeapi.co/api/v2/ability/7/');
        });
    });
});