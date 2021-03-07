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

        // Pulsamos apartado "Empresas" del menú
        cy.get('#empresa').click();

        // Comprobamos url
        cy.url().should('equal', 'http://localhost:4200/listaEmpresas');

        // Comprobamos que ha cargado la empresa Indra
        cy.contains('Indra');

        // Pulsamos en el botón para descargar anexo
        cy.get(':nth-child(2) > .btn').click();

    });

});