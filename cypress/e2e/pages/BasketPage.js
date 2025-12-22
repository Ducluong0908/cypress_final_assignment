class BasketPage {
    constructor(){
        this.productNameCell = '.cart_item .product-name a';
        this.qtyCell = '.quantity input';
        this.emptyCart = '.cart-empty';
        this.updateBasketBtn = 'input[value="Update Basket"]';
        this.proceedCheckoutBtn = '.wc-proceed-to-checkout a';
        this.cartItem = '.cart_item';
    }
 
    verifyProductExist(productName, qty){
        cy.get(this.productNameCell).should('contain', productName);
        cy.get(this.productNameCell)
          .contains(productName)
          .parents(this.cartItem)
          .find(this.qtyCell)
          .should('have.value', qty);
    }
 
    removeProduct(productName){
        cy.get(this.productNameCell)
          .contains(productName)
          .parents(this.cartItem)
          .find('.remove')
          .click();  
    }
 
    verifyCartIsEmpty(){
        cy.get(this.emptyCart).should('contain', 'Your basket is currently empty.');
    }
 
    adjustQty(productName, newQty){
        cy.get(this.productNameCell)
          .contains(productName)
          .parents(this.cartItem)
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