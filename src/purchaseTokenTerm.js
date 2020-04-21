module.exports.purchaseTokenTerm = (
  registryUri,
  uniqueId,
  price,
  quantity,
  publicKey
) => {
  return `new
    revVaultPurseCh,
    priceCh,
    quantityCh,
    publicKeyCh,
    returnCh,
    uniqueIdCh,
    registryUriCh,
    revAddressCh,
    registryLookup(\`rho:registry:lookup\`),
    stdout(\`rho:io:stdout\`),
    revAddress(\`rho:rev:address\`)
  in {
  
    /*
      The 5 following values must be filled with proper values
    */ 
    // Registry URI of the ERC-1155 contract
    registryUriCh!!(\`rho:id:${registryUri}\`) |
    // Unique ID of the token you want to purchase
    uniqueIdCh!!("${uniqueId}") |
    // Per token price, make sure it is accurate
    priceCh!!(${price}) |
    // Quantity you want to purchase, make sure enough are available
    quantityCh!!(${quantity}) |
    // Your public key
    publicKeyCh!!("${publicKey}") |
  
    registryLookup!(\`rho:rchain:revVault\`, *revVaultPurseCh) |
  
    /*
      Create a vault/purse that is just used once (purse)
    */
    for(@(_, *RevVaultPurse) <- revVaultPurseCh) {
      new unf, purseRevAddrCh, purseAuthKeyCh, vaultCh, revAddressCh in {
        revAddress!("fromUnforgeable", *unf, *purseRevAddrCh) |
        RevVaultPurse!("unforgeableAuthKey", *unf, *purseAuthKeyCh) |
        for (@purseAuthKey <- purseAuthKeyCh; @purseRevAddr <- purseRevAddrCh) {
  
          stdout!({"new purse rev addr": purseRevAddr, "purse authKey": purseAuthKey}) |
  
          RevVaultPurse!("findOrCreate", purseRevAddr, *vaultCh) |
  
          for (
            @(true, *vault) <- vaultCh;
            @publicKey <- publicKeyCh;
            @uniqueId <- uniqueIdCh;
            @registryUri <- registryUriCh;
            @price <- priceCh;
            @quantity <- quantityCh
          ) {
  
            revAddress!("fromPublicKey", publicKey.hexToBytes(), *revAddressCh) |
  
            new RevVaultCh in {
  
              registryLookup!(\`rho:rchain:revVault\`, *RevVaultCh) |
              for (@(_, RevVault) <- RevVaultCh; deployerRevAddress <- revAddressCh) {
  
                stdout!(("3.transfer_funds.rho")) |
  
                /*
                  Put price * quantity REV in the purse
                */
                match (
                  *deployerRevAddress,
                  purseRevAddr,
                  price * quantity
                ) {
                  (from, to, amount) => {
  
                    new vaultCh, revVaultkeyCh, deployerId(\`rho:rchain:deployerId\`) in {
                      @RevVault!("findOrCreate", from, *vaultCh) |
                      @RevVault!("deployerAuthKey", *deployerId, *revVaultkeyCh) |
                      for (@(true, vault) <- vaultCh; key <- revVaultkeyCh) {
  
                        stdout!(("Beginning transfer of ", amount, "REV from", from, "to", to)) |
  
                        new resultCh, entryCh in {
                          @vault!("transfer", to, amount, *key, *resultCh) |
                          for (@result <- resultCh) {
  
                            stdout!(("Finished transfer of ", amount, "REV to", to, "result was:", result)) |
                            match result {
                              (true, Nil) => {
                                stdout!("yes") |
                                registryLookup!(registryUri, *entryCh) |
  
                                for(entry <- entryCh) {
                                  stdout!(("GET ENTRY", *entry)) |
                                  entry!(
                                    {
                                      "type": "PURCHASE_TOKEN",
                                      "payload": {
                                        "quantity": quantity,
                                        "uniqueId": uniqueId,
                                        "publicKey": publicKey,
                                        "purseRevAddr": purseRevAddr,
                                        "purseAuthKey": purseAuthKey
                                      }
                                    },
                                    *returnCh
                                  ) |
                                  for (resp <- returnCh) {
                                    match *resp {
                                      String => { stdout!(*resp) }
                                      true => { stdout!("success, purchase successful") }
                                    }
                                  }
                                }
                              }
                              _ => {
                                stdout!(result) |
                                stdout!("no")
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }`;
};