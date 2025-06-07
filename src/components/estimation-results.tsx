import { Card } from "@/components/ui/card";

type EstimationResultProps = {
    estimatedGas: number;
    gasPriceGwei: number; // e.g., 30
    ethUsdPrice: number; // e.g., 3700
};

export default function EstimationResult({ estimatedGas, gasPriceGwei, ethUsdPrice }: EstimationResultProps) {
    // Ensure that gasPriceGwei is provided in Gwei; otherwise, the calculation will be incorrect.
    if (gasPriceGwei <= 0) {
        throw new Error("gasPriceGwei must be a positive number and provided in Gwei.");
    }
    const costInEth = (estimatedGas * gasPriceGwei) / 1_000_000_000;
    const costInUsd = costInEth * ethUsdPrice;

    return (
        <Card className="p-4 space-y-2 mt-6">
            <h2 className="text-lg font-semibold mb-2">Estimation Result</h2>
            <div>
                Gas Units: <strong>{estimatedGas.toLocaleString()}</strong>
            </div>
            <div>
                Cost in ETH: <strong>{costInEth.toFixed(6)} ETH</strong>
            </div>
            <div>
                Cost in USD: <strong>${costInUsd.toFixed(2)}</strong>
            </div>
        </Card>
    );
}
