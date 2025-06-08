import { useContext, useMemo, useState } from "react";

import { GasChartCard, LiveFeedCard, TraitComposerCard } from "@/components/home";
import { PriceContext } from "@/context/price-context";
import { AppShell } from "@/layouts/app-shell";
import { TRAITS, estimateGas, type Trait } from "@/utils/gas-estimator";

export default function HomePage() {
    const { gasPriceGwei, ethPriceUsd, loading, updatedAt } = useContext(PriceContext);
    const [selectedTraits, setSelectedTraits] = useState<Trait[]>([]);

    const gasEstimation = useMemo(
        () => estimateGas(selectedTraits, gasPriceGwei, ethPriceUsd),
        [selectedTraits, gasPriceGwei, ethPriceUsd]
    );

    return (
        <AppShell>
            <div className="container mx-auto px-4 py-6">
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    <LiveFeedCard gasPriceGwei={gasPriceGwei} ethPriceUsd={ethPriceUsd} loading={loading} updatedAt={updatedAt} />
                    <TraitComposerCard
                        selectedTraits={selectedTraits}
                        onTraitChange={(names) =>
                            setSelectedTraits(names.map((n) => TRAITS.find((t) => t.name === n)).filter(Boolean) as Trait[])
                        }
                        gasEstimation={gasEstimation}
                    />
                    <GasChartCard selectedTraits={selectedTraits} gasPriceGwei={gasPriceGwei} ethPriceUsd={ethPriceUsd} />
                </div>
            </div>
        </AppShell>
    );
}
