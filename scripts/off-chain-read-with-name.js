const hre = require('hardhat');
const dapiServerDeploymentOnAvalancheTestnet = require('@api3/operations/chain/deployments/avalanche-testnet/DapiServer.json');

async function main() {
  const voidSignerAddressZero = new hre.ethers.VoidSigner(hre.ethers.constants.AddressZero, hre.ethers.provider);
  const dapiServer = new hre.ethers.Contract(
    dapiServerDeploymentOnAvalancheTestnet.address,
    dapiServerDeploymentOnAvalancheTestnet.abi,
    voidSignerAddressZero
  );
  const dapiName = process.env.DAPI_NAME;
  if (!dapiName) {
    throw new Error('dAPI name not defined');
  }
  const encodedDapiName = hre.ethers.utils.formatBytes32String(dapiName);
  const dapi = await dapiServer.readDataFeedWithDapiName(encodedDapiName);
  console.log(
    `VoidSigner with address 0 read dAPI with name ${dapiName} as \n  value: ${dapi.value.toString()}\n  timestamp: ${dapi.timestamp.toString()}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
