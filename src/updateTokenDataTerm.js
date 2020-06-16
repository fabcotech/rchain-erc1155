module.exports.updateTokenDataTermTerm = (
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
          // signature of the current nonce, with the private key of the owner (generateSignatureForNonce.js)
          "signature": "${signature}",
          // new nonce, must be different and random (generateNonce.js)
          "newNonce": "${newNonce}",
          // token ID you want to attach data to
          "n": ${typeof n == "string" ? '"' + n + '"' : "Nil"},
          // data is used only if new token ("n" : Nil)
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

}
`,
    signatures: { SIGN: currentNonce }
  };
};