#### Rholang (RChain) ERC-1155

Rholang (RChain) implementation of the ERC-1155 standard .

![Woods](https://images.pexels.com/photos/640809/pexels-photo-640809.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=300)

#### Standard

This is a very early stage implementation, it might not respect the ERC-1155 standard in some aspects . The goal is to have this rholang code enriched so it can fit many usecases and be some general purpose token managment contrazct anyone can pimp and deploy.

#### Token representation on chain

3 channels contains every data that is needed :

- `tokens` : map indexed per unique ID, there is one key-value per token ownership.
- `tokensData` : map containing the data associated with each token, it can be anything, depending on the usecase (JSON, images, files etc...)
- `mainCh` : map that contains meta datas about this contract : `registryUri`, unique `nonce` that is changed each time an admin action is performed, `publicKey` of the owner (person who can lock and create tokens), `locked` boolean.

#### Methods exposed

Through the `entry` channel that is exposed to the registry, any user can interact with this contract, you can just check the other `.rho` files of this repository to see what's possible .

- `CREATE_TOKEN` (owner only) : at anytime, the owner can create some more tokens, see `create_token.rho`.
- `SET_LOCKED` (owner only): the owner (person who initially deploy) can create tokens, and set the locked value. Once he locks the contract, he has no specific right or power over it, the contract is left to itself. The total tokens amount won't change anymore, the tokens data cannot be changed anymore, it is basically a free market, people can set a price for a token, sell and buy them, see `set_locked.rho`.
- `PURCHASE_TOKEN` : any user can purchase a token that has a quantity superior to one, see `purchase_token.rho`.
- `READ` : reads the value in `mainCh` and returns it, see `set_locked.rho`.
- `READ_TOKENS` : reads the value in `tokens` and returns it, see `read_tokens.rho`.
- `READ_TOKENS_DATA` : reads the value in `tokensData` and returns it, see `read_tokens_data.rho`.

#### TODO

- Code the `TRANSFER_TOKEN` behaviour. Simply transfer a set of tokens to another public key, `SPLIT_TOKEN` could use this same method, it splits a set of tokens to two.
- Maybe a user can be able to pimp a set of tokens, and eventually attach data to it. This would be some additional data to `tokensData` which are defined by the owner. For example I would own a car with properties, and the color could be defined by the user.
- Exchange capabilities

  "askPublicKey": "aaa",
  "OfferPublicKey": "bbb",
  "uniqueIdAsk": [{ "amount": 4, "n": "3" }]
  "uniqueIdOffer": [{ "amount": 1, "uniqueId": "3" }],
  "sellerSignature": "aaa",
  "buyerSignature": "bbbb"
