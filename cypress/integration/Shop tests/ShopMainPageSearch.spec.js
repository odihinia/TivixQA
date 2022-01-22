///<reference types="cypress"/>
describe('ShopMainpage++', () => {
  function UstawAdres(){
    cy.get('#AddressButton').click()
    //cy.get('.button__StyledButton-sc-6gren8-0').contains("Ustaw adres dostawy").should("be.visible").click()
    cy.get('#autoCompleteId').clear().type("Racławicka 2, Wrocław")
    cy.contains("Ustaw").should("be.visible").click()
  }

  beforeEach(()=>{
    cy.ShopLogin()
    cy.visit("https://shop.getnowx.pl")
    UstawAdres()
    })

  it('Checks availability of articles', () => {
    cy.get('[class="popover-handler"][tabindex="-1"]').first().trigger("mouseover")  // tutaj limtiacja cy.hover(). Trigger mouseover jest podobne.//color: rgb(251, 192, 45);
    cy.get('.popover-content').should("contain","Ostatnie")  //kinda flaky test, czasami wyłapie źle. Musze ogarnąć getowanie po css   
  })
  it('Looks milka up', () => {
    cy.get('#layout-header > .search-boxstyle__StyledForm-sc-1p7r5j6-0 > .search-boxstyle__StyledInput-sc-1p7r5j6-1').should("be.visible").click()
    cy.get('#search-drawer').should("be.visible").type("Milka")
    cy.contains("Nie znaleziono żadnych produktów").should("not.exist")  //czyli że powinno znaleźć cokolwiek z "milka"
  })
  it('Inputs some random garbage', () => {
    cy.get('#layout-header > .search-boxstyle__StyledForm-sc-1p7r5j6-0 > .search-boxstyle__StyledInput-sc-1p7r5j6-1').should("be.visible").click()
    cy.get('#search-drawer').should("be.visible").type('!@#!@#!@$!@%!#%!#$^@!$#^@!#5')
    cy.contains("Nie znaleziono żadnych produktów").should("be.visible")   //powinno nie być takiego wyświetlonego
    cy.contains("bestsellery").should("be.visible")  //powinno zaprezentować nasze bestsellery
  })
  it('Tries for class atribute of szukajka and properties', () => {
    cy.get('.search-boxstyle__StyledInput-sc-1p7r5j6-1')
      .invoke('attr','placeholder')
      .then(classValue  =>{
      expect(classValue).to.equal("Szukaj produktów")
    })
  })
})