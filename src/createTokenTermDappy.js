module.exports.createTokenTermDappy = (
  registryUri,
  currentNonce,
  newNonce,
  publicKey,
  n,
  price,
  quantity,
  data
) => {
  return {
    term: `new basket,
      entryCh,
      returnCh,
      lookup(\`rho:registry:lookup\`),
      stdout(\`rho:io:stdout\`)
    in {
    
      lookup!(\`rho:id:${registryUri}\`, *entryCh) |
    
      for(entry <- entryCh) {
        entry!(
          {
            "type": "CREATE_TOKEN",
            "payload": {
              "signature": "SIGN",
              "newNonce": "${newNonce || "NONCE"}",
              "publicKey": "${publicKey}",
              "price": ${price || "Nil"},
              "n": ${typeof n == "number" ? n : "Nil"},
              "quantity": ${quantity},
              "data": ${data || "Nil"}
            }
          },
          *returnCh
        )
      } |
    
      for (resp <- returnCh) {
        match *resp {
          String => { stdout!(*resp) }
          true => { stdout!("success, token created") }
        }
      } |
    
      basket!({ "status": "completed" })
    }`,
    signatures: {
      SIGN: currentNonce,
    },
  };
};
