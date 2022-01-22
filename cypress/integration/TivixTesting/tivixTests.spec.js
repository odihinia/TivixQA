/// <reference types="cypress"/>
//The above line makes TypeScript suggest Cypress commands first.
describe('Car Rent +', () =>{
    beforeEach(()=>{
        cy.Tivix() //chained off cy. - Cy.Tivix saves a session to more easily repeat tests. Visit, because session clears page after saving. Check ../Support/commands.js for more.
        cy.visit("/") //Having to visit baseUrl (http://qalab.pl.tivixlabs.com/) the page again because of interaction with cy.session.
        })
    
    it('does testing', () => {
        cy.log("+")
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
