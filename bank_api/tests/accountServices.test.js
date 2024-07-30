const accountService = require('../src/services/accountService');

describe('AccountService', () => {
  beforeEach(() => {
    accountService.accounts = [];
    accountService.nextId = 1;
  });

  test('should create a new account', () => {
    const account = accountService.createAccount(1, 100);
    expect(account).toHaveProperty('id', 1);
    expect(account).toHaveProperty('customerId', 1);
    expect(account).toHaveProperty('balance', 100);
  });

  test('should transfer funds between accounts', () => {
    const account1 = accountService.createAccount(1, 100);
    const account2 = accountService.createAccount(2, 50);
    accountService.transferFunds(account1.id, account2.id, 50);
    expect(account1.balance).toBe(50);
    expect(account2.balance).toBe(100);
  });

  test('should get account balance', () => {
    const account = accountService.createAccount(1, 100);
    const balance = accountService.getAccountBalance(account.id);
    expect(balance).toBe(100);
  });

  test('should get account transactions', () => {
    const account = accountService.createAccount(1, 100);
    account.deposit(50);
    account.withdraw(30);
    const transactions = accountService.getAccountTransactions(account.id);
    expect(transactions.length).toBe(3);
  });
});