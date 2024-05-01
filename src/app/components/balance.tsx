import React, { useState, useEffect } from "react";
import {getBalance, GetBalanceReturnType} from "@wagmi/core";
import {config} from "@/wagmi";
import {Card} from "@material-tailwind/react";
import {SendTransaction} from "@/app/components/send-transaction";

export default function Balance({address} : {address: `0x${string}`}) {
  const [balance, setBalance] = useState<GetBalanceReturnType>();

  useEffect(() => {
    (async () => {
      const balance = await getBalance(config, {
        address
      });

      setBalance(balance)
    })();
  }, [address, balance]);

  return (
    <>
      <Card className="col-start-2 col-span-2 p-8">
        <table className="w-full min-w-max table-auto text-left">
          <tbody>
          <tr>
            <td>Address</td>
            <td>{address}</td>
          </tr>
          <tr>
            <td>Balance</td>
            <td>{balance?.formatted} {balance?.symbol}</td>
          </tr>
          </tbody>
        </table>

        <SendTransaction address={address}/>
      </Card>
    </>
  );
}
