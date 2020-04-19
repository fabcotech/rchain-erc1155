module.exports.setLockedTermDappy = (registryUri, currentNonce, newNonce) => {
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
            "type": "SET_LOCKED",
            "payload": {
              "signature": "SIGN",
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
    }`,
    signatures: {
      SIGN: currentNonce,
    },
  };
};
