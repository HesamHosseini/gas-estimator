import { fetchEthUsdPrice } from "@/utils/fetch-eth-price";
import { fetchGasPriceGwei } from "@/utils/fetch-gas-price";
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
            const [gas, eth] = await Promise.all([fetchGasPriceGwei(), fetchEthUsdPrice()]);
            setGasPriceGwei(gas);
            setEthUsdPrice(eth);
            setError(null);
        } catch (err) {
            console.error("Error fetching prices", err);
            setError("Failed to fetch prices");
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
