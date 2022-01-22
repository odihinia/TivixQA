/// <reference types="cypress"/>
function GoToOrders()
{
    cy.get('[class="popoverstyle__PopoverWrapper-sc-w52wlq-0 ebcJXu popover-wrapper user-pages-dropdown right"]')  //possibly can be done better
    .find('[class="popover-handler"][tabindex="0"]').click()  //choosing the dropdown, but has to be foundi nside the previous get.
    cy.contains("Zamówienia").click()
}
function UstawAdres(){
    cy.get('#AddressButton').click()
    cy.get('.button__StyledButton-sc-6gren8-0').contains("Ustaw adres dostawy").should("be.visible").click()
    cy.get('#autoCompleteId').clear().type("Racławicka 2, Wrocław")
    cy.get('#autoCompleteId').trigger('keydown', { keyCode: 40}).wait(500).trigger('keyup', { keyCode: 40}) //ArrowDown trigger and untrigger
    cy.get('#autoCompleteId').trigger('keydown', { keyCode: 13}).wait(200).trigger('keyup',{keyCode: 13}) //enter trigger and untrigger
    cy.contains('Ustaw').should("be.visible").click()
    cy.contains('Użyj jako').should("be.visible").click()
  }

describe('ShopOrders', () =>{
    beforeEach(()=>{
        cy.ShopLogin()
        cy.visit("https://shop.getnowx.pl")
        UstawAdres()
        GoToOrders()
    })

    it('Przywraca zamówienia', () => {
        cy.contains('Czy zamówienie nie poszło zgodnie z planem?').should("be.visible")
        cy.contains('Przywróć zamówienie').should('be.visible').click()
        cy.contains('Elementy w Twoim koszyku zostały zaktualizowane').should('be.visible')
        cy.contains("Ok").should("be.visible").click()
    });


})