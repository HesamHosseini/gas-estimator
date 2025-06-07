export async function fetchGasPriceGwei(): Promise<number> {
    const apiKey = import.meta.env.VITE_BLOCKNATIVE_API_KEY;
    const apiUrl = import.meta.env.VITE_GAS_API_URL;

    const res = await fetch(apiUrl, {
        headers: {
            Authorization: apiKey,
        },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch gas price from Blocknative");
    }

    const data = await res.json();

    // Return the "standard" price from first block
    const price = data.blockPrices?.[0]?.estimatedPrices?.[0]?.price;

    if (typeof price !== "number") {
        throw new Error("Unexpected gas price format");
    }

    return price;
}
