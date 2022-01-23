/// <reference types="cypress"/>
//The above line makes TypeScript suggest Cypress commands first.

/*README FIRST:
The following code is written as follows: 
2 describes per page function, 1 for positive and 1 for negaitve. Each IT has 1 action from start to finish, that the user needs to perform to get the desired test result.
*/
describe('Car Rent +', () =>{
    beforeEach(()=>{
        cy.Tivix() //chained off cy. - Cy.Tivix saves a session to more easily repeat tests. Visit, because session clears page after saving. Check ../Support/commands.js for more.
        cy.visit("/") //Having to visit baseUrl (http://qalab.pl.tivixlabs.com/) the page again because of interaction with cy.session.
        })
    
    it.only('Is able to rent a car from scratch', () => {
        cy.get('.alert')
        .contains("Please fill pickup and drop off dates") //for making sure
        .should("be.visible") //asserts if the message is visible at the start

        cy.get('#country') //Country selector dropdown get
        .select("France") //Selects France as the country
        .should("contain","France")//ensures it gets selected correctly

        cy.get('#city') //City selector dropdown get
        .select("Paris") //selects "Paris" as the city
        .should("contain","Paris") //ensures it gets selected correctly

        cy.get('#pickup')               //Pickup date selection
        .clear()                        //clears. Just for non-flaky tests
        .type("1999-11-11")             //types correct data
        .invoke('val')                  //checks the value from Properties.
        .then(datePickup =>
             cy.log(datePickup))        //async value as datePickup
        .should("contain","1999-11-11") 


        cy.get('#dropoff')              //Dropoff date selection
        .clear()                        //clears. Just for non-flaky tests
        .type("2020-11-11"  )           //types correct data
        .invoke('val')                  //checks the value from Properties.
        .then(dateDropoff =>
             cy.log(dateDropoff))       //async value as dateDropoff, propably will use this late
        .should("contain","2020-11-11") //Dropoff date selection


        cy.get("button[type='submit']") //clicks on the Search Button
        .should("not.be.disabled")      //the button needs to be interactable.
        .should("be.visible")           //and visible
        .click()

        cy.contains("Company").should("be.visible") //assert that the results are shown (Note: This could be expanded upon, but i feel like it's not necessary at the moment)
        cy.contains("Rent") //rent buttons next to cars
        .should("not.be.disabled") //they shouldn't be disabled
        .should("be.visible") //they should be also visible
        .first() //grab the first one, which one doesn't matter in this test.
        .click() //and click it.
        
        cy.url()
        .should("contain","/details") //url assert
        cy.contains("License plate:")
        .should("be.visible")//assert that the /details page loaded correctly, and is displaying info. License plate only exists on this page.


        cy.get('[class="card-body"]')
        .children()
        .contains("Rent!")
        .click()

        cy.contains("Summary:")
        .should("be.visible")

        cy.contains("Location: France, Paris") //asert if the location was updated correctly.
        .should("be.visible")

        cy.get('#rent_form') //TBA


    })
})



 
//---------------- Tutaj negatywny testing ----------------------//
describe('Car Rent -', () =>{
    beforeEach(()=>{
        cy.Tivix() //chained off cy. - Cy.Tivix saves a session to more easily repeat tests. Visit, because session clears page after saving. Check ../Support/commands.js for more.
        cy.visit("/") //Having to visit baseUrl (http://qalab.pl.tivixlabs.com/) the page again because of interaction with cy.session.
        })
    it('does testing', () => {
        cy.log("-")
    })
})
