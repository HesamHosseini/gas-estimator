import { useState } from "react";

import { EstimationResult } from "@/components/estimation-result";
import { LivePricePanel } from "@/components/live-price-panel";
import { TraitChart } from "@/components/trait-chart";
import { TraitSelector } from "@/components/trait-selector";
import { AppShell } from "@/layouts/app-shell";

import { traits } from "@/data/traits";
import { useGasAndPrice } from "@/hooks/useGasAndPrice";
import { useGasEstimation } from "@/hooks/useGasEstimation";

export default function HomePage() {
    const [selectedTraits, setSelectedTraits] = useState<typeof traits>([]);

    const gasUnits = useGasEstimation(selectedTraits);
    const { gasPriceGwei, ethUsdPrice } = useGasAndPrice();

    return (
        <AppShell>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Sidebar: Live price panel */}
                <aside className="md:col-span-1">
                    <LivePricePanel />
                </aside>

                {/* Main content */}
                <section className="md:col-span-3 space-y-6">
                    <TraitSelector traits={traits} selectedTraits={selectedTraits} onChange={setSelectedTraits} />
                    <EstimationResult gasUnits={gasUnits} gasPrice={gasPriceGwei} ethPrice={ethUsdPrice} />
                    <TraitChart selectedTraits={selectedTraits} />
                </section>
            </div>
        </AppShell>
    );
}
