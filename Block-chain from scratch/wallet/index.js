const { STARTING_BALANCE } = require("../config");
const { ec } = require('../util');
const {cryptoHash } = require("../util");


class Wallet{
    constructor(){
        this.balance = STARTING_BALANCE;
        this.keyPair = ec.genKeyPair();
        
        //KeyPair module was imported from the elliptic cryptography(ec) to 
        //generate a valid strong private and public keys
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    sign(data){
        // the sign function comes from the elliptic curve library
        return this.keyPair.sign(cryptoHash(data))
        
    }




}




module.exports = Wallet;