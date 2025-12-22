class CheckoutPage {
    constructor() {
        this.firstName = '#billing_first_name';
        this.lastName = '#billing_last_name';
        this.phone = '#billing_phone';
        this.email = '#billing_email';
        this.address = '#billing_address_1';
        this.city = '#billing_city';
        this.state = '#s2id_billing_state';
        this.stateList = '#select2-results-2';
        this.country = '#s2id_billing_country';
        this.countryList = '#select2-drop';
        this.placeOrderBtn = '#place_order';
        this.postCode = '#billing_postcode';
        this.successMsg = '.woocommerce-thankyou-order-received';
    };
 
    keyFirstName(text){
        cy.get(this.firstName)
          .clear()
          .type(text);
    };
   
    keyLastName(text){
        cy.get(this.lastName)
          .clear()
          .type(text);
    };
 
    keyEmail(text){
        cy.get(this.email)
          .clear()
          .type(text);
    };
 
    keyPhone(number){
        cy.get(this.phone)
          .clear()
          .type(number);
    };
 
    keyAddress(text){
        cy.get(this.address).type(text);
    };
 
    keyDistrict(text){
        cy.get(this.city).type(text);
    };
 
    keyPostCode(number){
        cy.get(this.postCode)
          .clear()
          .type(number);
    };
 
    selectCountry(name){
        cy.get(this.country).click();
        cy.get(this.countryList)
          .contains(new RegExp(`^${name}$`, "g")) //find the exact State name
          .click();
    };
 
    selectState(name){
        cy.get(this.state).click();
        cy.get(this.stateList)
          .contains(new RegExp(`^${name}$`, "g")) //find the exact State name
          .click();
    };
 
    placeOrder(){
        cy.get(this.placeOrderBtn).click();
    }
 
    verifySuccessOrder(text){
        cy.get(this.successMsg).should('have.text', text);
    }
}
 
export default CheckoutPage;