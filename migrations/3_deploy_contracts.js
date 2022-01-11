
const Lottery = artifacts.require("Lottery");

module.exports = async function(deployer) {
  await deployer.deploy(Lottery);
  const instance = await Lottery.deployed();
  if(instance) {
    console.log("Lottery successfully deployed.")
  }
}
