const Blockchain = require('../blockchain');

//THis function shows the difficulty and the time needed to mine a block

const blockchain = new Blockchain();

blockchain.addBlock({data: 'initial'});
console.log('first block: ', blockchain.chain[blockchain.chain.length - 1])

let PrevTimestamp, nextTimestamp, nextBlock, timeDiff, average;

const times = [];

for (let i = 0; i< 10000; i++){
    PrevTimestamp = blockchain.chain[blockchain.chain.length-1].timestamp;

    blockchain.addBlock({data: `block ${i}`});
    nextBlock = blockchain.chain[blockchain.chain.length-1];

    nextTimestamp = nextBlock.timestamp;
    timeDiff = nextBlock.timestamp - PrevTimestamp
    times.push(timeDiff)

    average = times.reduce((total,num) => (total + num))/times.length;

    console.log(`Time to mine a block: ${timeDiff}ms. Difficulty: ${nextBlock.difficulty}. Average time: ${average}.ms`);

}

