
const blockChainAddressValidRegex: RegExp = /^0x[a-zA-Z0-9]{40}/g;

export default function (address: string): boolean {
    return (address.match(blockChainAddressValidRegex) !== null);
}