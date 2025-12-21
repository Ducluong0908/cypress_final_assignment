import HomePage from '../pages/HomePage';
import MyAccountPage from '../pages/MyAccountPage';
import ShopPage from '../pages/ShopPage';
import BasketPage from '../pages/BasketPage';

const homePage = new HomePage();
const myAccountPage = new MyAccountPage();
const shopPage = new ShopPage();
const basketPage = new BasketPage();

describe('template spec', () => {
  beforeEach(function() {
    cy.visit('https://practice.automationtesting.in/');
    cy.fixture('users').then((data) => {
      this.userData = data;
    })
  });

  // it('TC1 - Register with empty Email/Password', function() {
  //   homePage.openMyAccount();
  //   myAccountPage.clickLoginBtn();
  //   myAccountPage.verifyErrorMsg('Error: Username is required.');
  // });

  // it('TC2 - Register with valid Email and Password', function() {
  //   homePage.openMyAccount();
  //   myAccountPage.register(
  //     this.userData.validUser.email, //get valid email from fixture file
  //     this.userData.validUser.password //get valid password from fixture file
  //   );
  //   myAccountPage.verifyLoginSucess(`Hello ${this.userData.validUser.username} (not ${this.userData.validUser.username} Sign out)`);
  // });

  // it('TC3 - Login with invalid Email and Password', function() {
  //   homePage.openMyAccount();
  //   myAccountPage.login(
  //     this.userData.invalidUser.email, //get invalid email from fixture file
  //     this.userData.invalidUser.password //get invalid password from fixture file
  //   );

  //   myAccountPage.verifyErrorMsg(`Error: The password you entered for the username ${this.userData.invalidUser.email} is incorrect. Lost your password?`);
  // });

  // it('TC4 - Login with valid Email and Password', function() {
  //   homePage.openMyAccount();
  //   myAccountPage.login(
  //     this.userData.validUser.email,
  //     this.userData.validUser.password
  //   ) 
  //   myAccountPage.verifyLoginSucess(`Hello ${this.userData.validUser.username} (not ${this.userData.validUser.username} Sign out)`);
  // });

  it('TC5 - Verify Product sorting by Price', () => {
    homePage.openShop();
    shopPage.sortBy('Sort by price: high to low');
    //verify sorting result...
  });

  it('TC6 - Add Products to Cart and verify Cart content', () => {
    const seleniumRuby = 'Selenium Ruby';
    const masteringJS = 'Mastering JavaScript';
    const inputQty = 10;

    //add Selenium Ruby to basket
    homePage.openShop(); //Navigate to Shop page
    shopPage.clickOnProduct(seleniumRuby);
    shopPage.inputQty(inputQty);
    shopPage.addToBasket();
    shopPage.verifySuccessMsg(seleniumRuby, inputQty); //verify success message
    shopPage.viewBasket(); //Navigate to Basket page 
    basketPage.verifyProductExist(seleniumRuby, inputQty); //verify Selenium Ruby is in basket with correct quantity

    //add Mastering JavaScript to basket
    homePage.openShop(); 
    shopPage.addProductByID(165); //Mastering JavaScript has data-product_id="165"
    shopPage.clickViewBasket(); //added successfully and then navigate to Basket page
    basketPage.verifyProductExist(masteringJS, 1); //verify Mastering JavaScript is in basket with correct quantity

    //Remove existing products from basket
    basketPage.removeProduct(seleniumRuby);
    basketPage.removeProduct(masteringJS); 
    basketPage.verifyCartIsEmpty();   
  });

  it('TC7 - Checkout Process with valid information', () => {
    const seleniumRuby = 'Selenium Ruby';

    //login with valie user
    homePage.openMyAccount();
    myAccountPage.login(
      this.userData.validUser.email,
      this.userData.validUser.password
    );

    //add Selenium Ruby to basket
    homePage.openShop();
    shopPage.addProductByID(160); //Selenium Ruby has data-product_id="160"
    shopPage.clickViewBasket(); //added successfully and then navigate to Basket page
    shopPage.viewBasket();
    basketPage.verifyProductExist(seleniumRuby, 1); //verify Selenium Ruby is in basket with correct quantity
    basketPage.adjustQty(seleniumRuby, 5); //change quantity to 5
    basketPage.updateBasket(); //click 'Update Basket' button
    basketPage.verifyProductExist(seleniumRuby, 5); //verify quantity is updated to 5

    //Proceed to Checkout
    basketPage.proceedToCheckout();

    



  });
})