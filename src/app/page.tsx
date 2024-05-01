"use client";

import React from "react";
import { ThemeProvider } from "@material-tailwind/react";
import ConnectWallet from "@/app/components/connect-wallet";
import {useAccountEffect} from "wagmi";
import { config } from "@/wagmi";

function App() {
    useAccountEffect({
        config,
        onConnect(data) {
            console.log('Connected!', data)
        },
        onDisconnect() {
            console.log('Disconnected!')
        },
    })

  return (
    <>
      <ThemeProvider>
        <ConnectWallet />
      </ThemeProvider>
    </>
  );
}

export default App;
