const AFCToken = artifacts.require("AFCToken");

module.exports = async function(deployer) {
  await deployer.deploy();
  const instance = await AFCToken.deployed();
  if(instance) {
    console.log("AFCToken successfully deployed.")
  }
}
