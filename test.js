"use strict";
const Web3Modal = window.Web3Modal.default,
    WalletConnectProvider = window.WalletConnectProvider.default,
    Fortmatic = window.Fortmatic,
    evmChains = window.evmChains;
let skippedFight = !1,
    rarity = ["basic", "gold", "blue", "purple", "legendary"],
    names = ["black_phenom", "miss_marvelous", "captain_matic", "snake_eyes", "mysterio", "wings_of_chaos", "trickster", "silver_rage", "blue_steel", "mischievio", "mr_operative", "bugboy", "starboy", "tempestas", "thorgon", "warhammer", "super_soldier", "blood_beast"];
const result_bg_images = ["images/result_bgs/1.png", "images/result_bgs/2.png", "images/result_bgs/3.png", "images/result_bgs/4.png", "images/result_bgs/5.png", "images/result_bgs/6.png", "images/result_bgs/7.png", "images/result_bgs/8.png", "images/result_bgs/9.png"],
    game_bgs = ["images/game/bgs/1.jpg", "images/game/bgs/2.jpg", "images/game/bgs/3.jpg", "images/game/bgs/4.jpg"];
let web3Modal, provider, account_balance, json, aprvd, selectedAccount, chainName, class_mapping = {
    black_phenom: "mystic",
    miss_marvelous: "cosmic",
    captain_matic: "science",
    snake_eyes: "mutant",
    mysterio: "mystic",
    wings_of_chaos: "tech",
    trickster: "skill",
    silver_rage: "science",
    blue_steel: "tech",
    mischievio: "mystic",
    mr_operative: "skill",
    bugboy: "science",
    starboy: "cosmic",
    tempestas: "mutant",
    thorgon: "cosmic",
    warhammer: "tech",
    super_soldier: "skill",
    blood_beast: "mutant"
};
const contract_address = "0xAf7BfA6240745Fd41D1ED4b5fADE9DCAF369bA6c",
    matic_contract_address = "0xfeb090fcd433de479396e82db8b83a470dbad3c9",
    marketplace_address = "0x47d1f30DDb727360ae623ECFDcfa4Dd167B7f2D4",
    matic_marketplace_address = "0xA4D780f0c4CeB3787291894821516D55337a9768",
    game_address = "0x43a068Eb1F833e7E14F2feD7Fd7f753dbFd98869",
    matic_game_address = "0xc16B75aA166D94Cc6A437e433d1C519Bc1d89Cc0";
var hero_idle = new Image,
    hero_attack = new Image,
    hero_sad = new Image,
    hero_hit = new Image,
    hero_win = new Image,
    villain_idle = new Image,
    villain_attack = new Image,
    villain_sad = new Image,
    villain_hit = new Image,
    villain_win = new Image,
    game_bg = new Image,
    can_fight = !1;
const serverURL = "https://mverseserver.herokuapp.com",
    ABI = [{
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor"
    }, {
        anonymous: !1,
        inputs: [{
            indexed: !0,
            internalType: "address",
            name: "owner",
            type: "address"
        }, {
            indexed: !0,
            internalType: "address",
            name: "spender",
            type: "address"
        }, {
            indexed: !1,
            internalType: "uint256",
            name: "value",
            type: "uint256"
        }],
        name: "Approval",
        type: "event"
    }, {
        anonymous: !1,
        inputs: [{
            indexed: !0,
            internalType: "address",
            name: "account",
            type: "address"
        }, {
            indexed: !1,
            internalType: "bool",
            name: "isExcluded",
            type: "bool"
        }],
        name: "ExcludeFromFees",
        type: "event"
    }, {
        anonymous: !1,
        inputs: [{
            indexed: !1,
            internalType: "address[]",
            name: "accounts",
            type: "address[]"
        }, {
            indexed: !1,
            internalType: "bool",
            name: "isExcluded",
            type: "bool"
        }],
        name: "ExcludeMultipleAccountsFromFees",
        type: "event"
    }, {
        anonymous: !1,
        inputs: [{
            indexed: !0,
            internalType: "uint256",
            name: "newValue",
            type: "uint256"
        }, {
            indexed: !0,
            internalType: "uint256",
            name: "oldValue",
            type: "uint256"
        }],
        name: "GasForProcessingUpdated",
        type: "event"
    }, {
        anonymous: !1,
        inputs: [{
            indexed: !0,
            internalType: "address",
            name: "newLiquidityWallet",
            type: "address"
        }, {
            indexed: !0,
            internalType: "address",
            name: "oldLiquidityWallet",
            type: "address"
        }],
        name: "LiquidityWalletUpdated",
        type: "event"
    }, {
        anonymous: !1,
        inputs: [{
            indexed: !0,
            internalType: "address",
            name: "previousOwner",
            type: "address"
        }, {
            indexed: !0,
            internalType: "address",
            name: "newOwner",
            type: "address"
        }],
        name: "OwnershipTransferred",
        type: "event"
    }, {
        anonymous: !1,
        inputs: [{
            indexed: !1,
            internalType: "uint256",
            name: "iterations",
            type: "uint256"
        }, {
            indexed: !1,
            internalType: "uint256",
            name: "claims",
            type: "uint256"
        }, {
            indexed: !1,
            internalType: "uint256",
            name: "lastProcessedIndex",
            type: "uint256"
        }, {
            indexed: !0,
            internalType: "bool",
            name: "automatic",
            type: "bool"
        }, {
            indexed: !1,
            internalType: "uint256",
            name: "gas",
            type: "uint256"
        }, {
            indexed: !0,
            internalType: "address",
            name: "processor",
            type: "address"
        }],
        name: "ProcessedDividendTracker",
        type: "event"
    }, {
        anonymous: !1,
        inputs: [{
            indexed: !1,
            internalType: "uint256",
            name: "tokensSwapped",
            type: "uint256"
        }, {
            indexed: !1,
            internalType: "uint256",
            name: "amount",
            type: "uint256"
        }],
        name: "SendDividends",
        type: "event"
    }, {
        anonymous: !1,
        inputs: [{
            indexed: !0,
            internalType: "address",
            name: "pair",
            type: "address"
        }, {
            indexed: !0,
            internalType: "bool",
            name: "value",
            type: "bool"
        }],
        name: "SetAutomatedMarketMakerPair",
        type: "event"
    }, {
        anonymous: !1,
        inputs: [{
            indexed: !1,
            internalType: "uint256",
            name: "tokensSwapped",
            type: "uint256"
        }, {
            indexed: !1,
            internalType: "uint256",
            name: "ethReceived",
            type: "uint256"
        }, {
            indexed: !1,
            internalType: "uint256",
            name: "tokensIntoLiqudity",
            type: "uint256"
        }],
        name: "SwapAndLiquify",
        type: "event"
    }, {
        anonymous: !1,
        inputs: [{
            indexed: !0,
            internalType: "address",
            name: "from",
            type: "address"
        }, {
            indexed: !0,
            internalType: "address",
            name: "to",
            type: "address"
        }, {
            indexed: !1,
            internalType: "uint256",
            name: "value",
            type: "uint256"
        }],
        name: "Transfer",
        type: "event"
    }, {
        anonymous: !1,
        inputs: [{
            indexed: !0,
            internalType: "address",
            name: "newAddress",
            type: "address"
        }, {
            indexed: !0,
            internalType: "address",
            name: "oldAddress",
            type: "address"
        }],
        name: "UpdateDividendTracker",
        type: "event"
    }, {
        anonymous: !1,
        inputs: [{
            indexed: !0,
            internalType: "address",
            name: "newAddress",
            type: "address"
        }, {
            indexed: !0,
            internalType: "address",
            name: "oldAddress",
            type: "address"
        }],
        name: "UpdateUniswapV2Router",
        type: "event"
    }, {
        inputs: [],
        name: "Buy_MATICRewardsFee",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [],
        name: "Buy_liquidityFee",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [],
        name: "Buy_marketingFee",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [],
        name: "Buy_totalFees",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [],
        name: "MATIC",
        outputs: [{
            internalType: "address",
            name: "",
            type: "address"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [],
        name: "Sell_MATICRewardsFee",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [],
        name: "Sell_liquidityFee",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [],
        name: "Sell_marketingFee",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [],
        name: "Sell_totalFees",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [],
        name: "TurnOff_PauseTax",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [],
        name: "TurnOn_PauseTax",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "uint256",
            name: "value",
            type: "uint256"
        }],
        name: "UpdatePriceImpact",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [],
        name: "WBNB",
        outputs: [{
            internalType: "address",
            name: "",
            type: "address"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [],
        name: "_devWalletAddress",
        outputs: [{
            internalType: "address",
            name: "",
            type: "address"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [],
        name: "_marketingWalletAddress",
        outputs: [{
            internalType: "address",
            name: "",
            type: "address"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [],
        name: "_priceImpact",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [{
            internalType: "address",
            name: "owner",
            type: "address"
        }, {
            internalType: "address",
            name: "spender",
            type: "address"
        }],
        name: "allowance",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [],
        name: "apeswapRouter",
        outputs: [{
            internalType: "contract IUniswapV2Router02",
            name: "",
            type: "address"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [{
            internalType: "address",
            name: "spender",
            type: "address"
        }, {
            internalType: "uint256",
            name: "amount",
            type: "uint256"
        }],
        name: "approve",
        outputs: [{
            internalType: "bool",
            name: "",
            type: "bool"
        }],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "address",
            name: "",
            type: "address"
        }],
        name: "automatedMarketMakerPairs",
        outputs: [{
            internalType: "bool",
            name: "",
            type: "bool"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [{
            internalType: "address",
            name: "account",
            type: "address"
        }],
        name: "balanceOf",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [],
        name: "claim",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [],
        name: "closeTrading",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [],
        name: "deadWallet",
        outputs: [{
            internalType: "address",
            name: "",
            type: "address"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [],
        name: "decimals",
        outputs: [{
            internalType: "uint8",
            name: "",
            type: "uint8"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [{
            internalType: "address",
            name: "spender",
            type: "address"
        }, {
            internalType: "uint256",
            name: "subtractedValue",
            type: "uint256"
        }],
        name: "decreaseAllowance",
        outputs: [{
            internalType: "bool",
            name: "",
            type: "bool"
        }],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "address",
            name: "account",
            type: "address"
        }],
        name: "dividendTokenBalanceOf",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [],
        name: "dividendTracker",
        outputs: [{
            internalType: "contract MATICVERSEDividendTracker",
            name: "",
            type: "address"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [{
            internalType: "address",
            name: "account",
            type: "address"
        }],
        name: "excludeFromDividends",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "address",
            name: "account",
            type: "address"
        }, {
            internalType: "bool",
            name: "excluded",
            type: "bool"
        }],
        name: "excludeFromFees",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "address[]",
            name: "accounts",
            type: "address[]"
        }, {
            internalType: "bool",
            name: "excluded",
            type: "bool"
        }],
        name: "excludeMultipleAccountsFromFees",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [],
        name: "gasForProcessing",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [{
            internalType: "address",
            name: "account",
            type: "address"
        }],
        name: "getAccountDividendsInfo",
        outputs: [{
            internalType: "address",
            name: "",
            type: "address"
        }, {
            internalType: "int256",
            name: "",
            type: "int256"
        }, {
            internalType: "int256",
            name: "",
            type: "int256"
        }, {
            internalType: "uint256",
            name: "",
            type: "uint256"
        }, {
            internalType: "uint256",
            name: "",
            type: "uint256"
        }, {
            internalType: "uint256",
            name: "",
            type: "uint256"
        }, {
            internalType: "uint256",
            name: "",
            type: "uint256"
        }, {
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [{
            internalType: "uint256",
            name: "index",
            type: "uint256"
        }],
        name: "getAccountDividendsInfoAtIndex",
        outputs: [{
            internalType: "address",
            name: "",
            type: "address"
        }, {
            internalType: "int256",
            name: "",
            type: "int256"
        }, {
            internalType: "int256",
            name: "",
            type: "int256"
        }, {
            internalType: "uint256",
            name: "",
            type: "uint256"
        }, {
            internalType: "uint256",
            name: "",
            type: "uint256"
        }, {
            internalType: "uint256",
            name: "",
            type: "uint256"
        }, {
            internalType: "uint256",
            name: "",
            type: "uint256"
        }, {
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [],
        name: "getClaimWait",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [],
        name: "getLastProcessedIndex",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [],
        name: "getNumberOfDividendTokenHolders",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [],
        name: "getTotalDividendsDistributed",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [{
            internalType: "address",
            name: "spender",
            type: "address"
        }, {
            internalType: "uint256",
            name: "addedValue",
            type: "uint256"
        }],
        name: "increaseAllowance",
        outputs: [{
            internalType: "bool",
            name: "",
            type: "bool"
        }],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "address",
            name: "account",
            type: "address"
        }],
        name: "isExcludedFromFees",
        outputs: [{
            internalType: "bool",
            name: "",
            type: "bool"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [],
        name: "name",
        outputs: [{
            internalType: "string",
            name: "",
            type: "string"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [],
        name: "openTrading",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [],
        name: "owner",
        outputs: [{
            internalType: "address",
            name: "",
            type: "address"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [{
            internalType: "uint256",
            name: "gas",
            type: "uint256"
        }],
        name: "processDividendTracker",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "address",
            name: "pair",
            type: "address"
        }, {
            internalType: "bool",
            name: "value",
            type: "bool"
        }],
        name: "setAutomatedMarketMakerPair",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "uint256",
            name: "value",
            type: "uint256"
        }],
        name: "setBuy_LiquiditFee",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "uint256",
            name: "value",
            type: "uint256"
        }],
        name: "setBuy_MATICRewardsFee",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "uint256",
            name: "value",
            type: "uint256"
        }],
        name: "setBuy_MarketingFee",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "address payable",
            name: "wallet",
            type: "address"
        }],
        name: "setDevWallet",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "address payable",
            name: "wallet",
            type: "address"
        }],
        name: "setMarketingWallet",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "uint256",
            name: "value",
            type: "uint256"
        }],
        name: "setSell_LiquiditFee",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "uint256",
            name: "value",
            type: "uint256"
        }],
        name: "setSell_MATICRewardsFee",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "uint256",
            name: "value",
            type: "uint256"
        }],
        name: "setSell_MarketingFee",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [],
        name: "swapTokensAtAmount",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [],
        name: "symbol",
        outputs: [{
            internalType: "string",
            name: "",
            type: "string"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [],
        name: "totalSupply",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [{
            internalType: "address",
            name: "recipient",
            type: "address"
        }, {
            internalType: "uint256",
            name: "amount",
            type: "uint256"
        }],
        name: "transfer",
        outputs: [{
            internalType: "bool",
            name: "",
            type: "bool"
        }],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "address",
            name: "sender",
            type: "address"
        }, {
            internalType: "address",
            name: "recipient",
            type: "address"
        }, {
            internalType: "uint256",
            name: "amount",
            type: "uint256"
        }],
        name: "transferFrom",
        outputs: [{
            internalType: "bool",
            name: "",
            type: "bool"
        }],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "address",
            name: "newOwner",
            type: "address"
        }],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [],
        name: "uniswapV2Pair",
        outputs: [{
            internalType: "address",
            name: "",
            type: "address"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [],
        name: "uniswapV2Router",
        outputs: [{
            internalType: "contract IUniswapV2Router02",
            name: "",
            type: "address"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [{
            internalType: "uint256",
            name: "claimWait",
            type: "uint256"
        }],
        name: "updateClaimWait",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "address",
            name: "newAddress",
            type: "address"
        }],
        name: "updateDividendTracker",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "uint256",
            name: "newValue",
            type: "uint256"
        }],
        name: "updateGasForProcessing",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "address",
            name: "newAddress",
            type: "address"
        }],
        name: "updateUniswapV2Router",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "address",
            name: "account",
            type: "address"
        }],
        name: "withdrawableDividendOf",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        stateMutability: "payable",
        type: "receive"
    }],
    marketplace_abi = [{
        inputs: [{
            internalType: "address",
            name: "_link",
            type: "address"
        }, {
            internalType: "address",
            name: "_oracle",
            type: "address"
        }, {
            internalType: "string",
            name: "_jobId",
            type: "string"
        }, {
            internalType: "string",
            name: "_symbol",
            type: "string"
        }, {
            internalType: "string",
            name: "_name",
            type: "string"
        }, {
            internalType: "bool",
            name: "_chargeTokens",
            type: "bool"
        }],
        stateMutability: "nonpayable",
        type: "constructor"
    }, {
        anonymous: !1,
        inputs: [{
            indexed: !0,
            internalType: "address",
            name: "owner",
            type: "address"
        }, {
            indexed: !0,
            internalType: "address",
            name: "approved",
            type: "address"
        }, {
            indexed: !0,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256"
        }],
        name: "Approval",
        type: "event"
    }, {
        anonymous: !1,
        inputs: [{
            indexed: !0,
            internalType: "address",
            name: "owner",
            type: "address"
        }, {
            indexed: !0,
            internalType: "address",
            name: "operator",
            type: "address"
        }, {
            indexed: !1,
            internalType: "bool",
            name: "approved",
            type: "bool"
        }],
        name: "ApprovalForAll",
        type: "event"
    }, {
        anonymous: !1,
        inputs: [{
            indexed: !0,
            internalType: "bytes32",
            name: "id",
            type: "bytes32"
        }],
        name: "ChainlinkCancelled",
        type: "event"
    }, {
        anonymous: !1,
        inputs: [{
            indexed: !0,
            internalType: "bytes32",
            name: "id",
            type: "bytes32"
        }],
        name: "ChainlinkFulfilled",
        type: "event"
    }, {
        anonymous: !1,
        inputs: [{
            indexed: !0,
            internalType: "bytes32",
            name: "id",
            type: "bytes32"
        }],
        name: "ChainlinkRequested",
        type: "event"
    }, {
        anonymous: !1,
        inputs: [{
            indexed: !0,
            internalType: "uint256",
            name: "id",
            type: "uint256"
        }, {
            indexed: !1,
            internalType: "address",
            name: "fromAddress",
            type: "address"
        }, {
            indexed: !1,
            internalType: "address",
            name: "toAddress",
            type: "address"
        }],
        name: "GiftEvent",
        type: "event"
    }, {
        anonymous: !1,
        inputs: [{
            indexed: !0,
            internalType: "address",
            name: "previousOwner",
            type: "address"
        }, {
            indexed: !0,
            internalType: "address",
            name: "newOwner",
            type: "address"
        }],
        name: "OwnershipTransferred",
        type: "event"
    }, {
        anonymous: !1,
        inputs: [{
            indexed: !0,
            internalType: "bytes32",
            name: "requestId",
            type: "bytes32"
        }, {
            indexed: !0,
            internalType: "uint256",
            name: "random",
            type: "uint256"
        }],
        name: "RequestRandomResultFulfilled",
        type: "event"
    }, {
        anonymous: !1,
        inputs: [{
            indexed: !0,
            internalType: "address",
            name: "from",
            type: "address"
        }, {
            indexed: !0,
            internalType: "address",
            name: "to",
            type: "address"
        }, {
            indexed: !0,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256"
        }],
        name: "Transfer",
        type: "event"
    }, {
        anonymous: !1,
        inputs: [{
            indexed: !0,
            internalType: "uint256",
            name: "id",
            type: "uint256"
        }, {
            indexed: !1,
            internalType: "address",
            name: "fromAddress",
            type: "address"
        }, {
            indexed: !1,
            internalType: "address",
            name: "toAddress",
            type: "address"
        }],
        name: "buyFromSaleEvent",
        type: "event"
    }, {
        anonymous: !1,
        inputs: [{
            indexed: !0,
            internalType: "uint256",
            name: "id",
            type: "uint256"
        }, {
            indexed: !1,
            internalType: "address",
            name: "fromAddress",
            type: "address"
        }],
        name: "cancelSaleEvent",
        type: "event"
    }, {
        anonymous: !1,
        inputs: [{
            indexed: !0,
            internalType: "uint256",
            name: "id",
            type: "uint256"
        }, {
            indexed: !1,
            internalType: "uint256",
            name: "name",
            type: "uint256"
        }, {
            indexed: !1,
            internalType: "uint256",
            name: "rarity",
            type: "uint256"
        }, {
            indexed: !1,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256"
        }, {
            indexed: !1,
            internalType: "uint256",
            name: "XpPoints",
            type: "uint256"
        }, {
            indexed: !1,
            internalType: "bool",
            name: "isOnSale",
            type: "bool"
        }, {
            indexed: !1,
            internalType: "uint256",
            name: "sellPrice",
            type: "uint256"
        }, {
            indexed: !1,
            internalType: "address",
            name: "owner",
            type: "address"
        }],
        name: "nftMintedEvent",
        type: "event"
    }, {
        anonymous: !1,
        inputs: [{
            indexed: !0,
            internalType: "uint256",
            name: "id",
            type: "uint256"
        }, {
            indexed: !1,
            internalType: "uint256",
            name: "price",
            type: "uint256"
        }, {
            indexed: !1,
            internalType: "address",
            name: "fromAddress",
            type: "address"
        }],
        name: "putOnSaleEvent",
        type: "event"
    }, {
        inputs: [{
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256"
        }, {
            internalType: "address",
            name: "giftTo",
            type: "address"
        }],
        name: "Gift",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "address",
            name: "to",
            type: "address"
        }, {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256"
        }],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "address",
            name: "owner",
            type: "address"
        }],
        name: "balanceOf",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [{
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256"
        }],
        name: "buyFromSale",
        outputs: [],
        stateMutability: "payable",
        type: "function"
    }, {
        inputs: [{
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256"
        }],
        name: "cancelSale",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "uint256",
            name: "_value",
            type: "uint256"
        }],
        name: "change_mint1packPrice",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "uint256",
            name: "_value",
            type: "uint256"
        }],
        name: "change_mint3packPrice",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "uint256",
            name: "_value",
            type: "uint256"
        }],
        name: "change_mint5packPrice",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [],
        name: "claim",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [],
        name: "currentNumber",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [{
            internalType: "address",
            name: "game_ca",
            type: "address"
        }],
        name: "editGameContract",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "uint256",
            name: "tokenId",
            type: "uint256"
        }, {
            internalType: "uint256",
            name: "XpPoints",
            type: "uint256"
        }],
        name: "editNftXp",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "uint256",
            name: "tokenamount",
            type: "uint256"
        }, {
            internalType: "address",
            name: "user_address",
            type: "address"
        }],
        name: "editUserdata",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "address",
            name: "player",
            type: "address"
        }, {
            internalType: "uint256",
            name: "tokenamount",
            type: "uint256"
        }, {
            internalType: "uint256",
            name: "tokenid",
            type: "uint256"
        }, {
            internalType: "uint256",
            name: "xp_points",
            type: "uint256"
        }, {
            internalType: "uint256",
            name: "cooldown",
            type: "uint256"
        }],
        name: "editUserdata_afterFight",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "address",
            name: "_owner",
            type: "address"
        }],
        name: "fetchInventory",
        outputs: [{
            internalType: "uint256[]",
            name: "",
            type: "uint256[]"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [],
        name: "fetchMarketplace",
        outputs: [{
            internalType: "uint256[]",
            name: "",
            type: "uint256[]"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [{
            internalType: "bytes32",
            name: "_requestId",
            type: "bytes32"
        }, {
            internalType: "uint256",
            name: "_random",
            type: "uint256"
        }],
        name: "fulfillRandomNumber",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [],
        name: "game_contract",
        outputs: [{
            internalType: "address",
            name: "",
            type: "address"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [{
            internalType: "uint256",
            name: "tokenId",
            type: "uint256"
        }],
        name: "getApproved",
        outputs: [{
            internalType: "address",
            name: "",
            type: "address"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [{
            internalType: "address",
            name: "owner",
            type: "address"
        }, {
            internalType: "address",
            name: "operator",
            type: "address"
        }],
        name: "isApprovedForAll",
        outputs: [{
            internalType: "bool",
            name: "",
            type: "bool"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [],
        name: "mint1",
        outputs: [],
        stateMutability: "payable",
        type: "function"
    }, {
        inputs: [],
        name: "mint3",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [],
        name: "mint5",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "uint256",
            name: "_name",
            type: "uint256"
        }, {
            internalType: "uint256",
            name: "_rarity",
            type: "uint256"
        }, {
            internalType: "address",
            name: "_to",
            type: "address"
        }, {
            internalType: "uint256",
            name: "XpPoints_",
            type: "uint256"
        }],
        name: "mintWithDetails",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "uint256",
            name: "_name",
            type: "uint256"
        }, {
            internalType: "uint256",
            name: "_rarity",
            type: "uint256"
        }, {
            internalType: "address",
            name: "_to",
            type: "address"
        }, {
            internalType: "uint256",
            name: "XpPoints_",
            type: "uint256"
        }, {
            internalType: "uint256",
            name: "balance",
            type: "uint256"
        }],
        name: "mintWithDetails_forAirdrop",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [],
        name: "mintingPaused",
        outputs: [{
            internalType: "bool",
            name: "",
            type: "bool"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [],
        name: "name",
        outputs: [{
            internalType: "string",
            name: "",
            type: "string"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        name: "nfts",
        outputs: [{
            internalType: "uint256",
            name: "name",
            type: "uint256"
        }, {
            internalType: "uint256",
            name: "rarity",
            type: "uint256"
        }, {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256"
        }, {
            internalType: "uint256",
            name: "XpPoints",
            type: "uint256"
        }, {
            internalType: "bool",
            name: "isOnSale",
            type: "bool"
        }, {
            internalType: "uint256",
            name: "sellPrice",
            type: "uint256"
        }, {
            internalType: "address",
            name: "owner",
            type: "address"
        }, {
            internalType: "uint256",
            name: "CooldownBlock",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [],
        name: "nonWithdrawnTokenAmount",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [],
        name: "owner",
        outputs: [{
            internalType: "address",
            name: "",
            type: "address"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [{
            internalType: "uint256",
            name: "tokenId",
            type: "uint256"
        }],
        name: "ownerOf",
        outputs: [{
            internalType: "address",
            name: "",
            type: "address"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [{
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256"
        }, {
            internalType: "uint256",
            name: "_sellPrice",
            type: "uint256"
        }],
        name: "putOnSale",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [],
        name: "randomResult",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [],
        name: "requestRandomNumber",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [],
        name: "returnPrices",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }, {
            internalType: "uint256",
            name: "",
            type: "uint256"
        }, {
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [],
        name: "returnSupply",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [{
            internalType: "address",
            name: "from",
            type: "address"
        }, {
            internalType: "address",
            name: "to",
            type: "address"
        }, {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256"
        }],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "address",
            name: "from",
            type: "address"
        }, {
            internalType: "address",
            name: "to",
            type: "address"
        }, {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256"
        }, {
            internalType: "bytes",
            name: "_data",
            type: "bytes"
        }],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "address",
            name: "operator",
            type: "address"
        }, {
            internalType: "bool",
            name: "approved",
            type: "bool"
        }],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "bytes4",
            name: "interfaceId",
            type: "bytes4"
        }],
        name: "supportsInterface",
        outputs: [{
            internalType: "bool",
            name: "",
            type: "bool"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [],
        name: "symbol",
        outputs: [{
            internalType: "string",
            name: "",
            type: "string"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [{
            internalType: "uint256",
            name: "tokenId",
            type: "uint256"
        }],
        name: "tokenURI",
        outputs: [{
            internalType: "string",
            name: "",
            type: "string"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [{
            internalType: "address",
            name: "from",
            type: "address"
        }, {
            internalType: "address",
            name: "to",
            type: "address"
        }, {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256"
        }],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "address",
            name: "newOwner",
            type: "address"
        }],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [],
        name: "turnOffMinting",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [],
        name: "turnOnMinting",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "address",
            name: "",
            type: "address"
        }],
        name: "userBalance",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [],
        name: "withdrawLink",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [],
        name: "withdraw_pool",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [],
        name: "withdraw_pool_matic",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }],
    game_abi = [{
        anonymous: !1,
        inputs: [{
            indexed: !0,
            internalType: "bytes32",
            name: "id",
            type: "bytes32"
        }],
        name: "ChainlinkCancelled",
        type: "event"
    }, {
        anonymous: !1,
        inputs: [{
            indexed: !0,
            internalType: "bytes32",
            name: "id",
            type: "bytes32"
        }],
        name: "ChainlinkFulfilled",
        type: "event"
    }, {
        anonymous: !1,
        inputs: [{
            indexed: !0,
            internalType: "bytes32",
            name: "id",
            type: "bytes32"
        }],
        name: "ChainlinkRequested",
        type: "event"
    }, {
        anonymous: !1,
        inputs: [{
            indexed: !0,
            internalType: "uint256",
            name: "id",
            type: "uint256"
        }, {
            indexed: !1,
            internalType: "uint256",
            name: "newXp",
            type: "uint256"
        }, {
            indexed: !1,
            internalType: "uint256",
            name: "CooldownBlock",
            type: "uint256"
        }],
        name: "FightEvent",
        type: "event"
    }, {
        anonymous: !1,
        inputs: [{
            indexed: !0,
            internalType: "address",
            name: "previousOwner",
            type: "address"
        }, {
            indexed: !0,
            internalType: "address",
            name: "newOwner",
            type: "address"
        }],
        name: "OwnershipTransferred",
        type: "event"
    }, {
        anonymous: !1,
        inputs: [{
            indexed: !0,
            internalType: "bytes32",
            name: "requestId",
            type: "bytes32"
        }, {
            indexed: !0,
            internalType: "uint256",
            name: "price",
            type: "uint256"
        }],
        name: "RequestMversePriceFulfilled",
        type: "event"
    }, {
        anonymous: !1,
        inputs: [{
            indexed: !0,
            internalType: "bytes32",
            name: "requestId",
            type: "bytes32"
        }, {
            indexed: !0,
            internalType: "uint256",
            name: "random",
            type: "uint256"
        }],
        name: "RequestRandomResultFulfilled",
        type: "event"
    }, {
        inputs: [{
            internalType: "uint256",
            name: "_value",
            type: "uint256"
        }],
        name: "changeClaimTax",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "uint256",
            name: "_basic",
            type: "uint256"
        }, {
            internalType: "uint256",
            name: "_gold",
            type: "uint256"
        }, {
            internalType: "uint256",
            name: "_blue",
            type: "uint256"
        }, {
            internalType: "uint256",
            name: "_purple",
            type: "uint256"
        }, {
            internalType: "uint256",
            name: "_legendary",
            type: "uint256"
        }],
        name: "changeCooldowns",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "address",
            name: "new_marketplace",
            type: "address"
        }],
        name: "changeMarketplace",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "uint256",
            name: "_strong",
            type: "uint256"
        }, {
            internalType: "uint256",
            name: "_normal",
            type: "uint256"
        }, {
            internalType: "uint256",
            name: "_weak",
            type: "uint256"
        }],
        name: "changeMultipliers",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "uint256",
            name: "_value",
            type: "uint256"
        }],
        name: "changeMversePriceDollar",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "uint256",
            name: "_basic",
            type: "uint256"
        }, {
            internalType: "uint256",
            name: "_gold",
            type: "uint256"
        }, {
            internalType: "uint256",
            name: "_blue",
            type: "uint256"
        }, {
            internalType: "uint256",
            name: "_purple",
            type: "uint256"
        }, {
            internalType: "uint256",
            name: "_legendary",
            type: "uint256"
        }],
        name: "changeWinPrizes",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "uint256",
            name: "_strong",
            type: "uint256"
        }, {
            internalType: "uint256",
            name: "_normal",
            type: "uint256"
        }, {
            internalType: "uint256",
            name: "_weak",
            type: "uint256"
        }],
        name: "changeWinProbs",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [],
        name: "claim",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "uint256",
            name: "tokenamount",
            type: "uint256"
        }, {
            internalType: "address",
            name: "user_address",
            type: "address"
        }],
        name: "edit_userdata",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "uint256",
            name: "boss_number",
            type: "uint256"
        }, {
            internalType: "uint256",
            name: "_tokenid",
            type: "uint256"
        }],
        name: "fight",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "bytes32",
            name: "_requestId",
            type: "bytes32"
        }, {
            internalType: "uint256",
            name: "_price",
            type: "uint256"
        }],
        name: "fulfillMversePrice",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "bytes32",
            name: "_requestId",
            type: "bytes32"
        }, {
            internalType: "uint256",
            name: "_random",
            type: "uint256"
        }],
        name: "fulfillRandomNumber",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "uint256",
            name: "_tokenid",
            type: "uint256"
        }],
        name: "importNFTtoGame",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [],
        name: "requestMversePrice",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [],
        name: "requestRandomNumber",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "address",
            name: "newOwner",
            type: "address"
        }],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [],
        name: "turnOff_Fighting",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [],
        name: "turnOn_Fighting",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "address",
            name: "user",
            type: "address"
        }, {
            internalType: "uint256",
            name: "_totalFights",
            type: "uint256"
        }, {
            internalType: "uint256",
            name: "_fightsWon",
            type: "uint256"
        }, {
            internalType: "uint256",
            name: "_totalRewards",
            type: "uint256"
        }],
        name: "updateFightStats",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [],
        name: "withdrawLink",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }, {
        inputs: [{
            internalType: "address",
            name: "_link",
            type: "address"
        }, {
            internalType: "address",
            name: "_oracle",
            type: "address"
        }, {
            internalType: "string",
            name: "_jobId",
            type: "string"
        }],
        stateMutability: "nonpayable",
        type: "constructor"
    }, {
        inputs: [],
        name: "claimTax",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        name: "cooldowns",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [],
        name: "currentFight",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [],
        name: "defaultXpBoost",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [{
            internalType: "address",
            name: "",
            type: "address"
        }],
        name: "fightStats",
        outputs: [{
            internalType: "uint256",
            name: "totalFights",
            type: "uint256"
        }, {
            internalType: "uint256",
            name: "fightsWon",
            type: "uint256"
        }, {
            internalType: "uint256",
            name: "totalRewards",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [],
        name: "marketplace_address",
        outputs: [{
            internalType: "address",
            name: "",
            type: "address"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        name: "Multipliers",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [],
        name: "mversePrice",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [{
            internalType: "uint256",
            name: "_tokenid",
            type: "uint256"
        }],
        name: "nftDetails",
        outputs: [{
            components: [{
                internalType: "uint256",
                name: "name",
                type: "uint256"
            }, {
                internalType: "uint256",
                name: "rarity",
                type: "uint256"
            }, {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256"
            }, {
                internalType: "uint256",
                name: "XpPoints",
                type: "uint256"
            }, {
                internalType: "bool",
                name: "LastFightStatus",
                type: "bool"
            }, {
                internalType: "uint256",
                name: "CooldownBlock",
                type: "uint256"
            }, {
                internalType: "uint256",
                name: "last_rewards",
                type: "uint256"
            }, {
                internalType: "uint256",
                name: "last_xp",
                type: "uint256"
            }],
            internalType: "struct mverseGame.nftData",
            name: "",
            type: "tuple"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [],
        name: "owner",
        outputs: [{
            internalType: "address",
            name: "",
            type: "address"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [],
        name: "randomResult",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [{
            internalType: "address",
            name: "",
            type: "address"
        }],
        name: "userBalance",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        name: "winPrizes",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }, {
        inputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        name: "winProbs",
        outputs: [{
            internalType: "uint256",
            name: "",
            type: "uint256"
        }],
        stateMutability: "view",
        type: "function"
    }];
async function init() {
    (web3Modal = new Web3Modal({
        cacheProvider: !0,
        providerOptions: {
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    infuraId: "8043bb2cf99347b1bfadfb233c5325c0"
                }
            },
            fortmatic: {
                package: Fortmatic,
                options: {
                    key: "pk_test_391E26A3B43A3350"
                }
            }
        },
        disableInjectedProvider: !1
    })).cachedProvider && (provider = await web3Modal.connect(), await fetchAccountData(), await isMarketplaceApproved(), window.location.href.includes("battle") && fetchMyHeroes()), "/" === location.pathname && updateMintPrice()
}
async function fetchAccountData() {
    const e = new Web3(provider),
        t = await e.eth.getChainId(),
        n = evmChains.getChain(t);
    for (var a = document.getElementsByClassName("network-name"), i = 0; i < a.length; i++) a[i].textContent = n.name;
    const s = await e.eth.getAccounts();
    selectedAccount = s[0];
    for (a = document.getElementsByClassName("selected-account"), i = 0; i < a.length; i++) a[i].textContent = selectedAccount.substring(0, 25) + "...";
    for (a = document.getElementsByClassName("prepare"), i = 0; i < a.length; i++) a[i].style.display = "none";
    for (a = document.getElementsByClassName("connected"), i = 0; i < a.length; i++) a[i].style.display = "block"
}
async function refreshAccountData() {
    for (var e = document.getElementsByClassName("prepare"), t = 0; t < e.length; t++) e[t].style.display = "block";
    for (e = document.getElementsByClassName("connected"), t = 0; t < e.length; t++) e[t].style.display = "none";
    document.querySelector("#btn-connect").setAttribute("disabled", "disabled"), await fetchAccountData(provider), document.querySelector("#btn-connect").removeAttribute("disabled")
}

function sleep(e) {
    return new Promise(t => setTimeout(t, e))
}
async function onConnect() {
    try {
        provider = await web3Modal.connect()
    } catch (e) {
        return void console.log("Could not get a wallet connection", e)
    }
    provider.on("accountsChanged", e => {
        fetchAccountData(), isMarketplaceApproved(), window.location.href.includes("battle") && fetchMyHeroes()
    }), provider.on("chainChanged", e => {
        fetchAccountData(), isMarketplaceApproved(), window.location.href.includes("battle") && fetchMyHeroes()
    }), provider.on("networkChanged", e => {
        fetchAccountData(), isMarketplaceApproved(), window.location.href.includes("battle") && fetchMyHeroes()
    }), await isMarketplaceApproved(), await refreshAccountData(), window.location.href.includes("battle") && fetchMyHeroes()
}
async function onDisconnect() {
    provider.close && (await provider.close(), await web3Modal.clearCachedProvider(), provider = null), selectedAccount = null;
    for (var e = document.getElementsByClassName("prepare"), t = 0; t < e.length; t++) e[t].style.display = "block";
    for (e = document.getElementsByClassName("connected"), t = 0; t < e.length; t++) e[t].style.display = "none"
}
async function loadMarketplaceContract() {
    if (provider) {
        web3 = new Web3(provider);
        const n = await web3.eth.getChainId(),
            a = evmChains.getChain(n);
        for (e = document.getElementsByClassName("network-name"), t = 0; t < e.length; t++) e[t].textContent = a.name;
        return "Matic Mainnet" === (chainName = a.name) ? await new web3.eth.Contract(marketplace_abi, matic_marketplace_address) : await new web3.eth.Contract(marketplace_abi, marketplace_address)
    } {
        let n = new Web3(window.ethereum);
        const a = await n.eth.getChainId(),
            i = evmChains.getChain(a);
        for (var e = document.getElementsByClassName("network-name"), t = 0; t < e.length; t++) e[t].textContent = i.name;
        return "Matic Mainnet" === (chainName = i.name) ? await new n.eth.Contract(marketplace_abi, matic_marketplace_address) : await new n.eth.Contract(marketplace_abi, marketplace_address)
    }
}
async function loadContract() {
    if (provider) {
        web3 = new Web3(provider);
        const n = await web3.eth.getChainId(),
            a = evmChains.getChain(n);
        for (e = document.getElementsByClassName("network-name"), t = 0; t < e.length; t++) e[t].textContent = a.name;
        return "Matic Mainnet" === (chainName = a.name) ? await new web3.eth.Contract(ABI, matic_contract_address) : await new web3.eth.Contract(ABI, contract_address)
    } {
        let n = new Web3(window.ethereum);
        const a = await n.eth.getChainId(),
            i = evmChains.getChain(a);
        for (var e = document.getElementsByClassName("network-name"), t = 0; t < e.length; t++) e[t].textContent = i.name;
        return "Matic Mainnet" === (chainName = i.name) ? await new n.eth.Contract(ABI, matic_contract_address) : await new n.eth.Contract(ABI, contract_address)
    }
}
async function loadGameContract() {
    if (provider) {
        web3 = new Web3(provider);
        const n = await web3.eth.getChainId(),
            a = evmChains.getChain(n);
        for (e = document.getElementsByClassName("network-name"), t = 0; t < e.length; t++) e[t].textContent = a.name;
        return "Matic Mainnet" === (chainName = a.name) ? await new web3.eth.Contract(game_abi, matic_game_address) : await new web3.eth.Contract(game_abi, game_address)
    } {
        let n = new Web3(window.ethereum);
        const a = await n.eth.getChainId(),
            i = evmChains.getChain(a);
        for (var e = document.getElementsByClassName("network-name"), t = 0; t < e.length; t++) e[t].textContent = i.name;
        return "Matic Mainnet" === (chainName = i.name) ? await new n.eth.Contract(game_abi, matic_game_address) : await new n.eth.Contract(game_abi, game_address)
    }
}

function capitalize(e) {
    const t = e.split("_");
    for (var n = 0; n < t.length; n++) t[n] = t[n].charAt(0).toUpperCase() + t[n].slice(1);
    return t.join(" ")
}

function generateJsonMarketplace(e) {
    for (var t = {
            NFTs: []
        }, n = 0; n < e.length; n++) t.NFTs.push({
        name: capitalize(names[parseInt(e[n][0])]),
        key: names[parseInt(e[n][0])],
        class: class_mapping[names[parseInt(e[n][0])]].toLowerCase(),
        tier: rarity[parseInt(e[n][1])].toLowerCase(),
        id: e[n][2],
        xp: e[n][3],
        cooldownBlock: e[n][7],
        lastRewards: 0,
        lastXP: 0,
        lastFightStatus: !1
    });
    return t.NFTs = t.NFTs.sort(compare), t
}

function generateJsonGame(e) {
    for (var t = {
            NFTs: []
        }, n = 0; n < e.length; n++) t.NFTs.push({
        name: capitalize(names[parseInt(e[n][0])]),
        key: names[parseInt(e[n][0])],
        class: class_mapping[names[parseInt(e[n][0])]].toLowerCase(),
        tier: rarity[parseInt(e[n][1])].toLowerCase(),
        id: e[n][2],
        xp: e[n][3],
        cooldownBlock: e[n][5],
        lastRewards: e[n][6],
        lastXP: e[n][7],
        lastFightStatus: e[n][4]
    });
    return t.NFTs = t.NFTs.sort(compare), t
}

function compare(e, t) {
    return parseInt(e.cooldownBlock) < parseInt(t.cooldownBlock) ? -1 : parseInt(e.cooldownBlock) > parseInt(t.cooldownBlock) ? 1 : 0
}
async function fight_txn_init(e, t) {
    $(window).width() < 1074 || (skippedFight = !1, await load_game_arena(e, t), await sleep(1e3), chars_fight(), await sleep(12e3))
}
async function init_fight_results(e, t, n, a, i) {
    if ($(window).width() > 1074) {
        for (var s = 0; s < 18; s++)
            if (await sleep(1e3), skippedFight) {
                can_fight = !1;
                break
            }
    } else game_bg.src = game_bgs[Math.floor(Math.random() * game_bgs.length)], $("#skip-btn").hide();
    await sleep(5e3);
    const o = generateJsonGame([await i.methods.nftDetails(e).call()]);
    let p = new Image;
    o.NFTs[0].lastFightStatus ? (p.src = "images/gifs/win/" + o.NFTs[0].key + ".gif", $("#winResultBgImg").css("background-image", "url('" + game_bg.src + "')"), $("#win_text").text(o.NFTs[0].name + " Won"), $("#winImage").attr("src", p.src), $("#win_mverse").text("+" + (1e-18 * parseInt(o.NFTs[0].lastRewards)).toString().split(".")[0]), $("#win_xp").text("+" + o.NFTs[0].lastXP), $(window).width() > 1074 && (skippedFight || (can_fight = !1, await sleep(3e3), win(), await sleep(5e3)), await hide_game_arena()), $("#skip-btn").hide(), $("#winModal").modal("show")) : (p.src = "images/gifs/loss/" + t + ".gif", $("#lossResultBgImg").css("background-image", "url('" + game_bg.src + "')"), $("#lossImage").attr("src", p.src), $("#loss_text").text(o.NFTs[0].name + " Lost"), $("#loss_xp").text("+" + o.NFTs[0].lastXP), $(window).width() > 1074 && (skippedFight || (can_fight = !1, await sleep(3e3), loss(), await sleep(5e3)), await hide_game_arena()), $("#skip-btn").hide(), $("#lossModal").modal("show"))
}
async function fight(e, t, n, a) {
    if (!provider) return void new Noty({
        layout: "centerRight",
        text: "Please connect your wallet first!",
        type: "info",
        timeout: 3e3,
        animation: {
            open: "animated bounceInRight",
            close: "animated bounceOutRight"
        }
    }).show();
    showLoader();
    let i = await loadGameContract();
    const s = await getCurrentAccount();
    try {
        const u = Date.now();
        let l, d, y;
        try {
            l = await i.methods.nftDetails(t).call()
        } catch {
            l = {
                CooldownBlock: "0"
            }
        }
        if (parseInt(u.toString().slice(0, u.toString().length - 3)) < parseInt(l.CooldownBlock) && "0" !== l.CooldownBlock) {
            var o = Math.abs(parseInt(l.CooldownBlock) - parseInt(u.toString().slice(0, u.toString().length - 3))),
                p = Math.floor(o / 3600) % 24;
            o -= 3600 * p;
            var r = Math.floor(o / 60) % 60;
            return o -= 60 * r, new Noty({
                layout: "centerRight",
                text: "Cool down active! Please wait " + p + " hours, " + r + " minutes " + o % 60 + " seconds before using this NFT again.",
                type: "error",
                timeout: 3e3,
                animation: {
                    open: "animated bounceInRight",
                    close: "animated bounceOutRight"
                }
            }).show(), void hideLoader()
        }
        "mystic" === n && "cosmic" === a ? (d = "1", y = "100", await i.methods.fight("3", t.toString()).send({
            from: s
        }).once("transactionHash", function(t) {
            fight_txn_init(e, a)
        }).then(function(e) {
            $("#skip-btn").show(), init_fight_results(t, a, d, y, i)
        })) : "science" === n && "mystic" === a ? (d = "1", y = "100", await i.methods.fight("3", t.toString()).send({
            from: s
        }).once("transactionHash", function(t) {
            fight_txn_init(e, a)
        }).then(function(e) {
            $("#skip-btn").show(), init_fight_results(t, a, d, y, i)
        })) : "skill" === n && "science" === a ? (d = "1", y = "100", await i.methods.fight("3", t.toString()).send({
            from: s
        }).once("transactionHash", function(t) {
            fight_txn_init(e, a)
        }).then(function(e) {
            $("#skip-btn").show(), init_fight_results(t, a, d, y, i)
        })) : "mutant" === n && "skill" === a ? (d = "1", y = "100", await i.methods.fight("3", t.toString()).send({
            from: s
        }).once("transactionHash", function(t) {
            fight_txn_init(e, a)
        }).then(function(e) {
            $("#skip-btn").show(), init_fight_results(t, a, d, y, i)
        })) : "tech" === n && "mutant" === a ? (d = "1", y = "100", await i.methods.fight("3", t.toString()).send({
            from: s
        }).once("transactionHash", function(t) {
            fight_txn_init(e, a)
        }).then(function(e) {
            $("#skip-btn").show(), init_fight_results(t, a, d, y, i)
        })) : "cosmic" === n && "tech" === a ? (d = "1", y = "100", await i.methods.fight("3", t.toString()).send({
            from: s
        }).once("transactionHash", function(t) {
            fight_txn_init(e, a)
        }).then(function(e) {
            $("#skip-btn").show(), init_fight_results(t, a, d, y, i)
        })) : "mystic" === a && "cosmic" === n ? (d = "3", y = "200", await i.methods.fight("1", t.toString()).send({
            from: s
        }).once("transactionHash", function(t) {
            fight_txn_init(e, a)
        }).then(function(e) {
            $("#skip-btn").show(), init_fight_results(t, a, d, y, i)
        })) : "science" === a && "mystic" === n ? (d = "3", y = "200", await i.methods.fight("1", t.toString()).send({
            from: s
        }).once("transactionHash", function(t) {
            fight_txn_init(e, a)
        }).then(function(e) {
            $("#skip-btn").show(), init_fight_results(t, a, d, y, i)
        })) : "skill" === a && "science" === n ? (d = "3", y = "200", await i.methods.fight("1", t.toString()).send({
            from: s
        }).once("transactionHash", function(t) {
            fight_txn_init(e, a)
        }).then(function(e) {
            $("#skip-btn").show(), init_fight_results(t, a, d, y, i)
        })) : "mutant" === a && "skill" === n ? (d = "3", y = "200", await i.methods.fight("1", t.toString()).send({
            from: s
        }).once("transactionHash", function(t) {
            fight_txn_init(e, a)
        }).then(function(e) {
            $("#skip-btn").show(), init_fight_results(t, a, d, y, i)
        })) : "tech" === a && "mutant" === n ? (d = "3", y = "200", await i.methods.fight("1", t.toString()).send({
            from: s
        }).once("transactionHash", function(t) {
            fight_txn_init(e, a)
        }).then(function(e) {
            $("#skip-btn").show(), init_fight_results(t, a, d, y, i)
        })) : "cosmic" === a && "tech" === n ? (d = "3", y = "200", await i.methods.fight("1", t.toString()).send({
            from: s
        }).once("transactionHash", function(t) {
            fight_txn_init(e, a)
        }).then(function(e) {
            $("#skip-btn").show(), init_fight_results(t, a, d, y, i)
        })) : (d = "2", y = "150", await i.methods.fight("2", t.toString()).send({
            from: s
        }).once("transactionHash", function(t) {
            fight_txn_init(e, a)
        }).then(function(e) {
            $("#skip-btn").show(), init_fight_results(t, a, d, y, i)
        })), fetchMyHeroes()
    } catch (e) {
        new Noty({
            layout: "centerRight",
            text: e.message,
            type: "error",
            timeout: 3e3,
            animation: {
                open: "animated bounceInRight",
                close: "animated bounceOutRight"
            }
        }).show()
    }
    hideLoader()
}

function generateHerosPage(e) {
    var t = $("#main_xa").empty();
    if (showLoader(), 0 === e.NFTs.length) return t.append(' <div class="text-center">\n\n        <h3>You don\'t have any NFTs :(</h3>\n    </div>'), void hideLoader();
    var n = [];
    n.push('\n    <div class="carousel-item active" id="' + e.NFTs[0].id + "_" + e.NFTs[0].class + "_" + e.NFTs[0].key + '">\n                    <div style="min-height:300px;">\n                    <img class="img-fluid"\n                        src="images/cards/' + e.NFTs[0].tier + "/gif/" + e.NFTs[0].key + '.gif?nf_resize=fit" alt="">\n                        </div>\n                        <h2>' + e.NFTs[0].name + '</h2>\n                    <div style="height:165px; margin-left:25px; margin-right:25px; background: #18072dc2;\n                        border: 3px solid #550f78;\n                        border-radius: 10px;">\n                        <h4 style="padding-top:15px;">XP: ' + e.NFTs[0].xp + "</h4>\n                        <h4>Class: " + e.NFTs[0].class + "</h4>\n                        <h4>Tier: " + e.NFTs[0].tier + "</h4>\n\n                    </div>\n                </div>\n"), $.each(e.NFTs.slice(1, e.length), function(e, t) {
        n.push('\n    <div class="carousel-item" id="' + t.id + "_" + t.class + "_" + t.key + '">\n                    <div style="min-height:300px;">\n\n                    <img class="img-fluid"\n                        src="images/cards/' + t.tier + "/gif/" + t.key + '.gif?nf_resize=fit" alt="">\n                    </div>\n                    <h2>' + t.name + '</h2>\n                    <div style="height:165px; margin-left:25px; margin-right:25px; background: #18072dc2;\n                        border: 3px solid #550f78;\n                        border-radius: 10px;">\n                        <h4 style="padding-top:15px;">XP: ' + t.xp + "</h4>\n                        <h4>Class: " + t.class + "</h4>\n                        <h4>Tier: " + t.tier + "</h4>\n\n                    </div>\n                </div>\n")
    });
    var a = ' <div class="row mt-5">\n    <div class="col-lg-6 col-md-12 col-sm-12 text-center">\n        <div id="heroes" class="carousel slide" data-ride="carousel" data-interval="false">\n\n            <div class="carousel-inner">\n            ' + n.join("") + '    \n            </div>\n                <a class="carousel-control-prev"\n                    style="top:100px !important; bottom:auto !important; margin:10px;"\n                    href="#heroes" role="button" data-slide="prev">\n                    <span class="carousel-control-prev-icon" style="width:50px !important; height:50px !important;" aria-hidden="true"></span>\n                    <span class="sr-only">Previous</span>\n                </a>\n                <a class="carousel-control-next"\n                    style="top:100px !important; bottom:auto !important; margin:10px;"\n                    href="#heroes" role="button" data-slide="next">\n                    <span class="carousel-control-next-icon" style="width:50px !important; height:50px !important;" aria-hidden="true"></span>\n                    <span class="sr-only">Next</span>\n                </a>\n        </div>\n\n    </div>\n    <div class="col-lg-6 col-md-12 col-sm-12 text-center">\n        <div id="villains" class="carousel slide" data-ride="carousel"\n            data-interval="false">\n\n            <div class="carousel-inner">\n                <div class="carousel-item active" id="tech">\n                <div style="min-height:300px;">\n\n                    <img class="img-fluid" style="width:250px;padding-top: 35px;"\n                        src="images/gifs/villains/tech.gif?nf_resize=fit" alt="">\n                    </div>\n                    <h2>Tech Centroid</h2>\n                    <div style="height:165px; margin-left:25px; margin-right:25px; background: #18072dc2;\n                        border: 3px solid #550f78;\n                        border-radius: 10px;">\n                        <h4 style="padding-top:25px;">Tech >>> Mutant</h4>\n                        <br>\n                        <h4> Cosmic >>> Tech</h4>\n\n                    </div>\n\n                </div>\n                <div class="carousel-item" id="mystic">\n                <div style="min-height:300px;">\n\n                    <img class="img-fluid" style="width:250px;padding-top: 35px;"\n                        src="images/gifs/villains/mystic.gif?nf_resize=fit" alt="">\n                    </div>\n                    <h2>Mystic Centroid</h2>\n                    <div style="height:165px; margin-left:25px; margin-right:25px; background: #18072dc2;\n                    border: 3px solid #550f78;\n                    border-radius: 10px;">\n                    <h4 style="padding-top:25px;">Mystic >>> Cosmic</h4>\n                    <br>\n                    <h4>Science >>> Mystic</h4>\n                    \n                </div>\n                    </div>\n\n                <div class="carousel-item" id="cosmic">\n                <div style="min-height:300px;">\n\n                    <img class="img-fluid" style="width:250px;padding-top: 35px;"\n                        src="images/gifs/villains/cosmic.gif?nf_resize=fit" alt="">\n                    </div>\n                    <h2>Cosmic Centroid</h2>\n                    <div style="height:165px; margin-left:25px; margin-right:25px; background: #18072dc2;\n                    border: 3px solid #550f78;\n                    border-radius: 10px;">\n                    <h4 style="padding-top:25px;">Cosmic >>> Tech</h4>\n                    <br>\n                    <h4>Mystic >>> Cosmic</h4>\n\n                </div>\n                    </div>\n\n                <div class="carousel-item" id="mutant">\n                <div style="min-height:300px;">\n\n                    <img class="img-fluid" style="width:250px;padding-top: 35px;"\n                        src="images/gifs/villains/mutant.gif?nf_resize=fit" alt="">\n                    </div>\n                    <h2>Mutant Centroid</h2>\n                    <div style="height:165px; margin-left:25px; margin-right:25px; background: #18072dc2;\n                    border: 3px solid #550f78;\n                    border-radius: 10px;">\n                    <h4 style="padding-top:25px;">Mutant >>> Skill</h4>\n                    <br>\n                    <h4>Tech >>> Mutant</h4>\n\n                </div>\n                    </div>\n\n                <div class="carousel-item" id="skill">\n                <div style="min-height:300px;">\n\n                    <img class="img-fluid" style="width:250px;padding-top: 35px;"\n                        src="images/gifs/villains/skill.gif?nf_resize=fit" alt="">\n                        </div>\n                    <h2>Skill Centroid</h2>\n                    <div style="height:165px; margin-left:25px; margin-right:25px; background: #18072dc2;\n                    border: 3px solid #550f78;\n                    border-radius: 10px;">\n                    \n                    <h4 style="padding-top:25px;">Skill >>> Science</h4>\n                    <br>\n                    <h4>Mutant >>> Skill</h4>\n\n                </div>\n                    </div>\n\n                <div class="carousel-item" id="science">\n                <div style="min-height:300px;">\n\n                    <img class="img-fluid" style="width:250px;padding-top: 35px;"\n                        src="images/gifs/villains/science.gif?nf_resize=fit" alt="">\n                        </div>\n                    <h2>Science Centroid</h2>\n                    <div style="height:165px; margin-left:25px; margin-right:25px; background: #18072dc2;\n                    border: 3px solid #550f78;\n                    border-radius: 10px;">\n                    <h4 style="padding-top:25px;">Science >>> Mystic</h4>\n                    <br>\n                    <h4>Skill >>> Science</h4>\n\n\n                </div>\n                    </div>\n\n                <a class="carousel-control-prev"\n                    style="top:100px !important; bottom:auto !important; margin:10px;"\n                    href="#villains" role="button" data-slide="prev">\n                    <span class="carousel-control-prev-icon" style="width:50px !important; height:50px !important;" aria-hidden="true"></span>\n                    <span class="sr-only">Previous</span>\n                </a>\n                <a class="carousel-control-next"\n                    style="top:100px !important; bottom:auto !important; margin:10px;"\n                    href="#villains" role="button" data-slide="next">\n                    <span class="carousel-control-next-icon" style="width:50px !important; height:50px !important;" aria-hidden="true"></span>\n                    <span class="sr-only">Next</span>\n                </a>\n\n            </div>\n        </div>\n    </div>\n    <div class="col-lg-12 col-md-12 text-center">\n        <a class="battle_btn" href=""\n        style="position: absolute; top: 50px; left:0; right:0; margin-left:auto; margin-right:auto;">\n        <img src="images/button.png?nf_resize=fit" alt="" style="position: absolute;\n            top: 0px;\n            left: 0;\n            right: 0;\n            margin-left: auto;\n            margin-right: auto;">\n        <span style="color: white;\n            position: absolute;\n            top: 20px;\n            left: 0;\n            right: 0;\n            margin-left: auto;\n            font-size: x-large;">Fight</span>\n\n    </a>\n    </div>\n</div>\n<script>\n$(".battle_btn").click(function (event) {\n    event.preventDefault();\n    var hero_data = $(\'#heroes .active\')[0].id;\n    var hero_id, hero_class, hero_key;\n    hero_id = hero_data.split("_")[0];\n    hero_class = hero_data.split("_")[1];\n    hero_key = hero_data.split("_").slice(2, hero_data.split("_").length).join("_")\n    var villain_id = $(\'#villains .active\')[0].id;\n    fight(hero_key, hero_id, hero_class, villain_id);    \n});\n\n\n\n$(\'#heroes\').on(\'slid.bs.carousel\', function () {\n    var hero_data = $(\'#heroes .active\');\n    grayout(hero_data);\n\n});\n\nvar hero_data = $(\'#heroes .active\');\ngrayout(hero_data);\n\n<\/script>\n';
    t.append(a), hideLoader()
}
async function skip_btn_called() {
    skippedFight = !0
}
async function fetchMyNFTData(e) {
    let t, n = await loadMarketplaceContract(),
        a = [];
    for (let i = 0; i < e.length; i++) t = await n.methods.nfts((parseInt(e[i]) - 1).toString()).call(), a.push(t);
    return a
}
async function fetchMyHeroes() {
    let e;
    showLoader();
    const t = await getCurrentAccount();
    let n = await loadMarketplaceContract(),
        a = await n.methods.fetchInventory(t).call();
    e = await fetchMyNFTData(a), generateHerosPage(json = generateJsonMarketplace(e)), hideLoader()
}

function hideLoader() {
    document.getElementById("waiting").style.display = "none"
}

function showLoader() {
    document.getElementById("waiting").style.display = "block"
}
async function getCurrentAccount() {
    const e = new Web3(provider);
    return (await e.eth.getAccounts())[0]
}

function updateStatus(e) {
    document.getElementById("status").innerHTML = e
}

function updateTotalRewards(e) {
    document.getElementById("total-rewards").innerHTML = e
}

function updateMarketplaceBalance(e) {
    document.getElementById("marketplace-balance").innerHTML = e
}

function updateBalance(e) {
    document.getElementById("balance").innerHTML = `${(1e-18*e).toFixed(18)}`
}
$("#winModal").on("hidden.bs.modal", function() {
    hide_game_arena()
}), $("#lossModal").on("hidden.bs.modal", function() {
    hide_game_arena()
}), $("#skip-btn").click(function(e) {
    e.preventDefault(), skip_btn_called()
});
var timer = new easytimer.Timer;
async function grayout(e) {
    let t = await loadGameContract();
    try {
        const p = Date.now();
        var n = e[0].id.split("_")[0];
        let r;
        try {
            r = await t.methods.nftDetails(n).call()
        } catch {
            r = {
                CooldownBlock: "0"
            }
        }
        if (parseInt(p.toString().slice(0, p.toString().length - 3)) < parseInt(r.CooldownBlock) && "0" !== r.CooldownBlock) {
            e[0].childNodes[1].childNodes[1].classList.add("gray");
            var a = Math.abs(parseInt(r.CooldownBlock) - parseInt(p.toString().slice(0, p.toString().length - 3))),
                i = Math.floor(a / 3600) % 24;
            a -= 3600 * i;
            var s = Math.floor(a / 60) % 60,
                o = (a -= 60 * s) % 60;
            await timer.stop(), await sleep(100), timer.start({
                countdown: !0,
                startValues: {
                    hours: i,
                    minutes: s,
                    seconds: o
                }
            }), $("#countdownTimer .values").html(timer.getTimeValues().toString()), timer.addEventListener("secondsUpdated", function(e) {
                $("#countdownTimer .values").html(timer.getTimeValues().toString())
            }), $("#timer").show()
        } else e[0].childNodes[1].childNodes[1].classList.remove("gray"), $("#timer").hide()
    } catch (e) {
        new Noty({
            layout: "centerRight",
            text: e.message,
            type: "error",
            timeout: 3e3,
            animation: {
                open: "animated bounceInRight",
                close: "animated bounceOutRight"
            }
        }).show()
    }
}
async function isMarketplaceApproved() {
    if (!provider) return void new Noty({
        layout: "centerRight",
        text: "Please connect your wallet first!",
        type: "info",
        timeout: 3e3,
        animation: {
            open: "animated bounceInRight",
            close: "animated bounceOutRight"
        }
    }).show();
    let e = await loadContract();
    const t = await getCurrentAccount();
    try {
        return "0" !== await e.methods.allowance(t, marketplace_address).call() || ($("#approveModal").modal("show"), !1)
    } catch (e) {
        new Noty({
            layout: "centerRight",
            text: e.message,
            type: "error",
            timeout: 3e3,
            animation: {
                open: "animated bounceInRight",
                close: "animated bounceOutRight"
            }
        }).show()
    }
    $("#approveModal").modal("hide")
}
async function approve() {
    if (!provider) return void new Noty({
        layout: "centerRight",
        text: "Please connect your wallet first!",
        type: "info",
        timeout: 3e3,
        animation: {
            open: "animated bounceInRight",
            close: "animated bounceOutRight"
        }
    }).show();
    showLoader();
    let e = await loadContract();
    const t = await getCurrentAccount();
    try {
        await e.methods.approve(marketplace_address, "100000000000000000000000000000000000000000000000").send({
            from: t
        })
    } catch (e) {
        new Noty({
            layout: "centerRight",
            text: e.message,
            type: "error",
            timeout: 3e3,
            animation: {
                open: "animated bounceInRight",
                close: "animated bounceOutRight"
            }
        }).show()
    }
    $("#approveModal").modal("hide"), hideLoader()
}

function load_game_chars(e, t) {
    game_bg.src = game_bgs[Math.floor(Math.random() * game_bgs.length)], hero_idle.src = "images/game/chars/heroes/" + e + "/idle.gif", hero_attack.src = "images/game/chars/heroes/" + e + "/attack.gif", hero_sad.src = "images/game/chars/heroes/" + e + "/sad.gif", hero_hit.src = "images/game/chars/heroes/" + e + "/hit.gif", hero_win.src = "images/game/chars/heroes/" + e + "/win.gif", villain_idle.src = "images/game/chars/villains/" + t + "/idle.gif", villain_attack.src = "images/game/chars/villains/" + t + "/attack.gif", villain_sad.src = "images/game/chars/villains/" + t + "/sad.gif", villain_hit.src = "images/game/chars/villains/" + t + "/hit.gif", villain_win.src = "images/game/chars/villains/" + t + "/win.gif", $("#fight_arena_main").css("background-image", "url('" + game_bg.src + "')"), $("#hero-img").css("max-height", .3 * $(window).width() + "px"), $("#villain-img").css("max-height", .3 * $(window).width() + "px")
}
async function make_hero_idle() {
    $("#hero-img").attr("src", hero_idle.src)
}
async function make_hero_attack() {
    $("#hero-img").attr("src", hero_attack.src), await sleep(200), $("#hero-img").animate({
        left: "+=50px"
    }, "slow"), await sleep(500), $("#hero-img").animate({
        left: "-=50px"
    }, "slow"), $("#hero-img").attr("src", hero_idle.src)
}
async function make_hero_hit() {
    $("#hero-img").attr("src", hero_hit.src), await sleep(1e3), $("#hero-img").attr("src", hero_idle.src)
}
async function make_hero_sad() {
    $("#hero-img").attr("src", hero_sad.src)
}
async function make_hero_win() {
    $("#hero-img").attr("src", hero_win.src)
}
async function make_villain_idle() {
    $("#villain-img").attr("src", villain_idle.src)
}
async function make_villain_attack() {
    $("#villain-img").animate({
        right: "+=50px"
    }, "slow"), $("#villain-img").attr("src", villain_attack.src), await sleep(1e3), $("#villain-img").animate({
        right: "-=50px"
    }, "slow"), $("#villain-img").attr("src", villain_idle.src)
}
async function make_villain_hit() {
    $("#villain-img").attr("src", villain_hit.src), await sleep(1e3), $("#villain-img").attr("src", villain_idle.src)
}
async function make_villain_sad() {
    $("#villain-img").attr("src", villain_sad.src)
}
async function make_villain_win() {
    $("#villain-img").attr("src", villain_win.src)
}
async function win() {
    make_hero_win(), make_villain_sad()
}
async function game_idle() {
    make_hero_idle(), make_villain_idle()
}
async function loss() {
    make_hero_sad(), make_villain_win()
}
async function hero_attack_villain() {
    make_hero_attack();
    await sleep(400), make_villain_hit()
}
async function villain_attack_hero() {
    make_villain_attack(), await sleep(600), make_hero_hit()
}
async function chars_fight() {
    for (can_fight = !0; can_fight;) {
        await sleep(2e3), 1 == Math.floor(2 * Math.random()) + 1 ? await hero_attack_villain() : await villain_attack_hero()
    }
}
async function finish_fight(e) {
    can_fight = !1, await sleep(3500), "hero" === e ? win() : loss()
}
async function load_game_arena(e, t) {
    showLoader(), load_game_chars(e, t), game_idle(), hideLoader(), $("#header").hide("slide", {}, 1e3), $("#main-content").hide("slide", {}, 1e3), $("#footer").hide("slide", {}, 1e3), await sleep(1100), $("#fight-arena").show("slide", {}, 1e3), await sleep(1e3), $("#hero").animate({
        top: "+=112vh"
    }, "slow"), $("#boss").animate({
        top: "+=112vh"
    }, "slow")
}
async function hide_game_arena() {
    $("#fight-arena").hide("slide", {}, 1e3), await sleep(1100), $("#hero").css("top", "-100vh"), $("#boss").css("top", "-100vh"), $("#header").show("slide", {}, 1e3), $("#main-content").show("slide", {}, 1e3), $("#footer").show("slide", {}, 1e3)
}
$("#approve-btn").click(function(e) {
    approve()
}), window.addEventListener("load", async () => {
    init(), $(".carousel").carousel(), document.querySelector("#btn-connect").addEventListener("click", onConnect), document.querySelector("#btn-disconnect").addEventListener("click", onDisconnect)
});
