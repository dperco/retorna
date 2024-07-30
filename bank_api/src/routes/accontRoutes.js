import express from 'express';
import accountController from '../controllers/accountControllers.js';

const router = express.Router();

router.post('/accounts', accountController.createAccount);
router.post('/accounts/transfer', accountController.transferFunds);
router.get('/accounts/:accountId/balance', accountController.getAccountBalance);
router.get('/accounts/:accountId/transactions', accountController.getAccountTransactions);
router.post('/accounts/:accountId/deposit', accountController.deposit);
router.post('/accounts/:id/withdraw', accountController.withdraw);
router.get('/accounts', accountController.getAllAccounts);

export default router;