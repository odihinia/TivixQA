///<reference types="cypress"/>
function GoToMap(){  //GoToMap wybiera przycisk, ustawia adres dostawy z podstawowego i klika na "ustaw"
    cy.get('#addressSelectionBtn').click()
    cy.contains("Ustaw adres dostawy").should("be.visible") //Has to be commented toensure cypress compat.
    cy.contains("Opcjonalny").should("be.visible").click()
    cy.get('#AddressButton').click()
    cy.contains("Ustaw adres dostawy").should("be.visible")
    cy.contains("Podstawowy").should("have.class","not_active")
    cy.get('.button__StyledButton-sc-6gren8-0').contains("Ustaw adres dostawy").should("be.visible").click()   //Has to be commented toensure cypress compat.

}
describe('ShopMap++', () => { //pozytywne testowanie mapki

    beforeEach(()=>{  //Ten beforeEach idzie na stronę i mapkę resetując jakikolwiek progress
      cy.ShopLogin()
      cy.visit("https://shop.getnowx.pl")
      GoToMap()
      })
    it('Goes to mapka succesfully', () => { //prosty test funkcji w BeforeEach
        cy.log("Pass")
    })

    it('Checks the autocomplete with localization pin', () => {  //uses the geolocation for automatic address
        cy.wait(2000) //wait for non-flakiness
        cy.get('#autoCompleteId').clear()  //clears the input
        cy.wait(200)
        cy.get('.search-boxstyle__LocationBlock-sc-1p7r5j6-6 > svg').click()  //clicks the geolocation
        cy.wait(200)
        cy.contains('Ustaw').should("be.visible").click() //sets the address that was downloaded from the geolocation
        cy.wait(200)
        cy.contains('Zapisz adres').should("exist").click()  //wyłączenie opcji zapisywania adresu
        cy.contains("Użyj jako mojego").should("be.visible").click()
    })
    it('sets an address correctly to jemiołowa sth', () => {  //Powinno ustawić adres na jemiołowa 10-100 (random) Successfully
        cy.wait(2000)
        cy.get('#autoCompleteId').clear().type("Jemiołowa"+" "+(Math.floor(Math.random()*100)+1)+" Wrocław") //random int from 10-100 i adres jemiołowaRandint.
        cy.contains('Szukaj').should("be.visible").click()
        cy.contains('Ustaw').should("be.visible").click()
        cy.wait(200)
        cy.contains('Zapisz adres').should("exist").click()
        cy.contains("Użyj jako mojego").should("be.visible").click()
    });
})
describe('ShopMap--', () =>{  //negative map testing
    beforeEach(()=>{
        cy.ShopLogin()
        cy.visit("https://shop.getnowx.pl")
        GoToMap()
        })
    
    it("Doesn't input anything", () => {  //this test makes the input field blank and asserts on the error message.
        cy.wait(1000)
        cy.get('#autoCompleteId').clear()  //delete address
        cy.contains('Szukaj').should("be.visible").click()
        cy.contains("Musisz podać adres").should("be.visible")  //error msg
    })
    it('Inputs some garbage', () => {  //inputs an extremely long name as the address and looks for any errors while spamming "Szukaj"
        cy.wait(1000)
        cy.get('#autoCompleteId').clear().type("IRIDOCYCLITISTHEFITNESSGRAMPACERTESTISAMULTISTAGENATIONALCAPATIYTESTTHATPROGRESSIBELYGETSHARDERASITCONTINUES") //too long
        cy.contains('Szukaj').should("be.visible").click()
        cy.contains('Szukaj').should("be.visible").click()
        cy.contains('Szukaj').should("be.visible").click()
        cy.contains('Szukaj').should("be.visible").click()
        cy.contains('Szukaj').should("be.visible").click()
        cy.get('#autoCompleteId').clear().type("IRIDOCYCLITISTHEFITNESSGRAMPACERTESTISAMULTISTAGENATIONALCAPATIYTESTTHATPROGRESSIBELYGETSHARDERASITCONTINUES")
        cy.contains('Szukaj').should("be.visible").click()
        cy.contains('Szukaj').should("be.visible").click()
        cy.contains('Szukaj').should("be.visible").click()
        cy.contains('Szukaj').should("be.visible").click()
        cy.contains('Szukaj').should("be.visible").click()
        
    })
    it('Is imprecise and asserts on the error', () => {  //first it makes an imprecise location, then it tries to bruteforce it and lands in the US. Asserts on the errors.
        cy.wait(1000)
        cy.get('#autoCompleteId').clear().type("r").click()

        cy.wait(100) 
        cy.get('#autoCompleteId').trigger('keydown', { keyCode: 40})
        cy.wait(50)                                                                // naciśnięcie strzałki w dół
        cy.get('#autoCompleteId').trigger('keyup', { keyCode: 40})
        cy.get('#autoCompleteId').trigger('keydown', { keyCode: 13}).wait(200).trigger('keyup',{keyCode: 13})   // naciśnięcie entera (i tym sposobem ustalenie nowego adresu)
        cy.contains("Proszę podać nazwę ulicy").should("be.visible")
        cy.get('#autoCompleteId').clear().type("r")
        cy.contains('Szukaj').should("be.visible").click()
        cy.contains("Proszę podać nazwę ulicy").should("be.visible")
    })
    it('Marks an adress that is inaccesible for GetnowX', () => {
        cy.wait(200)
        cy.get("#autoCompleteId").clear().should("be.empty").type("Trawowa 19/11, 54-614 Wrocław")
        cy.wait(100) 
        cy.get('#autoCompleteId').trigger('keydown', { keyCode: 40}).wait(500).trigger('keyup', { keyCode: 40}) //ArrowDown trigger and untrigger
        cy.get('#autoCompleteId').trigger('keydown', { keyCode: 13}).wait(200).trigger('keyup',{keyCode: 13}) //enter trigger and untrigger
        cy.contains('Ustaw').should("be.visible").click()
        cy.contains("Przepraszamy. Nie dostarczamy produktów").should("be.visible")
    });

})