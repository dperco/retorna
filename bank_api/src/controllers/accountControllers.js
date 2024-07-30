import accountService from '../services/accountServices.js';

const createAccount = async (req, res) => {
  try {
    const { customerId, initialDeposit } = req.body;
    const account = await accountService.createAccount(customerId, initialDeposit);
    res.status(201).json(account);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const transferFunds = (req, res) => {
  const { sourceAccountId, targetAccountId, amount } = req.body;
  try {
    accountService.transferFunds(sourceAccountId, targetAccountId, amount);
    const account = accountService.getAccountById(sourceAccountId);
    res.status(200).json({ message: 'Transfer successful' , account });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAccountBalance = (req, res) => {
  const { accountId } = req.params;
  try {
    const balance = accountService.getAccountBalance(accountId);
    res.status(200).json({ balance });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAccountTransactions = (req, res) => {
  const { accountId } = req.params;
  try {
    const transactions = accountService.getAccountTransactions(accountId);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllAccounts = (req, res) => {
  try {
    const accounts = accountService.getAllAccounts();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deposit = (req, res)=> {
  try {
    const accountId = req.params.accountId;
    const { amount } = req.body;
    const deposit= accountService.deposit(accountId, amount);
    const account = accountService.getAccountById(accountId);
    res.status(200).send({ message: 'Deposit successful', account });
  } catch (error) {
    res.status(500).send({ message: error.message });
  };
  };
  const withdraw = (req, res) => {
    try {
      const accountId = req.params.id;
      const { amount } = req.body;
      const withdrawal= accountService.withdraw(accountId, amount);
      const account = accountService.getAccountById(accountId);
      res.status(200).send({ message: 'Withdrawal successful' , account });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };


export default {
  createAccount,
  transferFunds,
  getAccountBalance,
  getAccountTransactions,
  deposit,
  withdraw,
  getAllAccounts 
};