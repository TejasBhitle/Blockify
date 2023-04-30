const Blockify = artifacts.require("Blockify");

module.exports = function (deployer) {
  deployer.deploy(Blockify);
};
