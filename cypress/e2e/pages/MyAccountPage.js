class MyAccountPage {
    constructor(){
        this.username = '#username';
        this.password = '#password';
        this.regEmail = '#reg_email';
        this.regPassword = '#reg_password';
        this.loginBtn = 'input[name="login"]';
        this.registerBtn = 'input[name="register"]'
        this.errorMsg = '.woocommerce-error li';
        this.pageContent = '.woocommerce-MyAccount-content p';
    }
 
    clickLoginBtn(){
        cy.get(this.loginBtn).click();
    }
 
    clickRegisterBtn(){
        cy.get(this.registerBtn).click();
    }
 
    login(username, password){
        cy.get(this.username).type(username);
        cy.get(this.password).type(password, { log: false });
        this.clickLoginBtn();
    }
 
    register(username, password){
        cy.get(this.regEmail).type(username);
        cy.get(this.regPassword).type(password);
        this.clickRegisterBtn();
    }
 
    verifyErrorMsg(expectedMsg){
        cy.get(this.errorMsg).should('have.text', expectedMsg);
    }
 
    verifyLoginSucess(expectedMsg){
        cy.get(this.pageContent).should('contain', expectedMsg);
    }
}
 
export default MyAccountPage;