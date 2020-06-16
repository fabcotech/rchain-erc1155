const fs = require("fs");

const createTokensFile = fs
  .readFileSync("./create_tokens.rho")
  .toString("utf8");

const replaceEverything = (a) => {
  return (
    a
      .replace(/`/g, "\\`")
      .replace(/\$\{/g, "\\${")
      .replace("REGISTRY_URI", "${registryUri}")
      .replace("SIGNATURE", "${signature}")
      .replace(
        "TOKEN_ID",
        '${typeof n == "string" ? \'"\' + n + \'"\' : "Nil"}'
      )
      .replace("NEW_NONCE", "${newNonce}")
      .replace("BAG_NONCE", "${bagNonce}")
      .replace("PRICE", '${price || "Nil"}')
      .replace("QUANTITY", "${quantity}")
      .replace("PUBLIC_KEY", "${publicKey}")
      .replace("BAG_ID", "${bagId}")
      .replace("TOKEN_ID", "${tokenId}")
      .replace("BAG_DATA", "${data ? '\"' + encodeURI(data) + '\"' : \"Nil\"}")
      // some function name end with _DATA
      .replace(": DATA", ": ${data ? '\"' + encodeURI(data) + '\"' : \"Nil\"}")
  );
};
fs.writeFileSync(
  "./src/createTokensTerm.js",
  `module.exports.createTokensTerm = (
  registryUri,
  currentNonce,
  signature,
  newNonce,
  bagNonce,
  publicKey,
  n,
  price,
  quantity,
  data
) => {
  return {
    term: \`${replaceEverything(createTokensFile)}\`,
    signatures: { SIGN: currentNonce},
  };
};`
);

const purchaseTokensFile = fs
  .readFileSync("./purchase_tokens.rho")
  .toString("utf8");

fs.writeFileSync(
  "./src/purchaseTokensTerm.js",
  `
module.exports.createTokenTerm = (
  registryUri,
  bagId,
  price,
  data,
  quantity,
  publicKey,
  bagNonce
) => {
  return {
    term: \`${replaceEverything(purchaseTokensFile)}\`,
    signatures: {}
  };
};
`
);

const setLockedFile = fs.readFileSync("./set_locked.rho").toString("utf8");

fs.writeFileSync(
  "./src/setLockedTerm.js",
  `module.exports.setLockedTerm = (registryUri, currentNonce, newNonce, signature) => {
  return { term: \`${replaceEverything(setLockedFile)}\`,
  signatures: { SIGN: currentNonce }
};
};`
);

const updateTokenDataFile = fs
  .readFileSync("./update_token_data.rho")
  .toString("utf8");

fs.writeFileSync(
  "./src/updateTokenDataTerm.js",
  `module.exports.updateTokenDataTermTerm = (
  registryUri,
  currentNonce,
  newNonce,
  n,
  data    
) => {
  return {
    term: \`${replaceEverything(updateTokenDataFile)}\`,
    signatures: { SIGN: currentNonce }
  };
};`
);

const sendTokensFile = fs.readFileSync("./send_tokens.rho").toString("utf8");

fs.writeFileSync(
  "./src/sendTokensTerm.js",
  `module.exports.sendTokensTerm = (
  registryUri,
  signature,
  newNonce,
  quantity,
  publicKey,
  bagId,
  data    
) => {
  return {
    term: \`${replaceEverything(sendTokensFile)}\`,
    signatures: {}
  };
};`
);

const erc1155Term = fs.readFileSync("./erc1155.rho").toString("utf8");

fs.writeFileSync(
  "./src/erc1155Term.js",
  `module.exports.updateTokenDataTermTerm = (newNonce, publicKey) => {
    return { term: \`${erc1155Term
      .replace(/`/g, "\\`")
      .replace(/\$\{/g, "\\${")
      .replace(/"NEW_NONCE"/g, "${newNonce}")
      .replace(/"PUBLIC_KEY"/g, "${publicKey}")}\`,
    signatures: {}
  };
};`
);
