import EstimationResult from "@/components/estimation-results";
import TraitSelector from "@/components/trait-selector";
import { Skeleton } from "@/components/ui/skeleton";
import { type Trait } from "@/data/traits";
import { calculateEstimatedGas } from "@/utils/calculate-gas";
import { fetchEthUsdPrice } from "@/utils/fetch-eth-price";
import { fetchGasPriceGwei } from "@/utils/fetch-gas-price";
import { useEffect, useState } from "react";

export default function Home() {
    const [selectedTraits, setSelectedTraits] = useState<Trait[]>([]);
    const [gasPriceGwei, setGasPriceGwei] = useState<number | null>(null);
    const [ethUsdPrice, setEthUsdPrice] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [gas, eth] = await Promise.all([fetchGasPriceGwei(), fetchEthUsdPrice()]);
                setGasPriceGwei(gas);
                setEthUsdPrice(eth);
            } catch (error) {
                console.error("Error fetching gas or price:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const estimatedGas = calculateEstimatedGas(selectedTraits);

    return (
        <div className="space-y-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold">NFT Trait Gas Estimator</h1>
            <TraitSelector onChange={setSelectedTraits} />

            {loading ? (
                <Skeleton className="w-full h-32 rounded-lg" />
            ) : gasPriceGwei && ethUsdPrice && selectedTraits.length > 0 ? (
                <EstimationResult estimatedGas={estimatedGas} gasPriceGwei={gasPriceGwei} ethUsdPrice={ethUsdPrice} />
            ) : null}
        </div>
    );
}
