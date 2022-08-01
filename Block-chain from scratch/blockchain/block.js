//importing libraries and objects' properties
const hextoBinary = require('hex-to-binary');
const { GENESIS_DATA, MINE_RATE } = require("../config");
const {cryptoHash } = require("../util");

class Block{
    //a block must have all of the properties below
    constructor({timestamp, lastHash, hash, data, nonce, difficulty}){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    //must be a hard-coded genesis block
    static genesis(){
        return new this(GENESIS_DATA);

    };

    //a static function that mines block 
    static mineBlock({lastBlock, data}){
        let hash, timestamp;
        const lastHash = lastBlock.hash;
        let  {difficulty} = lastBlock;
        let nonce = 0;

        do{
            nonce += 1;
            timestamp = Date.now()
            difficulty = Block.adjustDifficulty({originalBlock: lastBlock, timestamp})
            hash = cryptoHash(timestamp,lastHash,data, nonce, difficulty);
        }while(hextoBinary(hash).substring(0,difficulty) !== '0'.repeat(difficulty));

        return new this({timestamp, lastHash, data, difficulty, nonce, hash});

    }

    static adjustDifficulty({ originalBlock, timestamp }){
        const { difficulty } = originalBlock
        
        if (difficulty < 1) return 1;

        const difference = timestamp - originalBlock.timestamp

        if(difference > MINE_RATE) return difficulty - 1;

        return difficulty + 1;

    };

};

module.exports = Block;


