//Empresas Practicas - María
describe('Gestión empresas prácticas', () => {

    it('Añadir empresas prácticas', () => {
        // Realizamos login
        cy.visit('https://gestionpapeleofct.netlify.app');
        //cy.visit('http://localhost:4200');
        cy.get('#email')
            .type('director@gmail.com')
            .should('have.value', 'director@gmail.com');
        cy.get('#password')
            .type('12345678')
            .should('have.value', '12345678');
        cy.get('#form-login').submit();

        // Comprobamos url
        //cy.url().should('equal', 'http://localhost:4200/listaCursos');
        cy.url().should('equal', 'https://gestionpapeleofct.netlify.app/listaCursos');

        // Nos movemos al curso 2DAW comprobando que el id que tiene asignado es el correcto,
        // en este caso 2DAW tiene asignado el id 8
        cy.get('#select-cursos')
            .select('2DAW').should('have.value', '8');

        // Comprobamos que estamos en 2DAW
        cy.contains('Desarrollo de Aplicaciones Web');

        // Seleccionamos una empresa
        cy.get('#select-empresas')
            .select('Everis').should('have.value', '3');

        // Pulsamos botón para añadir empresas a prácticas
        cy.get('#bt-add-empresa').click();

        // Espera 5s para que de tiempo a que la añada en la tabla
        cy.wait(5000);

        // Comprobamos que la empresa se ha añadido a la tabla
        cy.get('#empresas-practicas')
            .should('contain', 'Everis');

        // Hacemos captura de pantalla
        cy.screenshot();
    });

});