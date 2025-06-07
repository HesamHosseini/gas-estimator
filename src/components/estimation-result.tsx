import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
    gasUnits: number;
    gasPrice: number | null; // in gwei
    ethPrice: number | null; // in USD
};

export function EstimationResult({ gasUnits, gasPrice, ethPrice }: Props) {
    const isLoading = gasPrice === null || ethPrice === null;

    const gasInEth = !isLoading ? gasUnits * (gasPrice! / 1e9) : null;
    const gasInUsd = !isLoading && gasInEth !== null ? gasInEth * ethPrice! : null;

    return (
        <Card className="p-6 rounded-xl shadow-xl bg-card border border-border">
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-primary tracking-tight">Estimation Summary</h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Gas Units */}
                    <ResultItem label="Estimated Gas">
                        {isLoading ? <Skeleton className="h-6 w-24 rounded-md" /> : <span>{gasUnits.toLocaleString()} units</span>}
                    </ResultItem>

                    {/* ETH */}
                    <ResultItem label="Cost in ETH">
                        {isLoading ? <Skeleton className="h-6 w-20 rounded-md" /> : <span>{gasInEth!.toFixed(6)} ETH</span>}
                    </ResultItem>

                    {/* USD */}
                    <ResultItem label="Cost in USD">
                        {isLoading ? <Skeleton className="h-6 w-20 rounded-md" /> : <span>${gasInUsd!.toFixed(2)}</span>}
                    </ResultItem>
                </div>
            </div>
        </Card>
    );
}

function ResultItem({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col">
            <Label className="text-muted-foreground text-sm">{label}</Label>
            <div className="text-lg font-medium text-foreground">{children}</div>
        </div>
    );
}
