const createTokenTerm = require("./createTokenTerm").createTokenTerm;
const createTokenTermDappy = require("./createTokenTermDappy")
  .createTokenTermDappy;
const purchaseTokenTerm = require("./purchaseTokenTerm").purchaseTokenTerm;

module.exports = {
  createTokenTerm: createTokenTerm,
  createTokenTermDappy: createTokenTermDappy,
  purchaseTokenTerm: purchaseTokenTerm,
};
