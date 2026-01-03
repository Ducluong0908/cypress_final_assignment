class HomePage {
    constructor(){
        this.shop = '#menu-item-40';
        this.myAccount = '#menu-item-50';
        this.menuIcon = '#menu-icon';
        this.firstSlider = 'div[data-id="36"]';
        this.secondSlider = 'div[data-id="34"]';
        this.thirdSlider = 'div[data-id="35"]';
        this.previousBtn = '#n2-ss-6-arrow-previous';
        this.nextBtn = '#n2-ss-6-arrow-next';
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

    verifySliders(){
        //Verify first slider
        cy.get(this.firstSlider).should('be.visible');
        //Click next button
        cy.get(this.nextBtn).click();
        //Verify second slider
        cy.get(this.secondSlider).should('be.visible'); 
        //Click next button
        cy.get(this.nextBtn).click();
        //Verify third slider
        cy.get(this.thirdSlider).should('be.visible'); 
        //Click next button
        cy.get(this.nextBtn).click();
        //Verify first slider
        cy.get(this.firstSlider).should('be.visible');
    }
}
 
export default HomePage;