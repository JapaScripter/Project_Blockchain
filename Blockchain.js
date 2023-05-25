const SHA256 = require("sha256");

class Blockchain {
	constructor() {
		this.chain = [this.createGenesisBlock()];
		this.pendingTransaction = [];
	}

	createGenesisBlock() {
		return {
			index: 1,
			timestamp: Date.now,
			transaction: [],
			nonce: 0,
			hash: "hash",
			previousBlockHash: "previousBlockHash",
		}
	}

	getLastBlock() {
		return this.chain[this.chain.length - 1];
	}

	generateHash(previousBlockHash, timestamp, pendingTransaction) {
		let hash = "";
		let nonce = 0;

		while (hash.substring(0, 3) !== "000") {
			nonce++;
			hash = SHA256(
				previousBlockHash +
				timestamp +
				JSON.stringify(pendingTransaction) +
				nonce
			).toString();
		}

		return { hash, nonce };
	}

	createTransaction(amount, sender, recipient) {
		this.pendingTransaction.push({ amount, sender, recipient });
	}

	createBlock() {
		const timestamp = Date.now();
		const transactions = this.pendingTransaction;
		const previousBlockHash = this.getLastBlock().hash;
		const generateHash = this.generateHash(
			previousBlockHash,
			timestamp,
			transactions,
		);
		const newBlock = {
			index: this.chain.length + 1,
			timestamp,
			transactions,
			nonce: generateHash.nonce,
			hash: generateHash.hash,
			previousBlockHash,
		};

		this.pendingTransaction = [];
		this.chain.push(newBlock);

		return newBlock;
	}
}

module.exports = Blockchain;
/*
console.log(SHA256("man").toString());

let hash = "";
let nonce = 0;

while (hash.substring(0, 3) !== "000") {
	nonce++;
	hash = SHA256("man" + 5707).toString();
}

console.log(nonce);
console.log("\n");
console.log(hash);
*/