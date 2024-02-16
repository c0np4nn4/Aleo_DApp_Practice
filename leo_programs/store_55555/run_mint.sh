APPNAME="store_55555"
PRIVATEKEY="APrivateKey1zkp44PwGuafnWhGJu1a9WDPRjdVwbeX8aZ56rg4iHxUoHqh"

snarkos developer execute "${APPNAME}.aleo" mint \
  aleo193snwc6vm4gt9kv406gfu7aa8htxxs89xc9twqcg2nu7rq2crcxskh4el9 \
  10000u64 \
  --private-key "${PRIVATEKEY}" \
  --query "https://api.explorer.aleo.org/v1" \
  --priority-fee 3000000 \
  --broadcast "https://api.explorer.aleo.org/v1/testnet3/transaction/broadcast" \