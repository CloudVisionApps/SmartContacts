module.exports = {
    compilers: {
     solc: {
       version: "0.8.0"
     }
   },
  // Uncommenting the defaults below
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  //
  networks: {
    development: {
       host: "127.0.0.1",     // Localhost (default: none)
       port: 7545,            // Standard BSC port (default: none)
       network_id: "*",       // Any network (default: none)
     },
     testnet: {
       provider: () => new HDWalletProvider(mnemonic, `https://data-seed-prebsc-1-s1.binance.org:8545`),
       network_id: 97,
       confirmations: 10,
       timeoutBlocks: 200,
       skipDryRun: true
     },
     bsc: {
       provider: () => new HDWalletProvider(mnemonic, `https://bsc-dataseed1.binance.org`),
       network_id: 56,
       confirmations: 10,
       timeoutBlocks: 200,
       skipDryRun: true
     },
  },
  //
  // Truffle DB is currently disabled by default; to enable it, change enabled:
  // false to enabled: true. The default storage location can also be
  // overridden by specifying the adapter settings, as shown in the commented code below.
  //
  // NOTE: It is not possible to migrate your contracts to truffle DB and you should
  // make a backup of your artifacts to a safe location before enabling this feature.
  //
  // After you backed up your artifacts you can utilize db by running migrate as follows:
  // $ truffle migrate --reset --compile-all
  //
  // db: {
    // enabled: false,
    // host: "127.0.0.1",
    // adapter: {
    //   name: "sqlite",
    //   settings: {
    //     directory: ".db"
    //   }
    // }
  // }
};
