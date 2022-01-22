///<reference types="cypress"/>

describe('ShopProfile++', () =>{
    beforeEach(()=>{
        cy.ShopLogin()
        cy.visit("https://shop.getnowx.pl")
        })
    function GoToProfile()
    {
        cy.get('[class="popoverstyle__PopoverWrapper-sc-w52wlq-0 ebcJXu popover-wrapper user-pages-dropdown right"]')  //possibly can be done better
        .find('[class="popover-handler"][tabindex="0"]').click()  //choosing the dropdown, but has to be foundi nside the previous get.
        cy.contains("Profil").click()
    }

    it('Edits the name and surname:', () => {
        GoToProfile()

        cy.wait(1000) //for non-flakiness

        cy.get('#profileNameLabel').clear().type("Jeso") //name jeso
        cy.get('#profileSurnameLabel').clear().type("Chryste") //surname chryste
        cy.get('.button__StyledButton-sc-6gren8-0').contains('Zapisz').click() //saving the name and surname
        cy.contains('Dane użytkownika zapisane poprawnie').should('be.visible') //popup should be visible
      })

    it('Fiddles the addresses from profile', () => {
          GoToProfile()
          cy.get(':nth-child(4) > .sc-dlnjwi > .settingsstyle__SettingsFormContent-sc-1map448-3 > .button-group__ButtonGroup-sc-ikjcw2-0 > .radio-group__RadioGroupWrapper-sc-r3bigb-0 > .radio-card__CardWrapper-sc-fsgndv-0 > .radio-card__CardButtons-sc-fsgndv-3 > .edit-btn-active').click({force:true})
          cy.wait(1000)
          cy.get('.textarea__TextArea-sc-1933alo-0').clear()
          cy.wait(1500)
          cy.get('.textarea__TextArea-sc-1933alo-0').type('tutaj uwaga dla dostawcy').should("contain","tutaj uwaga dla dostawcy")

          cy.get('form > .button__StyledButton-sc-6gren8-0').click()

          cy.get('[for="address-address_02"]').click()
          cy.get('[for="address-address_01"]').click()
          
          

      });

})
describe('ShopProfile--', () =>{

    beforeEach( () => 
        {
        cy.ShopLogin()
        cy.visit("https://shop.getnowx.pl")
        })
    
        it('goes to profile', () => {
            
        });


})