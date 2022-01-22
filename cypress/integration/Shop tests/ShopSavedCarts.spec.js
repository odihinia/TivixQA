//dodaj dodawanie artykułu dod koszyka przed wszystkim. Chcemy w każdym teście robić 1 koszyk, na końcu ktorego go usuwać
///<reference types="cypress"/>

function GoToCarts()
{
    cy.get('[class="popoverstyle__PopoverWrapper-sc-w52wlq-0 ebcJXu popover-wrapper user-pages-dropdown right"]')  //possibly can be done better
    .find('[class="popover-handler"][tabindex="0"]').click()  //choosing the dropdown, but has to be foundi nside the previous get.
    cy.contains("Zapisane koszyki").click()
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
describe('Carts(++)', () =>{
    beforeEach( () => 
    {
    cy.ShopLogin()
    cy.visit("https://shop.getnowx.pl")
    UstawAdres()
    })


    it('Does everything with saved carts ++.', () => {
        cy.get('.product-meta > .button__StyledButton-sc-6gren8-0').first().click()  //pierwszy zielony koszyczek
        cy.contains("Koszyk").click() //wybranie prawej zakładki koszyka
        cy.contains("Czy chcesz zapisać koszyk?").click()  //Przejście do inputu zapisywania
        cy.get('.input__Input-sc-1m4o66e-0').type(Math.random(1,10))  //random nazwa
        cy.get('.couponstyle__CouponBoxWrapper-sc-frqofk-0 > .button__StyledButton-sc-6gren8-0').click()  //przycisk zapisz
        cy.get('#closeCart').click()  //zamyka koszyk
        GoToCarts()                    //idzie do koszyka
        cy.contains("Przywróć").click()  //Przywróć koszyk 1 
        cy.contains("Zamknij").click()  //zamykanie just in case
        cy.contains("Przywróć").click()  //jeszcze raz
        cy.contains("Przywróć").click()
        cy.contains("Elementy w Twoim koszyku zostały zaktualizowane").should("be.visible")  //asercja, powinny być widoczne 
        cy.contains("Ok").click()  //zamkniecie ekranu
        GoToCarts()  //jako że przywrócenie daje main page, wraca do koszyków
        cy.contains("Zmień nazwę").click()  //zmienia nazwe
        cy.get('.input__Input-sc-1m4o66e-0').clear().type(Math.random(1,10)) //zmiana nazwy na inny random
        cy.contains("Zapisz").click()   //zapisanie nowej nazwy
        cy.contains("Usuń").click()   //znalezienie i usunęcie koszyka
        cy.contains("Nie znaleziono zapisanego koszyka").should("be.visible") //asercja że koszyki powinny ==0
    })
})


describe('Carts(--)', () =>{
    beforeEach( () => 
    {
    cy.ShopLogin()
    cy.visit("https://shop.getnowx.pl")
    UstawAdres()
    })

    it.only('Does everything with saved carts --.', () => {
        cy.get('.product-meta > .button__StyledButton-sc-6gren8-0').first().click()  //pierwszy zielony koszyczek
        cy.contains("Koszyk").click() //wybranie prawej zakładki koszyka
        cy.contains("Czy chcesz zapisać koszyk?").click()  //Przejście do inputu zapisywania
        cy.get('.input__Input-sc-1m4o66e-0').type("TutajWprowadzamWchujDużoZnakówŻebyWyjebałaSięWeryfikacjaKoszyka")//za długa nazwa na koszyk
        cy.get('.couponstyle__CouponBoxWrapper-sc-frqofk-0 > .button__StyledButton-sc-6gren8-0').click() 
        cy.contains("Maksymalnie 36 znaków").should("be.visible")  //ppwinien być wyjebany error 36
        cy.get('.input__Input-sc-1m4o66e-0').clear()  //wyczysczenie
        .type(Math.random(1,10))  //random nazwa
        cy.get('.couponstyle__CouponBoxWrapper-sc-frqofk-0 > .button__StyledButton-sc-6gren8-0').click()  //przycisk zapisz
        cy.get('#closeCart').click()  //zamyka koszyk
        GoToCarts()                    //idzie do koszyka
        cy.contains("Przywróć").click()  //Przywróć koszyk 1 
        cy.contains("Zamknij").click()  //zamykanie just in case
        cy.contains("Przywróć").click()  //jeszcze raz
        cy.contains("Przywróć").click()
        cy.contains("Elementy w Twoim koszyku zostały zaktualizowane").should("be.visible")  //asercja, powinny być widoczne 
        cy.contains("Ok").click()  //zamkniecie ekranu

        GoToCarts()  //jako że przywrócenie daje main page, wraca do koszyków

        cy.contains("Zmień nazwę").click()  //zmienia nazwe
        cy.get('.input__Input-sc-1m4o66e-0').clear().type("TutajWprowadzamWchujDużoZnakówŻebyWyjebałaSięWeryfikacjaKoszyka")
        cy.contains("Zapisz").click()
        cy.contains("Error - valid maximum 'saved_name' characters is 64").should("be.visible")


        cy.contains("Zmień nazwę").click()  //zmienia nazwe
        cy.get('.input__Input-sc-1m4o66e-0').clear().type("2")
        cy.contains("Zapisz").click()
        cy.contains("Minimum 3 znaki").should("be.visible")
        cy.get('.input__Input-sc-1m4o66e-0').clear().type("222")
        cy.contains("Zapisz").click()
        cy.wait(1000)
        


        cy.contains("Zmień nazwę").click()  //zmienia nazwe
        cy.get('.input__Input-sc-1m4o66e-0').clear().type(Math.random(1,10)) //zmiana nazwy na inny random
        cy.contains("Zapisz").click()   //zapisanie nowej nazwy
        cy.contains("Usuń").click()   //znalezienie i usunęcie koszyka
        cy.contains("Nie znaleziono zapisanego koszyka").should("be.visible") //asercja że koszyki powinny ==0
    })
})

