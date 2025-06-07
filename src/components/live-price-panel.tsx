// src/components/live-price-panel.tsx
import { Button } from "@/components/ui/button";
import { useGasAndPrice } from "@/hooks/useGasAndPrice";
import { RefreshCcw } from "lucide-react";

export function LivePricePanel() {
    const { gasPriceGwei, loading, error } = useGasAndPrice();

    return (
        <div className="border p-4 rounded-lg bg-card shadow space-y-2">
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg">Live Gas Price</h2>
                <Button size="icon" variant="outline" onClick={() => window.location.reload()}>
                    <RefreshCcw className="w-4 h-4" />
                </Button>
            </div>
            {loading ? (
                <p className="text-sm text-muted-foreground">Loading...</p>
            ) : error ? (
                <p className="text-sm text-red-500">Error: {error}</p>
            ) : (
                <p className="text-2xl font-bold">{gasPriceGwei} Gwei</p>
            )}
        </div>
    );
}
