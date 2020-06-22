const { erc1155Term } = require("./erc1155Term");
const { createTokensTerm } = require("./createTokensTerm");
const { purchaseTokensTerm } = require("./purchaseTokensTerm");
const { sendTokensTerm } = require("./sendTokensTerm");
const { setLockedTerm } = require("./setLockedTerm");
const { updateTokenDataTerm } = require("./updateTokenDataTerm");
const { updateBagDataTerm } = require("./updateBagDataTerm");

module.exports = {
  erc1155Term,
  createTokensTerm,
  purchaseTokensTerm,
  sendTokensTerm,
  setLockedTerm,
  updateTokenDataTerm,
  updateBagDataTerm,
};
