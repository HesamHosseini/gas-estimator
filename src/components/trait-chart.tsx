import { Card } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { type Trait } from "@/data/traits";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis } from "recharts";

type Props = {
    selectedTraits: Trait[];
};

export function TraitChart({ selectedTraits }: Props) {
    if (!selectedTraits || selectedTraits.length === 0) return null;

    const chartData = selectedTraits.map((trait) => ({
        name: trait.name,
        value: trait.weight,
    }));

    const chartConfig = {
        value: {
            label: "Gas Weight",
            color: "var(--chart-1)",
        },
    };

    return (
        <Card className="p-6 w-full">
            <h2 className="text-xl font-semibold mb-4">Trait Gas Weight Breakdown</h2>
            <ChartContainer className="h-[300px]" config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="value" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </ChartContainer>
        </Card>
    );
}
