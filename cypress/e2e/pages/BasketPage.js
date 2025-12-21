class BasketPage {
    constructor(){
        this.productNameCell = '.cart_item .product-name a';
        this.qtyCell = '.quantity input';
        this.emptyCart = '.cart-empty';
        this.updateBasketBtn = 'input[value="Update Basket"]';
        this.proceedCheckoutBtn = '.wc-proceed-to-checkout a';
    }

    verifyProductExist(productName, qty){
        cy.get(this.productNameCell).should('contain', productName); //verify product name in cart
        cy.get(this.productNameCell)
          .contains(productName)
          .parents('.cart_item')
          .find(this.qtyCell)
          .should('have.value', qty); //verify product qty in cart
    }

    removeProduct(productName){
        cy.get(this.productNameCell)
          .contains(productName)
          .parents('.cart_item')
          .find('.remove')
          .click();   
    }

    verifyCartIsEmpty(){
        cy.get(this.emptyCart).should('contain', 'Your basket is currently empty.');
    }

    adjustQty(productName, newQty){
        cy.get(this.productNameCell)
          .contains(productName)
          .parents('.cart_item')
          .find(this.qtyCell)
          .clear()
          .type(newQty);
    }

    updateBasket(){
        cy.get(this.updateBasketBtn).click();
    }

    proceedToCheckout(){
        cy.get(this.proceedCheckoutBtn).click();
    }
}

export default BasketPage;