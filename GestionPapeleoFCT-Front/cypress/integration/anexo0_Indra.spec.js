//Anexo 0 - María
describe('Descarga anexos', () => {

    it('Descarga correcta del anexo 0 Indra', () => {
        // Realizamos login
        cy.visit('http://localhost:4200');
        cy.get('#email')
            .type('director@gmail.com')
            .should('have.value', 'director@gmail.com');
        cy.get('#password')
            .type('12345678')
            .should('have.value', '12345678');
        cy.get('#form-login').submit();

        // Comprobamos url
        cy.url().should('equal', 'http://localhost:4200/listaCursos');

        // 3s
        cy.wait(3000);

        // Pulsamos apartado "Empresas" del menú
        cy.get('#empresa').click();

        // Comprobamos url
        cy.url().should('equal', 'http://localhost:4200/listaEmpresas');

        // 3s
        cy.wait(3000);

        // Comprobamos que ha cargado la empresa Indra
        cy.contains('Indra');

        // Comprobamos que el texto del botón es Indra
        cy.get(':nth-child(2) > .btn')
            .contains('Anexo 0 Indra');
        
    });

});