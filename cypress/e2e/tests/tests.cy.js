import HomePage from '../pages/HomePage';
import MyAccountPage from '../pages/MyAccountPage';
import ShopPage from '../pages/ShopPage';
import BasketPage from '../pages/BasketPage';
import CheckoutPage from '../pages/CheckoutPage';
 
const homePage = new HomePage();
const myAccountPage = new MyAccountPage();
const shopPage = new ShopPage();
const basketPage = new BasketPage();
const checkoutPage = new CheckoutPage();
 
describe('template spec', () => {
  beforeEach(function() {
    cy.visit('http://practice.automationtesting.in/');
    cy.fixture('users').then((data) => {
      this.userData = data;
    })
  });
 
  it('TC1 - Register with empty Email/Password', function() {
    homePage.openMyAccount();
    myAccountPage.clickLoginBtn();
    myAccountPage.verifyErrorMsg('Error: Username is required.');
  });
 
  it('TC2 - Register with valid Email and Password', function() {
    homePage.openMyAccount();
    myAccountPage.register(
      this.userData.validUser.email, //Get valid email from fixture
      this.userData.validUser.password //Get valid password from fixture
    );
    myAccountPage.verifyLoginSucess(`Hello ${this.userData.validUser.username} (not ${this.userData.validUser.username}? Sign out)`);
  });
 
  it('TC3 - Login with invalid Email and Password', function() {
    homePage.openMyAccount();
    myAccountPage.login(
      this.userData.invalidUser.email, //Get invalid email from fixture
      this.userData.invalidUser.password //Get invalid password from fixture
    );
 
    myAccountPage.verifyErrorMsg(`Error: The password you entered for the username ${this.userData.invalidUser.email} is incorrect. Lost your password?`);
  });
 
  it('TC4 - Login with valid Email and Password', function() {
    homePage.openMyAccount();
    myAccountPage.login(
      this.userData.validUser.email,
      this.userData.validUser.password
    )
    myAccountPage.verifyLoginSucess(`Hello ${this.userData.validUser.username} (not ${this.userData.validUser.username}? Sign out)`);
  });
 
  it('TC5 - Verify Product sorting by Price', () => {
    homePage.openShop();
    shopPage.sortBy('Sort by price: high to low');
    cy.wait(2000);
    cy.get('.price').then(($prices) => {
      //Create an array to store prices
      const priceList = [];

      $prices.each((index, el) => {
        const $el = Cypress.$(el); //Wrap DOM element to jQuery object

        if($el.find('ins').length > 0) { //Check if product has discounted the price
          const text = $el.find('ins .woocommerce-Price-amount').text().trim(); //Get discounted price text
          const cleanText = text.replace(/[^0-9.]/g, ''); //remove unwanted characters
          priceList.push(parseFloat(cleanText)); //Convert text to number, then add the priceList array
        } else {
          const text = $el.find('.woocommerce-Price-amount').text().trim();
          const cleanText = text.replace(/[^0-9.]/g, '');
          priceList.push(parseFloat(cleanText));
        }
      });
      //Sort priceList in descending order
      const sortedPriceList = [...priceList].sort((a, b) => b - a);
      
      expect(priceList).to.deep.equal(sortedPriceList); //Assert priceList is sorted in descending order
      //Log out the two lists 
      cy.log('UI List: ' + priceList.join(', '));
      cy.log('Sorted List: ' + sortedPriceList.join(', '));
    });
  });

  it('TC6 - Add Products to Cart and verify Cart content', () => {
    const seleniumRuby = 'Selenium Ruby';
    const masteringJS = 'Mastering JavaScript';
    const inputQty = 10;
 
    //Add Selenium Ruby to basket
    homePage.openShop(); //Navigate to Shop page
    shopPage.clickOnProduct(seleniumRuby);
    shopPage.inputQty(inputQty);
    shopPage.addToBasket();
    shopPage.verifySuccessMsg(seleniumRuby, inputQty);
    shopPage.viewBasket(); //Navigate to Basket page
    basketPage.verifyProductExist(seleniumRuby, inputQty); //Verify the result matches with expected quantity
 
    //Add Mastering JavaScript to basket
    homePage.openShop();
    shopPage.addProductByID(165); //Mdastering JavaScript has data-product_id="165"
    shopPage.clickViewBasket(); //Added successfully and then navigate to Basket page
    basketPage.verifyProductExist(masteringJS, 1); //Verify the result matches with expected quantity
 
    //Remove existing products from basket
    basketPage.removeProduct(seleniumRuby);
    basketPage.removeProduct(masteringJS);
    basketPage.verifyCartIsEmpty();  
  });
 
  it('TC7 - Checkout Process with valid information', function() {
    const seleniumRuby = 'Selenium Ruby';
 
    //Login with valie user
    homePage.openMyAccount();
    myAccountPage.login(
      this.userData.validUser.email,
      this.userData.validUser.password
    );
    myAccountPage.verifyLoginSucess(`Hello ${this.userData.validUser.username} (not ${this.userData.validUser.username}? Sign out)`);
 
    //Add Selenium Ruby to basket
    homePage.openShop();
    shopPage.addProductByID(160); //Selenium Ruby has data-product_id="160"
    shopPage.clickViewBasket(); //Navigate to Basket page
    basketPage.verifyProductExist(seleniumRuby, 1); //Verify Selenium Ruby has correct quantity
    basketPage.adjustQty(seleniumRuby, 5); //Adjust quantity to 5
    basketPage.updateBasket();
    basketPage.verifyProductExist(seleniumRuby, 5); //Verify the result matches with expected quantity
    basketPage.proceedToCheckout();
   
    //Fill in Checkout Form
    checkoutPage.keyFirstName('Fname');
    checkoutPage.keyLastName('Lname');
    checkoutPage.keyEmail(this.userData.validUser.email);
    checkoutPage.keyPhone('0123456789');
    checkoutPage.selectCountry('Hong Kong');
    checkoutPage.keyAddress('Hanoi');
    checkoutPage.keyDistrict('Badinh');
    checkoutPage.selectState('Hong Kong Island');
    checkoutPage.keyPostCode('123456');
 
    //Verify displaying correct Tax amount
    const subTotalEl = '#order_review table tfoot .cart-subtotal';
    const taxEl = '#order_review table tfoot .tax-rate';
 
    cy.parseNumber(subTotalEl).as('subTotal1'); //Parse Subtotal to number and store it in Alias
    cy.parseNumber(taxEl).as('tax1'); //Parse Tax to number as 5% and store it in Alias
    cy.then(function() {
      const expectedTax = this.subTotal1 *0.05;
      const actualTax = this.tax1;
      //Assertion these two amounts
      expect(actualTax).to.equal(expectedTax);
    });
   
    // Re-select Country and check Tax amount
    checkoutPage.selectCountry('India');
    checkoutPage.selectState('Assam')
    cy.wait(3000);
    cy.parseNumber(subTotalEl).as('subTotal2'); //parse Subtotal to number and store it in Alias
    cy.parseNumber(taxEl).as('tax2'); //parse Tax to number as 2% and store it in Alias
    cy.then(function() {
      const expectedTax = this.subTotal2 *0.02;
      const actualTax = this.tax2;
      //Assertion these two amounts
      expect(actualTax).to.equal(expectedTax);
    });
 
    //Place Order
    checkoutPage.placeOrder();
    checkoutPage.verifySuccessOrder('Thank you. Your order has been received.');
  });
});