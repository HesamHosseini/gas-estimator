import { PriceContext } from "@/context/price-context";
import { fetchEthUsdPrice, fetchGasPriceGwei } from "@/utils/fetch-prices";
// import { getGasPriceGweiWithEthers } from "@/utils/fetch-prices-etherjs";
import { useContext, useEffect, type PropsWithChildren } from "react";

export function AppShell({ children }: PropsWithChildren) {
    const { setGasPriceGwei, setEthPriceUsd, setLoading, setUpdatedAt } = useContext(PriceContext);

    useEffect(() => {
        const fetchPrices = async () => {
            // const test = await getGasPriceGweiWithEthers();
            // console.log("Gas price from ethers:", test);
            setLoading(true);
            try {
                const tempGasPriceGwei = await fetchGasPriceGwei(import.meta.env.VITE_BLOCKNATIVE_API_KEY);
                const tempEthToUsd = await fetchEthUsdPrice();
                setGasPriceGwei(tempGasPriceGwei);
                setEthPriceUsd(tempEthToUsd);
                setUpdatedAt(new Date());
            } catch (e) {
                console.error("Failed to fetch prices", e);
            } finally {
                setLoading(false);
            }
        };

        fetchPrices();

        const interval = setInterval(fetchPrices, 30000);

        return () => clearInterval(interval);
    }, [setGasPriceGwei, setEthPriceUsd, setLoading, setUpdatedAt]);

    return (
        <div className="min-h-screen bg-background text-foreground   px-4 py-8 container mx-auto ">
            <main>{children}</main>
        </div>
    );
}
