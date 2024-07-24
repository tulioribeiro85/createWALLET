//importando as dependencias
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//definir a rede 
//bitcoin - rede principal - mainnet
//testnet - rede de teste - testnet
const network = bitcoin.networks.testnet

//derivação de carteiras HD
//Use m/49'/0'/0'/0 se for mainnet
const path = `m/49'/1'/0'/0`

//Criando o mnemonic para a seed(palavras da senha)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//Criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network)

//Criando uma conta - par pvt-pub keys
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
  }).address


  console.log("Carteira Gerada")
  console.log("Endereço: ",btcAddress)
  console.log("Chave privada:",node.toWIF())
  console.log("Seed", mnemonic)
