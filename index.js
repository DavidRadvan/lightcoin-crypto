class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let transaction of this.transactions) {
      balance += transaction;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction.value);
  }

}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    this.time = new Date();
    if (this.value < 0 && this.account.balance + this.value < 0) {
      console.log("Error: Cannot withdraw (no money left in account)");
    } else {
      this.account.addTransaction(this);
    }
  }
}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected


const myAccount = new Account("snow-patrol");

let t1 = new Withdrawal(50, myAccount);
t1.commit();
console.log('Transaction 1:', t1);

let t2 = new Withdrawal(10, myAccount);
t2.commit();
console.log('Transaction 2:', t2);

let t3 = new Deposit(160, myAccount);
t3.commit();
console.log('Transaction 3:', t3);

let t4 = new Withdrawal(60, myAccount);
t4.commit();
console.log('Transaction 4:', t4);

console.log('Balance:', myAccount.balance);
