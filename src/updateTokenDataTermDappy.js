module.exports.updateTokenDataTermDappy = (
  registryUri,
  currentNonce,
  newNonce,
  n,
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
          "type": "UPDATE_TOKEN_DATA",
          "payload": {
            "signature": "SIGN",
            "newNonce": "${newNonce}",
            "n": "${n}",
            "data": ${data ? '"' + encodeURI(data) + '"' : "Nil"}
          }
        },
        *returnCh
      )
    } |
  
    for (resp <- returnCh) {
      match *resp {
        String => { stdout!(*resp) }
        true => { stdout!("success, token data updated") }
      }
    } |
  
    basket!({ "status": "completed" })
  }`,
    signatures: {
      SIGN: currentNonce,
    },
  };
};
