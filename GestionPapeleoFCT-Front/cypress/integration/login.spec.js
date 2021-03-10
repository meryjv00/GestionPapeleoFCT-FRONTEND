//Login - María
describe('Login', () => {

    it('Validación login correcta ', () => {
        // Abrimos la web
        //cy.visit('http://localhost:4200');
        cy.visit('https://gestionpapeleofct.netlify.app');

        // Submit del formulario
        cy.get('#form-login').submit();
        //.next().should('contain', 'Este campo es obligatorio');

        // Se muestran los mensajes de validación
        cy.contains('Este campo es obligatorio');

        // Hacemos captura de pantalla
        cy.screenshot();
    });

    it('Realiza login correctamente', () => {
        // Abrimos la web
        //cy.visit('http://localhost:4200');
        cy.visit('https://gestionpapeleofct.netlify.app');

        // Rellenamos el formulario
        // Datos email
        cy.get('#email')
            .type('director@gmail.com')
            .should('have.value', 'director@gmail.com');

        // Datos contraseña
        cy.get('#password')
            .type('12345678')
            .should('have.value', '12345678');

        // Submit del formulario
        cy.get('#form-login').submit();

        // La url ahora debe contener /listaCursos
        cy.url().should('include', '/listaCursos');

        // Espera 5s para que de tiempo a cargar la página
        cy.wait(5000);

        // La página web debe contener la palabra Anexos
        cy.contains('Anexos');

        // Hacemos captura de pantalla
        cy.screenshot();
    });


});