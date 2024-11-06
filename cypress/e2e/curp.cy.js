describe("prueba de pagina del curp 👍", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
  beforeEach(() => {
    cy.visit("https://www.gob.mx/curp/");
    cy.wait(500);
  });

  context(
    "Al ingresar un curp válido de una persona viva debe mostrar información y un botón para descargar el curp",
    () => {
      it("Ingresar curp de persona viva, obtener informacion, descargar pdf", () => {
        //ingresar curpsito y dar click en boton de buscar
        cy.get("#curpinput").type("MAVE030227MSRTLLA4");
        cy.get("#searchButton").click();
        cy.wait(500);

        //verificar que te manda a la seccion de descarga del curp
        cy.get(
          "#ember336 > section > div.container > div > div.col-xs-12.col-sm-12.col-md-12.clearfix > form > h2"
        ).contains("Descarga del CURP");

        //click en boton de descargar
        cy.get("#download").click();
        cy.wait(500);
        //verificar que se descarga un pdf
        cy.readFile("./cypress/downloads/CURP_MAVE030227MSRTLLA4.pdf");
      });
    }
  );

  context(
    "Al ingresar un curp válido de una persona muerta, debe mostrar un mensaje de error",
    () => {
      it("Curp de persona muerta D: muestra mensaje", () => {
        //ingresar curpsito y dar click en boton de buscar
        cy.get("#curpinput").type("EUBP620630HMCSRB07");
        cy.get("#searchButton").click();
        cy.wait(500);

        //verificar que se muestra un mensaje de error
        cy.get("#errorLogResult").contains(
          "Esta CURP fue dada de baja por defunción"
        );
      });
    }
  );

  context(
    "Al ingresar texto invalido, debe mostrar un mensaje de error",
    () => {
      it("Ingresar texto invalido, muestra mensaje de error", () => {
        //ingresar texto random y dar click al boton
        cy.get("#curpinput").type("curpsito");
        cy.get("#searchButton").click();
        cy.wait(500);

        //verificar que muestra errorcito y errorsote
        cy.get("#smallError").contains("El formato del CURP es inválido");
        cy.get("#errorLog").contains(
          "Algún campo es inválido. Por favor verifica."
        );
      });
    }
  );
});
