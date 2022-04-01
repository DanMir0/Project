import LoginPage from  '../pageobjects/login.page';

describe('Counterparties', () => {
    it('should open table with Counterparties', async () => {
        await LoginPage.open();
        //await LoginPage.login('tomsmith', 'SuperSecretPassword!');
        await expect($('.v-toolbar__title')).toBeExisting();
        await expect($('.v-toolbar__title')).toHaveTextContaining('Контрагенты');
    });
});


