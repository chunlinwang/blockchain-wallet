"use client";

import React from "react";
import Balance from "@/app/components/balance";

export default function BalancePage({params}: {params: {address: `0x${string}`}}) {
    return (
    <>
        <h2 className="text-3xl font-bold col-start-1 col-span-6 text-center">
          Balance
        </h2>
        <Balance address={params.address}/>
    </>
  );
};
