import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import type { Trait } from "@/utils/gas-estimator";
import { Info } from "lucide-react";

type EstimationResultProps = {
    result: {
        gasUnits: number;
        costEth: number;
        costUsd: number;
    } | null;
    selectedTraits: Trait[];
};

export function EstimationResult({ result, selectedTraits }: EstimationResultProps) {
    const isLoading = result === null && selectedTraits.length > 0;
    const isEmpty = selectedTraits.length === 0;

    return (
        <Card className="p-6 rounded-xl shadow-xl bg-card border border-border w-full min-h-[260px] flex flex-col justify-center">
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-primary tracking-tight">Estimation Summary</h2>
                {isEmpty ? null : (
                    <>
                        <Label className="text-muted-foreground text-sm">Selected Traits</Label>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {selectedTraits.map((trait) => (
                                <span key={trait.name} className="px-2 py-1 rounded bg-muted text-xs font-medium border border-border">
                                    {trait.name} <span className="text-muted-foreground">({trait.weight})</span>
                                </span>
                            ))}
                        </div>
                    </>
                )}
                {isEmpty ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground gap-2">
                        <Info className="w-8 h-8 mx-auto opacity-60" />
                        <div className="font-medium">No traits selected</div>
                        <div className="text-sm">Select one or more traits to see the gas estimation.</div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <ResultItem label="Estimated Gas">
                            {isLoading ? (
                                <Skeleton className="h-6 w-24 rounded-md" />
                            ) : (
                                <span>{result!.gasUnits.toLocaleString()} units</span>
                            )}
                        </ResultItem>
                        <ResultItem label="Cost in ETH">
                            {isLoading ? <Skeleton className="h-6 w-20 rounded-md" /> : <span>{result!.costEth.toFixed(6)} ETH</span>}
                        </ResultItem>
                        <ResultItem label="Cost in USD">
                            {isLoading ? <Skeleton className="h-6 w-20 rounded-md" /> : <span>${result!.costUsd.toFixed(2)}</span>}
                        </ResultItem>
                    </div>
                )}
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
