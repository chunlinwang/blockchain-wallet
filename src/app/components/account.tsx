import React from "react";
import { Button, Card } from "@material-tailwind/react";
import { useAccount, useDisconnect } from "wagmi";
import Link from 'next/link';

export default function Account() {
  const account = useAccount();

  const { disconnect } = useDisconnect();

  return (
    <>
        <h2 className="text-3xl font-bold col-start-1 col-span-6 text-center">
          Account
        </h2>

        <Card className="col-start-2 col-span-2 p-10">
          <table className="w-full min-w-max table-auto text-left">
            <tbody>
              <tr>
                <td>status</td>
                <td>{account.status}</td>
              </tr>
              <tr>
                <td>addresses</td>
                <td>
                  <ul>
                    {account.addresses &&
                      account.addresses.map((address: `0x${string}`, i: number) => (
                        <li key={i}><Link href={`/balance/${address}`}> {address} </Link></li>
                      ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <td>chainId</td>
                <td>{account.chainId}</td>
              </tr>
              <tr>
                <td>Test Net</td>
                <td>{account.chain?.testnet ? "True" : "False"}</td>
              </tr>
            </tbody>
          </table>
        </Card>

        {account.status === "connected" && (
          <Button
            className="col-start-2 col-span-2"
            type="button"
            onClick={() => disconnect()}
          >
            Disconnect
          </Button>
        )}
    </>
  );
}
