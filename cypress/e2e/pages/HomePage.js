class HomePage {
    constructor(){
        this.shop = '#menu-item-40';
        this.myAccount = '#menu-item-50';
        this.menuIcon = '#menu-icon';
    }
 
    clickMenuIcon(){
        cy.get(this.menuIcon).click();
    }
   
    openMyAccount(){
        this.clickMenuIcon();
        cy.get(this.myAccount).click();
        cy.url().should('include', '/my-account/');
    }
 
    openShop(){
        this.clickMenuIcon();
        cy.get(this.shop).click();
        cy.url().should('include', '/shop/');
    }
}
 
export default HomePage;