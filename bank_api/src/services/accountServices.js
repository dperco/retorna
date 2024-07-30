import fs from 'fs';
import path from 'path';
import Account from '../models/account.js';

class AccountService {
  constructor() {
    this.operations = []; 
    this.accounts = this.loadAccounts(); 
    this.customers = this.loadCustomers();
    if (this.accounts.length > 0) {
      this.nextId = Math.max(...this.accounts.map(account => account.id)) + 1;
    } else {
      this.nextId = 1;
    }
  }

  loadAccounts() {
    
    const filePath = path.resolve('data/accounts.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const accountObjects = JSON.parse(data);
    return accountObjects.map(accountData => {
      const account = new Account(accountData.id, accountData.customerId, accountData.balance);
      account.transactions = accountData.transactions;
      return account;
    });
  }

  loadCustomers() {
    const filePath = path.resolve('data/customers.json');
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  }

  async createAccount(customerId, initialDeposit) {
    const customer = this.customers.find(c => c.id == customerId);
    if (!customer) {
      throw new Error('Customer not found');
    }
    const account = new Account(this.nextId++, customerId, initialDeposit);
    this.accounts.push(account);
    await this.saveData(); 
    return account;
  }

  getAccountById(accountId) {
    return this.accounts.find(account => account.id == accountId);
  }

  transferFunds(sourceAccountId, targetAccountId, amount) {
    const sourceAccount = this.getAccountById(sourceAccountId);
    const targetAccount = this.getAccountById(targetAccountId);
    if (!sourceAccount || !targetAccount) {
      throw new Error('Account not found');
    }
    sourceAccount.transfer(amount, targetAccount);
    this.operations.push({ type: 'transfer', amount, date: new Date(), from: sourceAccountId, to: targetAccountId }); // Agregar la operación al array de operaciones
    this.saveData(); 
  }

  getAccountBalance(accountId) {
    const account = this.accounts.find(c=>c.id == accountId);
    if (!account) {
      throw new Error('Account not found');
    }
    return account.balance;
  }

  getAccountTransactions(accountId) {
    const account = this.getAccountById(accountId);
    if (!account) {
      throw new Error('Account not found');
    }
    return account.getTransactions();
  }

  deposit(accountId, amount) {
    const account = this.getAccountById(accountId);
    if (!account) {
      throw new Error('Account not found');
    }
    account.balance += amount;
    account.transactions.push({ type: 'deposit', amount, date: new Date() });
    this.saveData();
  }

  withdraw(accountId, amount) {
    const account = this.getAccountById(accountId);
    if (!account) {
      throw new Error('Account not found');
    }
    if (account.balance < amount) {
      throw new Error('Insufficient funds');
    }
    account.balance -= amount;
    account.transactions.push({ type: 'withdrawal', amount, date: new Date() });
    this.saveData();
  }

  getAllAccounts() {
    return this.accounts;
  }

  getAllOperations() {
    return this.operations; 
  }

  saveData() {
    return new Promise((resolve, reject) => {
      const filePath = path.resolve('data/accounts.json');
      fs.writeFile(filePath, JSON.stringify(this.accounts), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
  
      const operationsPath = path.resolve('data/operations.json');
      fs.writeFile(operationsPath, JSON.stringify(this.operations), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

export default new AccountService();