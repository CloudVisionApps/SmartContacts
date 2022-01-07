const ConvertLib = artifacts.require("ConvertLib");
const AFCToken = artifacts.require("AFCToken");

module.exports = function(deployer) {
  deployer.deploy(AFCToken);
};
