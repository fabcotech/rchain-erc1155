#### Rholang (RChain) ERC-1155 (vO.3)

Rholang (RChain) implementation of the ERC-1155 standard .

![Woods](https://images.pexels.com/photos/640809/pexels-photo-640809.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=300)

#### Standard

This is a very early stage implementation, it might not respect the ERC-1155 standard in some aspects . The goal is to have this rholang code enriched so it can fit many usecases and be some general purpose token managment contrazct anyone can pimp and deploy.

_Generate all javascript source code _ with `node generateJavascripts.js`

#### Token representation on chain

3 channels contains every data that is needed :

- `tokens` : map indexed per unique ID, there is one key-value per token ownership.
- `tokensData` : map containing the data associated with each token, it can be anything, depending on the usecase (JSON, images, files etc...), example: `{ "model": "Peugeot 308" }`. The owner of a bag _cannot_ change the data associated to the token.
- `bagsData` : map containing the data associated with each bag (a bag is a token ownership), it can be anything, depending on the usecase (JSON, images, files etc...), example: `{ "color": "red" }`. The owner of a bag _is the only person who can_ change the data associated to the bag.
- `mainCh` : map that contains meta datas about this contract : `registryUri`, unique `nonce` that is changed each time an admin action is performed, `publicKey` of the owner (person who can lock and create tokens), `locked` boolean.

#### Methods exposed

Through the `entry` channel that is exposed to the registry, any user can interact with this contract, you can just check the other `.rho` files of this repository to see what's possible .

- `CREATE_TOKENS` (owner only) : at anytime, the owner can create some more tokens, see `create_token.rho`.
- `SET_LOCKED` (owner only): the owner (person who initially deploy) can create tokens, and set the locked value. Once he locks the contract, he has no specific right or power over it, the contract is left to itself. The total tokens amount won't change anymore, the tokens data cannot be changed anymore, it is basically a free market, people can set a price for a token, sell and buy them, see `set_locked.rho`.
- `UPDATE_TOKEN_DATA`(owner only and not locked): Update the data associated with a token (not a bag).
- `PURCHASE_TOKENS` : any user can purchase a token that has a quantity superior to one, see `purchase_token.rho`.
- `SEND_TOKENS` : any user can send tokens he owns to another public key. This will split a bag into two bags, it can also be the same public key, eventually to sell just a portion of tokens.
- `UPDATE_BAG_DATA`: Any user who owns tokens can update the data associated with this bag.
- `READ` : reads the value in `mainCh` and returns it, see `set_locked.rho`.
- `READ_TOKENS` : reads the value in `tokens` and returns it, see `read_tokens.rho`.
- `READ_TOKENS_DATA` : reads the value in `tokensData` and returns it, see `read_tokens_data.rho`.

#### TODO

- Exchange capabilities

  "askPublicKey": "aaa",
  "OfferPublicKey": "bbb",
  "uniqueIdAsk": [{ "amount": 4, "n": "3" }]
  "uniqueIdOffer": [{ "amount": 1, "uniqueId": "3" }],
  "sellerSignature": "aaa",
  "buyerSignature": "bbbb"
