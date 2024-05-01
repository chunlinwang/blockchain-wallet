import { useAccount } from "wagmi";
import Account from "@/app/components/account";
import WalletOptions from "@/app/components/wallet-options";

export default function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;
}
