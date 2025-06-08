import { ethers } from "ethers";

export async function getGasPriceGweiWithEthers(rpcUrl?: string, provider?: ethers.Provider): Promise<number> {
    const prov = provider ?? new ethers.JsonRpcProvider(rpcUrl ?? "https://ethereum.publicnode.com");

    const feeData = await prov.getFeeData();

    const wei = feeData.maxFeePerGas ?? feeData.gasPrice;

    if (!wei) throw new Error("Provider did not return a gas price.");

    return Number(ethers.formatUnits(wei, "gwei"));
}
