var web3 = new Web3(Web3.givenProvider);//Wallet will inject the selected network
ethereum.autoRefreshOnNetworkChange = false;

var contractInstance;
var user;
var access = false;
var gameAddress = "0xbE3Dafc1caeb9A68F77E175133C98B67e01E2534";
var coinAddress = "0xD9068704C0a8A08575584D7d4D92b31DF018938c";

connectWallet();

async function getCurrentAccount() {
    user = (await web3.eth.getAccounts())[0];
    return user;
}

async function connectWallet() {

    return window.ethereum.enable().then(function (accounts) {

        user = accounts[0];
        contractGameInstance = new web3.eth.Contract(abi.Lottery, gameAddress, {from: user});
        contractCoinInstance = new web3.eth.Contract(abi.AFCToken, coinAddress, {from: user});

        console.log('connected');
    //    getPlayers();

    });
}

async function getPlayers() {
    var getPlayers =  await contractGameInstance.methods.getPlayers().call();
    console.log(getPlayers);
    return getPlayers;
}

async function myCoins() {
    var myCoins =  await contractCoinInstance.methods.balanceOf(user).call();
    console.log(myCoins);
    return myCoins;
}

async function totalSupply() {
    var totalSupply =  await contractCoinInstance.methods.totalSupply().call();
    console.log(totalSupply);
    return totalSupply;
}

async function sendTokensToAddress() {
    var inWei = web3.utils.toWei('10', 'ether');
    await contractCoinInstance.methods.transfer('0x31f3D6FF3325aa6c7E2d256FE1bCf710b6E5e794',inWei).send({}, function(error){
        from: user
    });
}

async function enter() {
    var inWei = web3.utils.toWei('40', 'ether');
    await contractGameInstance.methods.enter().send({
    //  from:user,
      value:inWei,
  //    gasLimit: 200000,
    //  gasPrice: web3.utils.toWei("0.000002", "ether"),
    }, function(error){


    });
}


async function pickWinner() {
    await contractGameInstance.methods.pickWinner().send({}, function(error){


    });
}
async function withdrawReward() {
    await contractGameInstance.methods.withdrawReward().send({}, function(error){


    });
}
