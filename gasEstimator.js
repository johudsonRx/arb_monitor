require("dotenv").config()
const Web3 = require('web3');
const fs = require('fs') 


const web3 = new Web3(
  new Web3.providers.WebsocketProvider(process.env.INFURA_URL)
);

const init = async () => {
	let gasPrice = await web3.eth.getGasPrice();
	console.log("GAS PRICEEEE", gasPrice)
	fs.writeFile('Output.txt', gasPrice, (err) => { 
    // In case of a error throw err. 
    if (err) throw err; 
}) 
}

init()
