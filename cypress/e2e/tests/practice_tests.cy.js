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

describe('Practice Tests', () => {
  beforeEach(function() {
    cy.visit('http://practice.automationtesting.in/');
    // cy.fixture('users').then((data) => {
    //   this.userData = data;
    // })
  });
 
  it('TC1: Home Page with three Sliders only', function() {
    homePage.openShop();
    shopPage.navigateToHome();
    homePage.verifySliders();
  });
})