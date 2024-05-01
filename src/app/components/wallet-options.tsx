import { useConnect } from "wagmi";
import { Button, ButtonGroup } from "@material-tailwind/react";
import React from "react";

export default function WalletOptions() {
  const { connectors, connect, status, error } = useConnect();
  return (
    <>
        <h2 className="text-3xl font-bold col-start-1 col-span-6 text-center">
          Connect
        </h2>

        {connectors.map((connector) => (
          <ButtonGroup className="col-start-2 col-span-2" key={connector.uid}>
            <Button
              className="w-full"
              key={connector.uid}
              onClick={() => connect({ connector })}
              type="button"
            >
              {connector.name}
            </Button>
          </ButtonGroup>
        ))}

        <span className="col-start-0 col-span-4 pt-10 text-center">
          Status: {status}
        </span>
        {error ? (
          <span className="col-start-0 col-span-4 pt-10 text-center">
            Error: {error.message}
          </span>
        ) : (
          ""
        )}
    </>
  );
}
