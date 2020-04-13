#### RCHAIN ERC-1155

Rholang (RChain) implementation of the ERC-1155 standard .

#### Standard

This is a very early stage implementation, it might not respect the ERC-1155 standard in some aspects . The goal is to have this rholang code enriched so it can fit many usecases and be some general purpose token managment contrazct anyone can pimp and deploy.

#### Token representation on chain

3 channels contains every data that is needed :

- `tokens` : map indexed per unique ID, there is one key-value per token ownership.
- `tokensAvailable` : map containing the quantity available for each token available to purchase, ther might be only one token, or more.
- `tokensData` : map containing the data associated with each token, it can be anything, depending on the usecase (JSON, images, files etc...)

#### Methods exposed

Through the `entry` channel that is exposed to the registry, any user can interact with this contract, you can just check the other `.rho` files of this repository to see what's possible .

- `CREATE` : at anytime, the owner can create some more tokens
- `PURCHASE` : any user can purchase a token that has a quantity superior to one

#### TODO

- Code the `TRANSFER_TOKEN` behaviour .
- The `CREATE_TOKEN` behaviour should be optionnal, the owner could choose to close it and never be able to create tokens again . The contract would become trustless since the owner has no control over it anymore .
- **There is a bug / lacking feature in rholang**, right now anyone can create tokens, only the owner should be able to . See `erc1155.rho` line 55 .
- Should a buy/sell mechanism be embedded in it .
- Right now every token costs 0 REV, `tokens_available` should contain a price .
- Maybe a user can be able to pimp his token, and eventually attach data to it . This would be some additional data to `tokens_data` which are defined by the owner . FOr example I would own a car with properties, and the color could be defined by the user .
