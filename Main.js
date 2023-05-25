const Blockchain = require("./Blockchain");

let introCoin = new Blockchain;

introCoin.createTransaction(100, "ajgdhjwb", "dajkhbdjahwudhb");

introCoin.createBlock();

introCoin.createTransaction(60, "fndfrb", "dajkhbdjk,ujjhahwudhb");

introCoin.createBlock();

console.log(introCoin);
console.log(introCoin.chain[1].transactions);
console.log(introCoin.chain[1].timestamp);