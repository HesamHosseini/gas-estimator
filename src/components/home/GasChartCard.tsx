import GasBreakdownChart from "@/components/gas-breakdown-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Trait } from "@/utils/gas-estimator";

interface Props {
    selectedTraits: Trait[];
    gasPriceGwei: number;
    ethPriceUsd: number;
}

export const GasChartCard = ({ selectedTraits, gasPriceGwei, ethPriceUsd }: Props) => (
    <Card className="h-full shadow-xl backdrop-blur-md">
        <CardHeader>
            <CardTitle className="text-lg font-semibold text-center">Gas Breakdown Chart</CardTitle>
        </CardHeader>
        <CardContent className="h-80 p-0">
            <GasBreakdownChart selectedTraits={selectedTraits} gasPriceGwei={gasPriceGwei} ethUsdPrice={ethPriceUsd} />
        </CardContent>
    </Card>
);
