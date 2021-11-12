const Blockchain = require("./blockchain");

const Block = require("./block");

describe("Blockchain", () => {
  let blockchain;

  beforeEach(() => {
    blockchain = new Blockchain();
  });

  it("contains a `chain` Array instance", () => {
    expect(blockchain.chain instanceof Array).toBe(true);
  });

  it("starts with the genesis block", () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis());
  });

  it("adds a new block to the chain", () => {
    const newData = "foo bar";
    blockchain.addBlock({ data: newData });
    expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
  });

  describe("isValidChain()", () => {
    describe("when the chain does not start with genesis block", () => {
      it("Returns false", () => {
        blockchain.chain[0] = { data: "fake-genesis" };
        expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
      });
    });

    describe("when the chain starts with the genesis block and has multiple blocks", () => {
      beforeEach(() => {
        blockchain.addBlock({ data: "Virat" });
        blockchain.addBlock({ data: "Rohit" });
        blockchain.addBlock({ data: "Dhoni" });
      });
      describe("and the lastHash reference has changed", () => {
        it("returns false", () => {
          blockchain.chain[2].lastHash = "Rishabh";
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
        });
      });

      describe("and the chain contains a block with invalid field", () => {
        it("returns false", () => {
          blockchain.chain[2].data = "Rishabh";
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
        });
      });

      describe("and the chain does not contains a block with invalid field", () => {
        it("returns true", () => {
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
        });
      });
    });
  });
});
