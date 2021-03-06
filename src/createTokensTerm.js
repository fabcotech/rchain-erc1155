module.exports.createTokensTerm = (
  registryUri,
  signature,
  newNonce,
  bagNonce,
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
        "type": "CREATE_TOKENS",
        "payload": {
          // signature of the current nonce, with the private key of the owner (generateSignatureForNonce.js)
          "signature": "${signature}",
          // new nonce, must be different and random (generateNonce.js)
          "newNonce": "${newNonce}",
          // new nonce for the bag, must be random (generateNonce.js)
          "bagNonce": "${bagNonce}",
          // per token price, can be Nil if the token is not for sale
          "price": ${price || "Nil"},
          // The token you create can be a new one ("n" : Nil)
          // or it can be linked to an existing token data (ex: "n": "0")
          "n": ${typeof n == "string" ? '"' + n + '"' : "Nil"},
          // quantity of tokens to create
          "quantity": ${quantity},
          // publicKey this set of tokens (depending on quantity) will belong to
          "publicKey": "${publicKey}", // used only if new token
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
      true => { stdout!("success, token created") }
    }
  } |

  basket!({ "status": "completed" })

}
`;
};