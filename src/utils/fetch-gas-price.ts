type BlocknativeGasResponse = {
    blockPrices: Array<{
        estimatedPrices: Array<{
            confidence: number;
            price: number; // gwei
            maxPriorityFeePerGas: number;
            maxFeePerGas: number;
        }>;
        baseFeePerGas: number;
        estimatedTransactionCount: number;
        blockNumber: number;
        blockTime: number;
        blockHash: string;
        estimatedPriceUSD: number; // This is ETH price in USD
    }>;
};

export async function fetchGasAndEthPrice(): Promise<{ gasPriceGwei: number; ethUsdPrice: number }> {
    const apiKey = import.meta.env.VITE_BLOCKNATIVE_API_KEY;
    const apiUrl = import.meta.env.VITE_BLOCKNATIVE_GAS_API;

    const res = await fetch(apiUrl, {
        headers: {
            Authorization: apiKey,
        },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch gas/ETH data from Blocknative");
    }

    const data: BlocknativeGasResponse = await res.json();
    const block = data.blockPrices?.[0];
    const gasPrice = block?.estimatedPrices?.[0]?.price;
    const ethUsdPrice = block?.estimatedPriceUSD;

    if (typeof gasPrice !== "number" || typeof ethUsdPrice !== "number") {
        throw new Error("Invalid data structure from Blocknative");
    }

    return {
        gasPriceGwei: gasPrice,
        ethUsdPrice,
    };
}
