class ShopPage {
    constructor(){
        this.sort = '.orderby';
        this.product = 'h3';
        this.item = '#wpmenucartli';
        this.qty = '.quantity';
        this.addToBasketBtn = 'button[type="submit"]';
        this.successMsg = '.woocommerce-message';
        this.cartContents = '.cartcontents';
        this.viewBasketLink = 'a[title="View Basket"]';
    }

    sortBy(option){
        cy.get(this.sort).select(option);
    }

    addToBasket(){
        cy.get(this.addToBasketBtn).click();
    }

    clickOnProduct(name){
        cy.get(this.product)
          .contains(name)
          .click();
    }

    addProductByID(id){
        cy.get(`a[data-product_id="${id}"]`).click(); //add to basket by data product ID
        cy.get(this.viewBasketLink).should('be.visible'); //verify 'View Basket' link is visible
    }

    inputQty(number){
        cy.get(this.qty)
          .find('input')
          .clear()
          .type(number);
    }

    verifySuccessMsg(productName, qty){
        const expectedMsg = `${qty} × “${productName}” have been added to your basket.`;
        
        cy.get(this.successMsg).should('contain', expectedMsg);
    }

    viewBasket(){
        cy.get(this.successMsg).contains('View Basket').click();
    }

    clickViewBasket(){
        cy.get(this.viewBasketLink).click();
    }
}

export default ShopPage;