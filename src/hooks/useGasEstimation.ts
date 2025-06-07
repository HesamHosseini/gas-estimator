import { type Trait } from "@/data/traits";
import { useMemo } from "react";

export function useGasEstimation(selectedTraits: Trait[]) {
    return useMemo(() => {
        if (selectedTraits.length === 0) return 0;

        const BASE_GAS = 20000;
        const combinationFactor = Math.pow(selectedTraits.length, 1.2);
        const totalWeight = selectedTraits.reduce((acc, trait) => acc + trait.weight, 0);

        const estimatedGas = Math.round(BASE_GAS * totalWeight * combinationFactor);
        return estimatedGas;
    }, [selectedTraits]);
}
