const rchainToolkit = require('rchain-toolkit');
const uuidv4 = require("uuid/v4");

const {
  sendTokensTerm,
} = require('../src/');

const {
  getBagId,
  getQuantity,
  getRegistryUri,
  getNonce,
  generateSignature,
  getPublicKey,
  log,
  validAfterBlockNumber,
} = require('./utils');

module.exports.sendTokens = async () => {
  const registryUri = getRegistryUri();
  const quantity = getQuantity();
  const publicKey = getPublicKey();
  const bagId = getBagId();
  const bagNonce = uuidv4().replace(/-/g, "");
  const bagNonce2 = uuidv4().replace(/-/g, "");
  const timestamp = new Date().getTime();
  const signature = generateSignature(getNonce(), process.env.PRIVATE_KEY);
  const term = sendTokensTerm(
    registryUri,
    signature,
    bagNonce,
    bagNonce2,
    quantity,
    publicKey,
    bagId,
    ""
  );

  const vab = await validAfterBlockNumber(process.env.READ_ONLY_HOST);
  const deployOptions = await rchainToolkit.utils.getDeployOptions(
    "secp256k1",
    timestamp,
    term,
    process.env.PRIVATE_KEY,
    rchainToolkit.utils.publicKeyFromPrivateKey(process.env.PRIVATE_KEY),
    1,
    1000000,
    vab
  );
  try {
    const deployResponse = await rchainToolkit.http.deploy(
      process.env.VALIDATOR_HOST,
      deployOptions
    );
    if (!deployResponse.startsWith('"Success!')) {
      log("Unable to deploy");
      console.log(deployResponse);
      process.exit();
    }
  } catch (err) {
    log("Unable to deploy");
    console.log(err);
    process.exit();
  }
  log('✓ deployed');
}