import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import { useForm } from 'react-hook-form';
import {type BaseError, useAccount, useSendTransaction, useWaitForTransactionReceipt} from 'wagmi'
import { parseEther} from 'viem';
import BlockChainAddressValid from '@/utils/BlockChainAddressValid';

interface ISendTransactionInput {
    address: string
    addressConfirm: string
    value: string
}

export function SendTransaction({address} : {address: `0x${string}`}) {
    const account = useAccount();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ISendTransactionInput>();

    const {
        data: hash,
        error,
        isPending,
        sendTransaction
    } = useSendTransaction();

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        })

    async function submit(formData: ISendTransactionInput) {
        const to = formData.address as `0x${string}`;
        const value = formData.value;

        sendTransaction({ account: address, to, value: parseEther(value) })
    }

    return (
        <Card color="transparent" className="mt-4" shadow={false}>
            <Typography variant="h5" color="blue-gray">
                Send Transaction
            </Typography>
            <form className="mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit(submit)}>
                <div className="mb-1 flex flex-col gap-6">
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Address
                    </Typography>
                    <Input
                        size="lg"
                        placeholder="0xA0Cf…251e"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        {...register('address',{ required: true,  validate: (input, formData) => {
                            if (!BlockChainAddressValid(input)) {
                                return 'address is not good format.';
                            }
                            if ((formData.address !== formData.addressConfirm)) {
                                return 'address and confirm address are not the same.';
                               }
                            }
                        })}
                    />
                    {errors.addressConfirm && <span className={`text-red-600`}>{errors.addressConfirm.message}</span>}
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Address Validation
                    </Typography>
                    <Input
                        size="lg"
                        placeholder="0xA0Cf…251e"
                        {...register('addressConfirm',{ required: true, validate: (input, formData) => {
                                if (!BlockChainAddressValid(input)) {
                                    return 'address is not good format.';
                                }
                                if ((formData.address !== formData.addressConfirm)) {
                                    return 'address and confirm address are not the same.';
                                }
                        }})}
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                    />
                    {errors.addressConfirm && <span className={`text-red-600`}>{errors.addressConfirm.message}</span>}

                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Value (ETH)
                    </Typography>
                    <Input
                        type="number"
                        size="lg"
                        placeholder="0.05"
                        {...register('value',{ required: true })}
                        step={0.01}
                        min={0}
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                    />
                    {errors.value && <span className={`text-red-600`}>value is required.</span>}
                </div>
                {hash && <div className="text-green-600 pt-2 pb-2">Transaction Hash: {hash}</div>}
                {isConfirming && <div>Waiting for confirmation...</div>}
                {isConfirmed && <div>Transaction confirmed.</div>}
                {error && (
                    <div className={`text-red-600`}>Error: {(error as BaseError).shortMessage || error.message}</div>
                )}
                <Button type="submit" loading={isPending} disabled={isPending} className="mt-6" fullWidth>
                    Send
                </Button>
            </form>
        </Card>
    );
}