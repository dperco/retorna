// document.getElementById('create-account-form').addEventListener('submit', async (event) => {
//     event.preventDefault();
//     const customerId = document.getElementById('customer-id').value;
//     const initialDeposit = document.getElementById('initial-deposit').value;
  
//     const response = await fetch('/api/accounts', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ customerId, initialDeposit })
//     });
  
//     const data = await response.json();
//     alert(`Account created with ID: ${data.id}`);
//   });
  
//   document.getElementById('transfer-funds-form').addEventListener('submit', async (event) => {
//     event.preventDefault();
//     const sourceAccountId = document.getElementById('source-account-id').value;
//     const targetAccountId = document.getElementById('target-account-id').value;
//     const amount = document.getElementById('amount').value;
  
//     const response = await fetch('/api/accounts/transfer', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ sourceAccountId, targetAccountId, amount })
//     });
  
//     const data = await response.json();
//     if (response.ok) {
//       alert('Transfer successful');
//     } else {
//       alert(`Error: ${data.error}`);
//     }
//   });
  
//   document.getElementById('get-balance-form').addEventListener('submit', async (event) => {
//     event.preventDefault();
//     const accountId = document.getElementById('balance-account-id').value;
  
//     const response = await fetch(`/api/accounts/${accountId}/balance`);
//     const data = await response.json();
//     if (response.ok) {
//       document.getElementById('balance-result').textContent = `Balance: ${data.balance}`;
//     } else {
//       alert(`Error: ${data.error}`);
//     }
//   });
  
//   document.getElementById('get-transactions-form').addEventListener('submit', async (event) => {
//     event.preventDefault();
//     const accountId = document.getElementById('transactions-account-id').value;
  
//     const response = await fetch(`/api/accounts/${accountId}/transactions`);
//     const data = await response.json();
//     if (response.ok) {
//       const transactionsList = document.getElementById('transactions-result');
//       transactionsList.innerHTML = '';
//       data.forEach(transaction => {
//         const listItem = document.createElement('li');
//         listItem.textContent = `${transaction.type} of ${transaction.amount} on ${new Date(transaction.date).toLocaleString()}`;
//         transactionsList.appendChild(listItem);
//       });
//     } else {
//       alert(`Error: ${data.error}`);
//     }
//   });