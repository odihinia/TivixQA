/// <reference types="cypress"/>
//The above line makes TypeScript suggest Cypress commands.

/*README FIRST:
The following code is written as follows: 
2 describes per page function, 1 for positive and 1 for negaitve. Each IT has 1 action from start to finish, that the user needs to perform to get the desired test result.
*/
describe('Car Rent +', () =>{
    beforeEach(()=>{
        cy.Tivix() //chained off cy. - Cy.Tivix saves a session to more easily repeat tests. Visit, because session clears page after saving. Check ../Support/commands.js for more.
        cy.visit("/") //Having to visit baseUrl (http://qalab.pl.tivixlabs.com/) the page again because of interaction with cy.session.
        })
    
    it('Is able to rent a car from scratch: ID 1', () => {
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

        cy.contains("Company")
            .should("be.visible") //assert that the results are shown (Note: This could be expanded upon, but i feel like it's not necessary at the moment)
        cy.contains("Rent") //rent buttons next to cars
            .should("not.be.disabled") //they shouldn't be disabled
            .should("be.visible") //they should be also visible
            .first() //grab the first one, which one doesn't matter in this test.
            .click() //and click it.
            
        cy.url()
            .should("contain","/details") //url assert

        cy.contains("License plate:")
            .should("be.visible")//assert that the /details page loaded correctly, and is displaying info. License plate only exists on this page.


        cy.get('[class="card-body"]') //entire card get
            .children()          //it's children
            .contains("Rent!")  //this gets the button
            .click()

        cy.contains("Summary:")  //assert that "Summary" is visible
            .should("be.visible")

        cy.contains("Location: France, Paris") //asert if the location was updated correctly.
            .should("be.visible")


         //#region form fill in
        cy.get('#name').clear()
            .type("Jedrzej")

        cy.get('#last_name').clear()
            .type("Sokol")

        cy.get('#card_number').clear()
            .type("1111222233334444")

        cy.get('#email').clear()
            .type("test@test.test")
         //#endregion
        cy.get('#rent_form')
            .submit() //submit the form - faster than clicking the button. But, if it's truly E2E, it should be a button click. (I've omitted the button click here, for submit() demonstration purposes)


        cy.log(" //here you're supposed to add BDD assertion based on the message you want displayed on the success page. The url can be asserted with contains /success or something similar. This test will fail on the QA test page, because of bug #10")


        cy.contains("Pomyślnie").should("be.be.visible") //here you're supposed to add BDD assertion based on the message you want displayed on the success page. The url can be asserted with contains /success or something similar. This test will fail on the QA test page, because of bug #10
    
    })


    it('Checks the car model filtering : ID 2', () => {

        cy.get('.alert')
            .contains("Please fill pickup and drop off dates")
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
            .should("eq","1999-11-11") 


        cy.get('#dropoff')              //Dropoff date selection
            .clear()                        //clears. Just for non-flaky tests
            .type("2020-11-11"  )           //types correct data
            .invoke('val')                  //checks the value from Properties.
            .should("eq","2020-11-11") //Dropoff date selection

        cy.get('#model').clear()  //this time we're adding "Mazda" as the car model.
            .type("Mazda")
            .invoke('val')
            .should("equal","Mazda")


        cy.get("button[type='submit']") //clicks on the Search Button
            .should("not.be.disabled")      //the button needs to be interactable.
            .should("be.visible")           //and visible
            .click()

        cy.get("tbody") //get the body (to eliminate the first tr)
            .find("tr")  //find the ("tr") in the previous get DOM elements
            .each(($el)=>{
                cy.get($el).should("contain","Mazda") //the following code finds all the rows, and for each one asserts that it should contain "Mazda" as specified.
            })
    });
})



 
//---------------- Tutaj negatywny testing ----------------------//
describe('Car Rent -', () =>{
    beforeEach(()=>{
        cy.Tivix() //chained off cy. - Cy.Tivix saves a session to more easily repeat tests. Visit, because session clears page after saving. Check ../Support/commands.js for more.
        cy.visit("/") //Having to visit baseUrl (http://qalab.pl.tivixlabs.com/) the page again because of interaction with cy.session.
        })
    it('does testing: ID 3', () => {
        cy.get('#pickup')               //Pickup date selection
            .clear()                        //clears. Just for non-flaky tests
            .type("2022-11-11")             //types incorrect data (after dropoff)
            // .invoke('val')                  //checks the value from Properties.
            // .should("eq","1999-11-11") 


        cy.get('#dropoff')              //Dropoff date selection
            .clear()                        //clears. Just for non-flaky tests
            .type("2020-11-11"  )           //types incorrect data (before pickup)
            // .invoke('val')                  //checks the value from Properties.
            // .should("eq","2020-11-11")

        cy.get("button[type='submit']") //clicks on the Search Button
            .should("not.be.disabled")      //the button needs to be interactable.
            .should("be.visible")           //and visible
            .click()

        cy.contains("Please enter a valid date!")
            .should("be.visible")
    })

    it('Enters incorrect info on the form page', () => {
        cy.get('.alert')
            .contains("Please fill pickup and drop off dates")
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
            .should("eq","1999-11-11") 


        cy.get('#dropoff')              //Dropoff date selection
            .clear()                        //clears. Just for non-flaky tests
            .type("2020-11-11"  )           //types correct data
            .invoke('val')                  //checks the value from Properties.
            .should("eq","2020-11-11") //Dropoff date selection



        cy.get("button[type='submit']") //clicks on the Search Button
            .should("not.be.disabled")      //the button needs to be interactable.
            .should("be.visible")           //and visible
            .click()
        
        cy.contains("Company")
            .should("be.visible") //assert that the results are shown (Note: This could be expanded upon, but i feel like it's not necessary at the moment)

        cy.contains("Rent") //rent buttons next to cars
            .should("not.be.disabled") //they shouldn't be disabled
            .should("be.visible") //they should be also visible
            .first() //grab the first one, which one doesn't matter in this test.
            .click() //and click it.
            
        cy.url()
            .should("contain","/details") //url assert

        cy.contains("License plate:")
            .should("be.visible")//assert that the /details page loaded correctly, and is displaying info. License plate only exists on this page.


        cy.get('[class="card-body"]') //entire card get
            .children()          //it's children
            .contains("Rent!")  //this gets the button
            .click()

        cy.contains("Summary:")  //assert that "Summary" is visible
            .should("be.visible")


        cy.get('.btn')
            .contains("Rent")  //button get
            .click()

        cy.contains("Name is required").should("be.visible")
        cy.contains("Last name is required").should("be.visible") //error msges
        cy.contains("Email is required").should("be.visible")
        cy.contains("Card number is required").should("be.visible")

        cy.get('#name').clear()
            .type(":")

        cy.get('#last_name').clear()
            .type(":")

        cy.get('#card_number').clear()
            .type("1")

        cy.get('#email').clear()
            .type("@")

        cy.get('.btn').contains("Rent").click()
        /* HERE IS THE BDD SEGMENT OF ASSERTIONS - THESE MESSAGES ARE OPEN TO CHANGE
            AS IT STANDS NOW, THE FORM WILL PASS - THE TEST WILL FAIL.*/

        cy.contains("Name contains invalid characters").should("be.visible")
        cy.contains("Last name contains invalid characters").should("be.visible")
        cy.contains("Email is invalid").should("be.visible")
        cy.contains("Card number is invalid").should("be.visible")
        



    });
})
