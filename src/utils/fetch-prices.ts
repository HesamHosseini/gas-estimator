interface EstimatedPrice {
    price: number; // gwei
    confidence?: number;
}
interface BlockPriceRow {
    baseFeePerGas?: number; // gwei
    estimatedPrices?: EstimatedPrice[];
}
interface BlocknativeResp {
    blockPrices?: BlockPriceRow[];
}

interface CoinbaseRatesResp {
    data?: {
        currency?: string;
        rates?: Record<string, string>;
    };
}

export async function fetchGasPriceGwei(apiKey: string): Promise<number> {
    const url = "https://api.blocknative.com/gasprices/blockprices";

    const res = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: apiKey,
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error(`Blocknative API error (${res.status})`);
    }

    const data = (await res.json()) as BlocknativeResp;
    const firstBlock = data.blockPrices?.[0];

    // 1️⃣ Prefer the highest-confidence estimated price
    const fromEstimate = firstBlock?.estimatedPrices?.[0]?.price;

    // 2️⃣ Fallback to the block’s base fee
    const fromBase = firstBlock?.baseFeePerGas;

    // 3️⃣ Final fallback to a safe default
    const priceGwei = fromEstimate ?? fromBase ?? 30;

    return priceGwei;
}

export async function fetchEthUsdPrice(): Promise<number> {
    const url = "https://api.coinbase.com/v2/exchange-rates?currency=ETH";

    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Coinbase API error (${res.status})`);
    }

    const data = (await res.json()) as CoinbaseRatesResp;
    const usdString = data.data?.rates?.USD;
    const usdNumber = usdString ? Number(usdString) : NaN;

    // Fallback ensures the UI keeps working even if the API schema changes
    const priceUsd = Number.isFinite(usdNumber) ? usdNumber : 3400;

    return priceUsd;
}
