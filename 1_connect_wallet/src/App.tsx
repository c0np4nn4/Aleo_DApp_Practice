import React, { FC, useEffect, useMemo, useState } from "react";
import {
  useWallet,
  WalletProvider,
} from "@demox-labs/aleo-wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@demox-labs/aleo-wallet-adapter-reactui";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import {
  DecryptPermission,
  Transaction,
  Transition,
  WalletAdapterNetwork,
  AleoTransaction,
} from "@demox-labs/aleo-wallet-adapter-base";
import logo from "./logo.svg";
import "./App.css";
import { Button, Form } from "react-bootstrap";

// Default styles that can be overridden by your app
require("@demox-labs/aleo-wallet-adapter-reactui/styles.css");

export const App = () => {
  const wallets = useMemo(
    () => [
      new LeoWalletAdapter({
        appName: "Leo Demo App",
      }),
    ],
    []
  );

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="flex-column rounded border-2 p-4 bg-light shadow">
        <h1 className="text-center">Hello, Aleo!</h1>

        <WalletProvider
          wallets={wallets}
          decryptPermission={DecryptPermission.UponRequest}
          network={WalletAdapterNetwork.Testnet}
          autoConnect={true}
        >
          <WalletModalProvider>
            <WalletMultiButton />
            <WalletToolBox />
          </WalletModalProvider>
        </WalletProvider>
      </div>
    </div>
  );
};

const WalletToolBox = () => {
  const { wallet, connected } = useWallet();

  // Now you can use the `wallet` object here

  return (
    <div> 
      {connected ? (
        <div className="mt-2 flex-column rounded border-2 p-4 bg-light shadow">
          <TransferCredit />
        </div>
      ) : (
        <div></div>
      )}
      {/* Your component code here */}
    </div>
  );
};

const TransferCredit = () => {
  const { requestTransaction, publicKey } = useWallet();
  const [amount, setAmount] = useState<number>(0);
  const [fee, setFee] = useState<number>(0);
  const [toAddr, setToAddr] = useState<string>("");

  const handleTransfer = async () => {
    
    const transfer_public_transition = new Transition(
      "credits.aleo",
      "transfer_public",
      [
        toAddr, amount.toString() + "u64"
      ]
    ) 

    const send_credit_tx = new Transaction(
      publicKey!,
      WalletAdapterNetwork.Testnet,
      [transfer_public_transition],
      fee,
      false,
    )

    console.log("send_credit_tx:", send_credit_tx);

    if (requestTransaction) {
       const res = await requestTransaction(send_credit_tx);
      setAmount(0);
      setToAddr("");

       console.log("check: ", res);
    }
  };

  return (
    <div>
      <Form.Group>
        <Form.Label>To Address:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter recipient's address"
          onChange={(e) => setToAddr(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Amount:</Form.Label>
        <Form.Control
          type="number"
          placeholder="1,000,000 = 1 Aleo"
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Fee:</Form.Label>
        <Form.Control
          type="number"
          placeholder="1,000,000 = 1 Aleo"
          onChange={(e) => setFee(Number(e.target.value))}
        />
      </Form.Group>
      <Button onClick={handleTransfer}>Transfer Aleo Credits</Button>
    </div>
  );
};

export default App;
