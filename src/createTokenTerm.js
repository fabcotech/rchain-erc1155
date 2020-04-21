module.exports.createTokenTerm = (
  registryUri,
  signature,
  newNonce,
  publicKey,
  n,
  price,
  quantity,
  data
) => {
  return `new basket,
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
            "signature": "${signature}",
            "newNonce": "${newNonce}",
            "publicKey": "${publicKey}",
            "price": ${price || "Nil"},
            "n": ${typeof n == "string" ? '"' + n + '"' : "Nil"},
            "quantity": ${quantity},
            "data": ${data ? '"' + encodeURI(data) + '"' : "Nil"}
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
  }
  `;
};