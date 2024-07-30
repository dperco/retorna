class Account {
    constructor(id, customerId, balance = 0) {
      this.id = id;
      this.customerId = customerId;
      this.balance = balance;
      this.transactions = [];
    }
  
    deposit(amount) {
      this.balance += amount;
      this.transactions.push({ type: 'deposit', amount, date: new Date() });
    }
  
    withdraw(amount) {
      if (amount > this.balance) {
        throw new Error('Insufficient funds');
      }
      this.balance -= amount;
      this.transactions.push({ type: 'withdraw', amount, date: new Date() });
    }
  
    transfer(amount, targetAccount) {
      this.withdraw(amount);
      targetAccount.deposit(amount);
      this.transactions.push({ type: 'transfer', amount, date: new Date(), to: targetAccount.id });
      targetAccount.transactions.push({ type: 'transfer', amount, date: new Date(), from: this.id });
    }
  
    getBalance() {
      return this.balance;
    }
  
    getTransactions() {
      return this.transactions;
    }
  }
  
export default Account;