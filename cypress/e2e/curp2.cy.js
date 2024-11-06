describe("prueba de pagina del curp 👍", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
  beforeEach(() => {
    cy.visit("https://www.gob.mx/curp/");
    cy.wait(500);
  });

  context(
    "Ingresar datos correctos debe dejar descargar CURP",
    () => {
      it("", () => {
        cy.get('#datos > a').click();
        cy.wait(1000);

        //ingresar datos correctos
        cy.get("#nombre").type("Jessica");
        cy.get("#primerApellido").type("Montaño");
        cy.get("#segundoApellido").type("Lares");
        cy.get("#diaNacimiento").select("13");
        cy.get("#mesNacimiento").select("01");
        cy.get("#selectedYear").type("2003");
        cy.get("#sexo").select("Mujer");
        cy.get("#claveEntidad").select("Sonora");

        //click en boton de buscar
        cy.get("#searchButton").click();

        //verificar que te manda a la seccion de descarga del curp
        cy.get(
          "#ember336 > section > div.container > div > div.col-xs-12.col-sm-12.col-md-12.clearfix > form > h2"
        ).contains("Descarga del CURP");

        //click en boton de descargar
        cy.get("#download").click();
        cy.wait(1000);
        //verificar que se descarga un pdf
        cy.readFile("./cypress/downloads/CURP_MOLJ030113MSRNRSA0.pdf");
        }); 
    }

    

  );

  context(
    "Al ingresar datos de una persona inexistente (o fallecida), debe mostrar mensaje de datos incorrectos",
    () => {
      it("", () => {
        cy.get('#datos > a').click();
        cy.wait(1000);

        //ingresar datos correctos
        cy.get("#nombre").type("Pablo");
        cy.get("#primerApellido").type("Esquivel");
        cy.get("#segundoApellido").type("Borja");
        cy.get("#diaNacimiento").select("30");
        cy.get("#mesNacimiento").select("06");
        cy.get("#selectedYear").type("1962");
        cy.get("#sexo").select("Hombre");
        cy.get("#claveEntidad").select("Ciudad de México");

        //click en boton de buscar
        cy.get("#searchButton").click();

        //verificar que se muestra un mensaje de que los datos no son correctos
        cy.get("#modalMessage > div > div > div.modal-header > h4").contains('Aviso importante');
    }
  );}
);

context(
  "Al dejar datos vacios, debe mostrar mensaje de error",
  () => {
    it("", () => {
      cy.get('#datos > a').click();
      cy.wait(1000);

      //ingresar datos correctos
      //cy.get("#nombre").type("Pablo");
      cy.get("#primerApellido").type("Esquivel");
      cy.get("#segundoApellido").type("Borja");
      cy.get("#diaNacimiento").select("30");
      cy.get("#mesNacimiento").select("06");
      cy.get("#selectedYear").type("1962");
      cy.get("#sexo").select("Hombre");
      cy.get("#claveEntidad").select("Ciudad de México");

      //click en boton de buscar
      cy.get("#searchButton").click();

      //verificar que se muestra un mensaje de que los datos no son correctos
      cy.get("#errorLog").contains('Te falta completar algún campo requerido. Por favor verifica.');
  }
);}
);

});
