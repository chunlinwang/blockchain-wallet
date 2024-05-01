'use client';

import React from "react";
import {Typography, Card} from "@material-tailwind/react";

export default function NotFound() {
    return (
        <>
            <h2 className="text-3xl font-bold col-start-1 col-span-6 text-center">
                Not Found
            </h2>
            <Card className="col-start-2 col-span-2 p-10">
                <Typography variant="p" color="blue-gray">
                    Could not find requested resource
                </Typography>
            </Card>
        </>
    )
}