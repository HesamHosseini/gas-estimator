// src/hooks/useGasAndPrice.ts
import { useEffect, useState } from "react";

type State = {
    gasPriceGwei: number | null;
    ethUsdPrice: number | null;
    loading: boolean;
    error: string | null;
};

export function useGasAndPrice(refreshInterval = 30000): State {
    const [gasPriceGwei, setGasPriceGwei] = useState<number | null>(null);
    const [ethUsdPrice, setEthUsdPrice] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPrices = async () => {
        try {
            setLoading(true);

            const res = await fetch(import.meta.env.VITE_GAS_API_URL, {
                headers: {
                    Authorization: import.meta.env.VITE_BLOCKNATIVE_API_KEY,
                },
            });

            if (!res.ok) throw new Error("Failed to fetch data from Blocknative");

            const data = await res.json();

            const gas = data.blockPrices?.[0]?.estimatedPrices?.[0]?.price;
            const eth = data.blockPrices?.[0]?.estimatedPrices?.[0]?.ethPriceUSD;

            if (typeof gas !== "number" || typeof eth !== "number") {
                throw new Error("Invalid response format");
            }

            setGasPriceGwei(gas);
            setEthUsdPrice(eth);
            setError(null);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
                setGasPriceGwei(null);
                setEthUsdPrice(null);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPrices();
        const interval = setInterval(fetchPrices, refreshInterval);
        return () => clearInterval(interval);
    }, [refreshInterval]);

    return {
        gasPriceGwei,
        ethUsdPrice,
        loading,
        error,
    };
}
