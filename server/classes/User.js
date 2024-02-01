class Users {
  constructor(id, balance) {
    this.id = id;
    this.balance = balance;
  }

  addSumToBalance(additionAmount) {
    this.balance += Number(additionAmount);
    console.log(this.balance);
    return this.balance;
  }

  subtractSumToBalance(subtractionAmount) {
    let result;
    if (subtractionAmount <= this.balance) {
      (this.balance -= Number(subtractionAmount));
      result = this.balance;
    } else {
      result = { message: 'У пользователя отсутствует нужное количество денежных средств' };
    }
    return result;
  }
}

module.exports = Users;
