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
    }

    openShop(){
        this.clickMenuIcon();
        cy.get(this.shop).click();
    }

    // getText(selector){
    //     return cy.get(selector)
    //         .should('be.visible')
    //         .invoke('text')
    //         .then((text) => text.trim());
    // }
}

export default HomePage;