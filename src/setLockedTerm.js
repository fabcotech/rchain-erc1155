module.exports.setLockedTerm = (registryUri, newNonce, signature) => {
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
            "type": "SET_LOCKED",
            "payload": {
              "signature": "${signature}",
              "newNonce": "${newNonce || "NONCE"}",
              "locked": true
            }
          },
          *returnCh
        )
      } |
    
      for (resp <- returnCh) {
        match *resp {
          String => { stdout!(*resp) }
          true => { stdout!("success, contract locked") }
        }
      } |
    
      basket!({ "status": "completed" })
    }`;
};
