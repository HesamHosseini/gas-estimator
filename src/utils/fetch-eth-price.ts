export async function fetchEthUsdPrice(): Promise<number> {
    const url = import.meta.env.VITE_ETH_PRICE_API;

    const res = await fetch(url);
    if (!res.ok) {
        throw new Error("Failed to fetch ETH/USD price from CoinGecko");
    }

    const data = await res.json();
    const price = data?.ethereum?.usd;

    if (typeof price !== "number") {
        throw new Error("Unexpected ETH price format");
    }

    return price;
}
