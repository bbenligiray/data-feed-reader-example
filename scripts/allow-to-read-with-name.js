const hre = require('hardhat');

async function main() {
  const DataFeedReaderExample = await hre.deployments.get('DataFeedReaderExample');
  const selfServeDapiServerWhitelisterAddressOnMilkomedaTestnet = '0x8F3A2508C45a58d4fBAd5Ce564899659626D41B6';
  const selfServeDapiServerWhitelisterAbi = [
    'function allowToReadDataFeedWithIdFor30Days(bytes32 dataFeedId, address reader) public',
    'function allowToReadDataFeedWithDapiNameFor30Days(bytes32 dapiName, address reader) external',
  ];
  const selfServeDapiServerWhitelister = new hre.ethers.Contract(
    selfServeDapiServerWhitelisterAddressOnMilkomedaTestnet,
    selfServeDapiServerWhitelisterAbi,
    (await hre.ethers.getSigners())[0]
  );
  const dapiName = process.env.DAPI_NAME;
  if (!dapiName) {
    throw new Error('dAPI name not defined');
  }
  const encodedDapiName = hre.ethers.utils.formatBytes32String(dapiName);
  await selfServeDapiServerWhitelister.allowToReadDataFeedWithDapiNameFor30Days(
    encodedDapiName,
    DataFeedReaderExample.address
  );
  console.log(
    `Allowed DataFeedReaderExample at ${DataFeedReaderExample.address} to read dAPI with name ${dapiName} for 30 days.`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
