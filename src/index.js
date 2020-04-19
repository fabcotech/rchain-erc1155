const { createTokenTerm } = require("./createTokenTerm");
const { createTokenTermDappy } = require("./createTokenTermDappy");
const { purchaseTokenTerm } = require("./purchaseTokenTerm");
const { updateTokenDataTermDappy } = require("./updateTokenDataTermDappy");
const { setLockedTerm } = require("./setLockedTerm");
const { setLockedTermDappy } = require("./setLockedTermDappy");

module.exports = {
  createTokenTerm: createTokenTerm,
  createTokenTermDappy: createTokenTermDappy,
  purchaseTokenTerm: purchaseTokenTerm,
  updateTokenDataTermDappy: updateTokenDataTermDappy,
  setLockedTerm: setLockedTerm,
  setLockedTermDappy: setLockedTermDappy,
};
