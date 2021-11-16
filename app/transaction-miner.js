class TransactionMiner {
  constructor({ blockchain, transactionPool, wallet, pubsub }) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;
    this.pubsub = pubsub;
  }

  mineTransaction() {
    // get transaction pools valid transactions
    // generate the miners reward
    // add a block consisting of these transactions to the blockchain.chain
    // broadcast the updated blockchain
    // clear the pool
  }
}

module.exports = TransactionMiner;
