#### Rholang (RChain) ERC-1155 (vO.3)

Rholang (RChain) implementation of the ERC-1155 standard .

![Woods](https://images.pexels.com/photos/640809/pexels-photo-640809.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=300)

#### Using CLI

First rename the `.env.example` file to `.env` and eventually update the values to connect to another RChain network than RChain testnet. You must also add your private key in `.env` file so it will not appear on the screen and command line history.

Aliases: You can use `-r` option instead of `--registry-uri`

```
# Deploy a new empty ERC-1155 contract
node index.js deploy
```

After having first deployed you can see the registry URI, this is the identifier of the ERC-1155 contract on the blockchain.

```
# Check contract's public key, nonce, locked true/false, and bags
node index.js view --registry-uri 6yt475hd3qdmxuwnzktidtr4wsxsa6be4eor7mzayf4gdkmdywtbe4
```

```
# Lock contract, no token will ever be created in this contract anymore
node index.js lock --registry-uri 6yt475hd3qdmxuwnzktidtr4wsxsa6be4eor7mzayf4gdkmdywtbe4 --contract-nonce daece708505d4caea40dbf5dc3e0fc84
```

```
# Create tokens
# If --token-id is not given, a new token id will be created
# If --price is not given, the tokens won't be for sale
node index.js create-tokens --registry-uri 6yt475hd3qdmxuwnzktidtr4wsxsa6be4eor7mzayf4gdkmdywtbe4 --contract-nonce daece708505d4caea40dbf5dc3e0fc84 --price 100 --quantity 30  --token-id 0
```

```
# Purchase tokens from a bag
# If --price is not given, the tokens won't be for sale
node index.js purchase-tokens --registry-uri 6yt475hd3qdmxuwnzktidtr4wsxsa6be4eor7mzayf4gdkmdywtbe4  --price 100 --bag 0 --quantity 3
```

```
# Send tokens, which is equal to splitting a bag into two bags
# --nonce is the bag nonce, not the contract nonce
node index.js send-tokens --registry-uri 6yt475hd3qdmxuwnzktidtr4wsxsa6be4eo --nonce 1f4c20f6b3ec42f0a2c2d6980c6a8ac8 --bag 0 --quantity 7 --public-key aaa
```

Missing in CLI: playing with token data and bag data

#### Compile for javascript

_Generate all javascript source code in `src/` from rholang with `node generateJavascripts.js`

#### Token representation on chain

3 channels contains every data that is needed :

- `bags` : map indexed per bag ID, a bag can contain 0, 1, 1000 or more tokens. Many bag may point to the same token type (= token ID).
- `tokensData` : map containing the data associated with each token, it can be anything, depending on the usecase (JSON, images, files etc...), example: `{ "model": "Peugeot 308" }`. The owner of a bag _cannot_ change the data associated to the token.
- `bagsData` : map containing the data associated with each bag (a bag is a token ownership), it can be anything, depending on the usecase (JSON, images, files etc...), example: `{ "color": "red" }`. The owner of a bag _is the only person who can_ change the data associated to the bag.
- `mainCh` : map that contains data about this contract : `registryUri`, unique `nonce` that is changed each time an admin action is performed, `publicKey` of the owner (person who can lock and create tokens), `locked` boolean.

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
