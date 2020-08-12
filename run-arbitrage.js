require("dotenv").config()
const Web3 = require('web3');
const { ChainId, Token, TokenAmount, Pair } = require('@uniswap/sdk');
const abis = require('./abis');
const { mainnet: addresses } = require('./addresses');
const Flashloan = require('./build/contracts/Flashloan.json');
const DSA = require('dsa-sdk');
const axios = require('axios')
const request = require('request')
const WebSocket = require('ws');
const oneSplitABI = require('./abis/onesplit.json');
const onesplitAddress = "0xC586BeF4a0992C495Cf22e1aeEE4E446CECDee0E"; // 1plit contract address on Main net
const BigNumber = require('bignumber.js');
const twilio = require('twilio')

var client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


const web3 = new Web3(
  new Web3.providers.WebsocketProvider(process.env.INFURA_URL)
);

const fromToken = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'; // ETHEREUM
const fromTokenDecimals = 18;

const toToken = '0x6b175474e89094c44da98b954eedeac495271d0f'; // DAI Token
const toTokenDecimals = 18;


const amountToExchange = 1


const onesplitContract = new web3.eth.Contract(oneSplitABI, onesplitAddress);




// const dsa = new DSA({
//   web3: web3,
//   mode: "node",
//   privateKey: process.env.PRIVATE_KEY
// });

// let spells = dsa.Spell();




const { address: admin } = web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);

const kyber = new web3.eth.Contract(
  abis.kyber.kyberNetworkProxy,
  addresses.kyber.kyberNetworkProxy
);

const AMOUNT_ETH = 100;
const RECENT_ETH_PRICE = 320;
const AMOUNT_ETH_WEI = web3.utils.toWei(AMOUNT_ETH.toString());
const AMOUNT_DAI_WEI = web3.utils.toWei((AMOUNT_ETH * RECENT_ETH_PRICE).toString());
const DIRECTION = {
  KYBER_TO_UNISWAP: 0,
  UNISWAP_TO_KYBER: 1
};

const init = async () => {

    // let txCount = await web3.eth.getTransactionCount(process.env.WALLET_ADDRESS)

    // let response = await axios.get('https://ethgasstation.info/json/ethgasAPI.json')
    // let prices = {
    //     low: response.data.safeLow / 10,
    //     medium: response.data.average / 10,
    //     high: response.data.fast / 10 
    // }
    // console.log(`Current ETH Gas Prices (in GWEI):`)
    // console.log(`Low: ${web3.utils.toWei(prices.low.toString(), 'gwei')} (transaction completes in < 30 minutes)`)
    // console.log(`Standard: ${web3.utils.toWei(prices.medium.toString(), 'gwei')} (transaction completes in < 5 minutes)`)
    // console.log(`Fast: ${web3.utils.toWei(prices.high.toString(), 'gwei')} (transaction completes in < 2 minutes)`)

// let txGasCost = dsa.estimateCastGas({
//     spells: spells,
//     value: 0
//   })
//   .then(gasLimit => {
//     console.log(gasLimit);
//   })
//   .catch(err => {
//    console.error('This transaction is likely to fail if sent to blockchain', err)
//   });

// let dsa_account = await dsa.build({gasPrice: 50000000000, from: '0x5EEE4C61d5e63486dcD3EB4Ad445403C9e1bb413'}).then((result) => {
//   console.log("RESULT", result)
// }).catch(err => {
//    console.error('This transaction is likely to fail if sent to blockchain INSIDE ACCOUNT SETUP', err)
//   })
// let accountAddress = await dsa.getAccounts('0x5EEE4C61d5e63486dcD3EB4Ad445403C9e1bb413')
// let dsaId = accountAddress[0].id;

// let instance = await dsa.setInstance(dsaId)
// console.log("INSTANCE", instance)



    // console.log("EXCHANGES", exchanges)



// request('https://api.dydx.exchange/v1/stats/markets', function (error, response, body) {
//   if(error){
//     console.log("ERRORORORORO", error)
//   }
//   let parsedBody = JSON.parse(body);
//   console.log("STATUS CODe", response.statusCode)
//   console.log("BODY", parsedBody.markets['ETH-DAI'].last)
// });



// dydx_connection.onopen = () =>{
//   dydx_connection.send(JSON.stringify(msg))
    
//   }

// dydx_connection.onmessage = e => {
//   console.log(e.data)
// }

// let dydx_response = await dydx_connection.send(JSON.stringify(msg)).then((result) =>{
//   console.log("RESULT", result)
// })

// let transactionHash = await dsa.transfer({
//     "token": "dai",
//     "amount": dsa.tokens.fromDecimal(2, "dai"), // this helper changes the amount to decimal value
//     "to" : instance.address, // default is DSA address
//     "from": process.env.WALLET_ADDRESS, // defualt is user's address
//     "gasPrice": web3.utils.toWei(prices.high.toString(), 'gwei') // estimate gas price*
//   });
// console.log("TRANSACTION HASSHHHH", transactionHash)

// console.log("ACCOUNT ADDRESSS", accountAddress[0].id)
// let flashloan = await spells.add({
//           connector: "instapool",
//           method: "flashBorrow",
//           args: [dsa.tokens.info.dai.address, dsa.tokens.fromDecimal(30000, "dai"), 0, 0]
//         })
// dsa.cast(spells).then(console.log)


  // const networkId = await web3.eth.net.getId();
  // console.log("NETWORK ID", networkId)
  // const flashloan = new web3.eth.Contract(
  //   Flashloan.abi,
  //   Flashloan.networks[networkId].address
  // );

  web3.eth.subscribe('newBlockHeaders')
    .on('data', async block => {
      console.log(`New block received. Block # ${block.number}`);

  //     let exchanges = await request('https://api.1inch.exchange/v1.1/exchanges', function (error, response, body) {
  // if(error){
  //   console.log("ERRORORORORO", error)
  // }

  // let oneInchExchanges = []
  // let parsedBody = JSON.parse(body);


  // for (let i = 0; i < parsedBody.length; i++) {
  //         oneInchExchanges.push(parsedBody[i].name.toString())
  //   }



  // // console.log("BODY CAME BACK", parsedBody)
  //  onesplitContract.methods.getExpectedReturn(fromToken, toToken, new BigNumber(amountToExchange).shiftedBy(fromTokenDecimals).toString(), 100, 0).call({ from: '0x9759A6Ac90977b93B58547b4A71c78317f391A28' }, function (error, result) {
  //   if (error) {
  //       console.log(error)
  //       return;
  //   }
  //   console.log("Trade From: " + fromToken)
  //   console.log("Trade To: " + toToken);
  //   console.log("Trade Amount: " + amountToExchange);
  //   console.log(new BigNumber(result.returnAmount).shiftedBy(-fromTokenDecimals).toString());
  //   console.log("Using Dexes:");
  //   for (let index = 0; index < result.distribution.length; index++) {
  //       console.log(oneInchExchanges[index] + ": " + result.distribution[index] + "%");
          
  //   }
// });
// });

//     onesplitContract.methods.getExpectedReturn(fromToken, toToken, new BigNumber(amountToExchange).shiftedBy(fromTokenDecimals).toString(), 100, 0).call({ from: '0x9759A6Ac90977b93B58547b4A71c78317f391A28' }, function (error, result) {
//     if (error) {
//         console.log(error)
//         return;
//     }
//     console.log("Trade From: " + fromToken)
//     console.log("Trade To: " + toToken);
//     console.log("Trade Amount: " + amountToExchange);
//     console.log(new BigNumber(result.returnAmount).shiftedBy(-fromTokenDecimals).toString());
//     console.log("Using Dexes:");
//     for (let index = 0; index < result.distribution.length; index++) {
//         console.log(oneSplitDexes[index] + ": " + result.distribution[index] + "%");
          
//     }
// });
      
      const [dai, weth] = await Promise.all(
        [addresses.tokens.dai, addresses.tokens.weth].map(tokenAddress => (
          Token.fetchData(
            ChainId.MAINNET,
            tokenAddress,
          )
      )));
      const daiWeth = await Pair.fetchData(
        dai,
        weth,
      );

      const kyberResults = await Promise.all([
          kyber
            .methods
            .getExpectedRate(
              addresses.tokens.dai, 
              '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 
              AMOUNT_DAI_WEI
            ) 
            .call(),
          kyber
            .methods
            .getExpectedRate(
              '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 
              addresses.tokens.dai, 
              AMOUNT_ETH_WEI
            ) 
            .call()
      ]);
      const kyberRates = {
        buy: parseFloat(1 / (kyberResults[0].expectedRate / (10 ** 18))),
        sell: parseFloat(kyberResults[1].expectedRate / (10 ** 18))
      };
      console.log('Kyber ETH/DAI');
      console.log(kyberRates);

      const uniswapResults = await Promise.all([
        daiWeth.getOutputAmount(new TokenAmount(dai, AMOUNT_DAI_WEI)),
        daiWeth.getOutputAmount(new TokenAmount(weth, AMOUNT_ETH_WEI))
      ]);
      const uniswapRates = {
        buy: parseFloat( AMOUNT_DAI_WEI / (uniswapResults[0][0].toExact() * 10 ** 18)),
        sell: parseFloat(uniswapResults[1][0].toExact() / AMOUNT_ETH),
      };
      console.log('Uniswap ETH/DAI');
      console.log(uniswapRates);


      if(kyberRates.buy < uniswapRates.sell) {

        client.messages.create({
        to: '7327624626',
        from: '3526429783',
        body: 'ARBITRAGE OPORTUNITY: BUY ON KYBER SELL ON UNISWAP WITH Uniswap ETH/DAI: ' + JSON.stringify(uniswapRates) + 'and KYBER ETH/DAI: ' + JSON.stringify(kyberRates)
});


        console.log("ARBITRAGE OPORTUNITY: BUY ON KYBER SELL ON UNISWAP")

        console.log('Uniswap ETH/DAI');
        console.log(uniswapRates);

        console.log('Kyber ETH/DAI');
        console.log(kyberRates);

        // spells.add({
        // connector: "instapool",
        // method: "flashBorrow",
        // args: [addresses.token.dai, 30000, 0, 0]
        // });


      }

       if(uniswapRates.buy < kyber.sell) {
        
         client.messages.create({
        to: '7327624626',
        from: '3526429783',
        body: 'ARBITRAGE OPORTUNITY: BUY ON UNISWAP SELL ON KYBER WITH Uniswap ETH/DAI:' + JSON.stringify(uniswapRates) + 'and KYBER ETH/DAI: ' + JSON.stringify(kyberRates)
});

        console.log('Uniswap ETH/DAI');
        console.log(uniswapRates);

        console.log('Kyber ETH/DAI');
        console.log(kyberRates);

       }

      // if(kyberRates.buy < uniswapRates.sell) {
      //   const tx = flashloan.methods.initiateFlashloan(
      //     addresses.dydx.solo, 
      //     addresses.tokens.dai, 
      //     AMOUNT_DAI_WEI,
      //     DIRECTION.KYBER_TO_UNISWAP
      //   );
      //   const [gasPrice, gasCost] = await Promise.all([
      //     web3.eth.getGasPrice(),
      //     tx.estimateGas({from: admin}),
      //   ]);

      //   const txCost = parseInt(gasCost) * parseInt(gasPrice);
      //   const currentEthPrice = (uniswapRates.buy + uniswapRates.sell) / 2; 
      //   const profit = (parseInt(AMOUNT_ETH_WEI) / 10 ** 18) * (uniswapRates.sell - kyberRates.buy) - (txCost / 10 ** 18) * currentEthPrice;

      //   if(profit > 0) {
      //     console.log('Arb opportunity found!');
      //     console.log(`Buy ETH on Kyber at ${kyberRates.buy} dai`);
      //     console.log(`Sell ETH on Uniswap at ${uniswapRates.sell} dai`);
      //     console.log(`Expected profit: ${profit} dai`);
      //     const data = tx.encodeABI();
      //     const txData = {
      //       from: admin,
      //       to: flashloan.options.address,
      //       data,
      //       gas: gasCost,
      //       gasPrice
      //     };
      //     const receipt = await web3.eth.sendTransaction(txData);
      //     console.log(`Transaction hash: ${receipt.transactionHash}`);
      //   }
      // }

      // if(uniswapRates.buy < kyber.sell) {
      //   const tx = flashloan.methods.initiateFlashloan(
      //     addresses.dydx.solo, 
      //     addresses.tokens.dai, 
      //     AMOUNT_DAI_WEI,
      //     DIRECTION.UNISWAP_TO_KYBER
      //   );
      //   const [gasPrice, gasCost] = await Promise.all([
      //     web3.eth.getGasPrice(),
      //     tx.estimateGas({from: admin}),
      //   ]);
      //   const txCost = parseInt(gasCost) * parseInt(gasPrice);
      //   const currentEthPrice = (uniswapRates.buy + uniswapRates.sell) / 2; 
      //   const profit = (parseInt(AMOUNT_ETH_WEI) / 10 ** 18) * (kyberRates.sell - uniswapRates.buy) - (txCost / 10 ** 18) * currentEthPrice;

      //   if(profit > 0) {
      //     console.log('Arb opportunity found!');
      //     console.log(`Buy ETH from Uniswap at ${uniswapRates.buy} dai`);
      //     console.log(`Sell ETH from Kyber at ${kyberRates.sell} dai`);
      //     console.log(`Expected profit: ${profit} dai`);
      //     const data = tx.encodeABI();
      //     const txData = {
      //       from: admin,
      //       to: flashloan.options.address,
      //       data,
      //       gas: gasCost,
      //       gasPrice
      //     };
      //     const receipt = await web3.eth.sendTransaction(txData);
      //     console.log(`Transaction hash: ${receipt.transactionHash}`);
      //   }
      // }
    })
    .on('error', error => {
      console.log("ERROR", error);
    });
}
init();