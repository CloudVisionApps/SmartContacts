var web3 = new Web3(Web3.givenProvider);//Wallet will inject the selected network
ethereum.autoRefreshOnNetworkChange = false;

var contractInstance;
var user;
var access = false;
var marketAddress = "0x434b9c77c9395a6496d28c8af7901710c1135f85";


connectWallet();

async function connectWallet() {
    return window.ethereum.enable().then(function (accounts) {
        user = accounts[0];
        contractInstance = new web3.eth.Contract(abi.AFCToken, marketAddress, {from: user});

        totalSupply();
        withdrawReward();
    });
}

async function totalSupply() {
    var totalSupply =  await contractInstance.methods.totalSupply().call();
    console.log(totalSupply);
    return totalSupply;
}

async function withdrawReward() {
    await contractInstance.methods.withdrawReward().send({}, function(error){


    });
}

