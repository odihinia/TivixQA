///<reference types="cypress"/>

describe('ShopFAQContact++', () =>{
    beforeEach(()=>{
        cy.ShopLogin()
        cy.visit("https://shop.getnowx.pl")
        })
    function GoToFAQ()
    {
        cy.get('[class="popoverstyle__PopoverWrapper-sc-w52wlq-0 ebcJXu popover-wrapper user-pages-dropdown right"]')  //possibly can be done better
        .find('[class="popover-handler"][tabindex="0"]').click()  //choosing the dropdown, but has to be foundi nside the previous get.
        cy.contains("FAQ").click()
    }
    function GoToKontakt()
    {
        cy.get('[class="popoverstyle__PopoverWrapper-sc-w52wlq-0 ebcJXu popover-wrapper user-pages-dropdown right"]')  //possibly can be done better
        .find('[class="popover-handler"][tabindex="0"]').click()  //choosing the dropdown, but has to be foundi nside the previous get.
        cy.contains("Kontakt").click()
    }

    it('Checks FAQ', () => {
        GoToFAQ()
        cy.contains("FAQ").should("be.visible")  //FAQ is visible

        cy.get('#panel1a-content')    //This is the subtext that pops out when you click on a FAQ question. 
        .should("not.be.visible") //It shouldn't be visible before a click.

        cy.get('#panel1a-header')  //This is the panel that is clickable. It contains the subtext that answers the FAQ question it is assigned to.
        .should("be.visible")

        cy.get('[data-testid="ExpandMoreIcon"]')  //this is the small arrow that expands the subtext
        .eq(0)  //this is the first element. Same as .first()
        .should("be.visible")
        .click()

        cy.get('#panel1a-content') //This is the subtext that pops out when you click on a FAQ question. 
        .should("be.visible")  //it should be visible now, because we clicked in the previous cy.get().click()

        cy.get('[data-testid="ExpandMoreIcon"]')  //The arrow is clicked again to hide the subtext content.
        .eq(0)
        .should("be.visible") //the arrow, not the subtext
        .click()

        cy.get('#panel1a-content')  //the subtext is got again, with a not visible assertion to asertain that it's hidden correctly.
        .should("not.be.visible")
      })

    it('Checks Contact', () => {
          GoToKontakt()
          cy.contains("NIP").should("be.visible").siblings().should("contain","8943171067")
          cy.contains("REGON").should("be.visible").siblings().should("contain","389550992")
          cy.contains("KRS").should("be.visible").siblings().should("contain","0000912904")
          cy.contains("Sąd").should("be.visible").siblings().should("contain","Sąd Rejonowy dla Wrocławia Fabrycznej we Wrocławiu")
          cy.contains("Kapitał zakładowy").should("be.visible").siblings().should("contain","5000zł")
          cy.contains("Mail").should("be.visible").siblings().should("contain","shop@getnow-x.pl")
      })
})
