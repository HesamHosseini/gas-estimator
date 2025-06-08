import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useMemo } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { TRAITS, type Trait } from "@/utils/gas-estimator"; // Add this import

/**
 * GasBreakdownChart
 * --------------------------------------------------------------
 * Shows the relative gas usage of the **base overhead** plus each
 * selected trait, using the same formula as `estimateGas` so the
 * slices add up exactly to the total.
 *
 * Props
 * -----
 * - selectedTraits : Trait[]  – traits currently ticked
 * - gasPriceGwei   : number   – live / mocked gas price
 * - ethUsdPrice    : number   – live / mocked ETH→USD rate
 * --------------------------------------------------------------
 */
interface Props {
    selectedTraits: Trait[];
    gasPriceGwei: number;
    ethUsdPrice: number;
}

/* Additional colour for the base slice (muted grey) */
const COLORS = [
    "#6C757D", // base
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A28EF4",
];

export const GasBreakdownChart: React.FC<Props> = ({ selectedTraits, gasPriceGwei, ethUsdPrice }) => {
    const data = useMemo(() => {
        if (selectedTraits.length === 0) return [];

        const BASE = 20_000;
        const EXPONENT = 1.2;
        const n = selectedTraits.length;
        const combinationFactor = Math.pow(n, EXPONENT);

        const weightSum = TRAITS.reduce((sum, t) => sum + t.weight, 0);

        const totalGasUnits = Math.round(BASE * weightSum * combinationFactor);

        return selectedTraits.map((trait) => {
            const sliceUnits = Math.round((totalGasUnits * trait.weight) / weightSum);
            const sliceEth = (sliceUnits * gasPriceGwei) / 1e9;
            const sliceUsd = sliceEth * ethUsdPrice;

            return {
                name: trait.name,
                gasUnits: sliceUnits,
                costEth: sliceEth,
                costUsd: sliceUsd,
            };
        });
    }, [selectedTraits, gasPriceGwei, ethUsdPrice]);

    if (data.length === 0) {
        return (
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-center text-base">No traits selected</CardTitle>
                </CardHeader>
            </Card>
        );
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-center text-lg font-semibold">Gas Breakdown (Base vs. Traits)</CardTitle>
            </CardHeader>
            <CardContent className="h-80 p-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={data} dataKey="gasUnits" nameKey="name" innerRadius="50%" outerRadius="80%" paddingAngle={3}>
                            {data.map((_entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => `${value.toLocaleString()} gas`} />
                        <Legend verticalAlign="bottom" height={40} />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default GasBreakdownChart;
