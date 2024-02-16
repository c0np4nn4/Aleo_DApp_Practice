APPNAME="store_55555"
PRIVATEKEY="APrivateKey1zkp44PwGuafnWhGJu1a9WDPRjdVwbeX8aZ56rg4iHxUoHqh"

TOKEN="'{ 
    owner: aleo193snwc6vm4gt9kv406gfu7aa8htxxs89xc9twqcg2nu7rq2crcxskh4el9.private,
    amount: 10000u64.private,
    _nonce: 6454746015393505811671401129091330549036205015618570235834391641324347085342group.public 
}'"

snarkos developer execute "${APPNAME}.aleo" buy \
'{
  owner: aleo193snwc6vm4gt9kv406gfu7aa8htxxs89xc9twqcg2nu7rq2crcxskh4el9.private,
  amount: 10000u64.private,
  _nonce: 6454746015393505811671401129091330549036205015618570235834391641324347085342group.public
}' \
  1u8 \
  5u64 \
  500u64 \
  --private-key "${PRIVATEKEY}" \
  --query "https://api.explorer.aleo.org/v1" \
  --priority-fee 3000000 \
  --broadcast "https://api.explorer.aleo.org/v1/testnet3/transaction/broadcast" \