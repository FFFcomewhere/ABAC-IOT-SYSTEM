const ConvertLib = artifacts.require("ConvertLib");
const HelloWorld = artifacts.require("HelloWorld");
const Attributes = artifacts.require("Attributes");

module.exports = function (deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, HelloWorld);
  deployer.deploy(HelloWorld, "Hello World constructor!");
  deployer.link(ConvertLib, Attributes);
  deployer.deploy(Attributes);
};
