export interface Trait {
    key: string;
    name: string;
    weight: number;
}

export const TRAITS: readonly Trait[] = [
    { key: "A", name: "XOR", weight: 1.1 },
    { key: "B", name: "AND", weight: 0.9 },
    { key: "C", name: "Mapping Lookup", weight: 1.3 },
    { key: "D", name: "Loop (5×)", weight: 2.5 },
    { key: "E", name: "Hashing", weight: 2.0 },
];

export interface GasEstimate {
    gasUnits: number;
    costEth: number;
    costUsd: number;
}

export function estimateGas(selected: Trait[], gasPriceGwei = 30, ethUsdPrice = 3_400): GasEstimate {
    const BASE_GAS_UNITS = 20_000; // “Base” in the spec
    const EXPONENT = 1.2; // Combination-factor power

    if (selected.length === 0) {
        return { gasUnits: 0, costEth: 0, costUsd: 0 };
    }

    // ✅ Sum weights only for the traits the user actually picked
    const weightSum = selected.reduce((sum, t) => sum + t.weight, 0);

    const combinationFactor = Math.pow(selected.length, EXPONENT);

    const gasUnits = BASE_GAS_UNITS * weightSum * combinationFactor;

    const costEth = (gasUnits * gasPriceGwei) / 1e9; // gwei → ETH
    const costUsd = costEth * ethUsdPrice;

    return { gasUnits, costEth, costUsd };
}
