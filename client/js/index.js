var web3 = new Web3(Web3.givenProvider);//Wallet will inject the selected network
ethereum.autoRefreshOnNetworkChange = false;

var contractInstance;
var user;
var access = false;
var marketAddress = "0xbE3Dafc1caeb9A68F77E175133C98B67e01E2534";

connectWallet();

async function getCurrentAccount() {
    user = (await web3.eth.getAccounts())[0];
    return user;
}

async function connectWallet() {

    return window.ethereum.enable().then(function (accounts) {

        user = accounts[0];
        contractInstance = new web3.eth.Contract(abi.Lottery, marketAddress, {from: user});

        console.log('connected');
        getPlayers();

    });
}

async function getPlayers() {
    var getPlayers =  await contractInstance.methods.getPlayers().call();
    console.log(getPlayers);
    return getPlayers;
}

async function totalSupply() {
    var totalSupply =  await contractInstance.methods.totalSupply().call();
    console.log(totalSupply);
    return totalSupply;
}

async function enter() {
    var inWei = web3.utils.toWei('40', 'ether');
    await contractInstance.methods.enter().send({
    //  from:user,
      value:inWei,
  //    gasLimit: 200000,
    //  gasPrice: web3.utils.toWei("0.000002", "ether"),
    }, function(error){


    });
}


async function pickWinner() {
    await contractInstance.methods.pickWinner().send({}, function(error){


    });
}
async function withdrawReward() {
    await contractInstance.methods.withdrawReward().send({}, function(error){


    });
}
