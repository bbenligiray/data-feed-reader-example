# API3 data feed reader example

> An example project for reading API3 data feeds on Avalanche testnet

API3 serves three kinds of data feeds:

- [Beacons](https://medium.com/api3/beacons-building-blocks-for-web3-data-connectivity-df6ad3eb5763): Single-source data
  feeds, addressed by the hash of their parameters
- Beacon sets: Aggregation of Beacons, addressed by the hash of the IDs of the aggregated Beacons
- [dAPIs](https://medium.com/api3/dapis-apis-for-dapps-53b83f8d2493): A managed data feed that is pointed to a Beacon or
  a Beacon set, addressed by its human-readable name

In this repo, we inherit the DapiReader contract to implement an example data feed reader contract that reads dAPIs.

## Access control

Anyone can read an API3 data feed with an off-chain, static call. However, only contracts allowed by an authorized
account are allowed to read on-chain. For production use-cases on mainnet, you will need to pay for contract read
access. On Avalanche testnet, there is a contract that you can call to allow your contract to do on-chain calls for free
for testing purposes, which we use in this repo.

## dAPI names

dAPIs are read using their names. Here is the list of dAPI names you can use on Avalanche testnet

- `Bitcoin Index` (EOD)
- `Ethereum Index` (EOD)
- `BATCH04`
- `BATCP04`
- `CNCAD00`
- `ACRCA00`
- `BTC/USD`
- `SOL/USD`
- `AVAX/USD`

While using the scripts, you will need to specify the dAPI names as the environment variable `DAPI_NAME`.

## Installation instructions

- Install dependencies

```sh
yarn
```

- Enter credentials

```sh
cp credentials.example.json credentials.json

# ..and populate credentials.json with your mnemonic
```

## Reading data feeds off-chain

Use the script below to read the data feeds off-chain. You need to do the static call with a VoidSigner with address 0,
see the script for details.

```sh
DAPI_NAME="AVAX/USD" yarn run:off-chain-read-with-name
```

## Deploying DataFeedReaderExample

- Get testnet AVAX from the [faucet](https://faucet.avax.network/)

- Deploy DataFeedReaderExample

```sh
yarn deploy
```

## Reading dAPIs with name using DataFeedReaderExample

First send a transaction to allow the deployed DataFeedReaderExample contract to read the dAPI. Note that you only need
to do this once, and you can only do this on Avalanche testnet.

```sh
DAPI_NAME="AVAX/USD" yarn run:allow-to-read-with-name
```

Then you can use the script below to have the DataFeedReaderExample contract read the dAPI.

```sh
DAPI_NAME="AVAX/USD" yarn run:read-with-name
```

You can also omit reading the timestamp and only get the value.

```sh
DAPI_NAME="AVAX/USD" yarn run:read-value-with-name
```

## Local development and testing

A MockDapiServer contract is provided for local development and testing. See the tests for its usage, and run the tests
with

```sh
yarn test
```
