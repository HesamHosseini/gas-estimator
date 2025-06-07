import { type Trait } from "@/data/traits";

export function calculateEstimatedGas(selectedTraits: Trait[]): number {
    const base = 20000;
    const totalWeight = selectedTraits.reduce((sum, trait) => sum + trait.weight, 0);
    const combinationFactor = Math.pow(selectedTraits.length, 1.2);

    return Math.round(base * totalWeight * combinationFactor);
}
