import { EstimationResult } from "@/components/estimation-result";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MultiSelect } from "@/components/ui/multi-select";
import { TRAITS, type GasEstimate, type Trait } from "@/utils/gas-estimator";
import { CheckoutDialog } from "./CheckoutDialog";

interface Props {
    selectedTraits: Trait[];
    onTraitChange: (names: string[]) => void;
    gasEstimation: GasEstimate;
}

export const TraitComposerCard = ({ selectedTraits, onTraitChange, gasEstimation }: Props) => (
    <Card className="h-full shadow-xl backdrop-blur-md flex flex-col">
        <CardHeader>
            <CardTitle className="text-lg font-semibold text-center">Compose Traits & Estimate</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
                <MultiSelect
                    placeholder="Select traits…"
                    items={TRAITS.map((t) => ({
                        value: t.name,
                        label: (
                            <div className="flex items-center gap-2">
                                <span>{t.name}</span>
                                <span className="text-xs text-muted-foreground">({t.weight})</span>
                            </div>
                        ),
                    }))}
                    selected={selectedTraits.map((t) => t.name)}
                    onChange={onTraitChange}
                />

                <EstimationResult result={gasEstimation} selectedTraits={selectedTraits} />
            </div>

            <CheckoutDialog selectedTraits={selectedTraits} gasEstimation={gasEstimation}>
                <Button variant="default" className="w-full" disabled={!selectedTraits.length}>
                    Review Transaction
                </Button>
            </CheckoutDialog>
        </CardContent>
    </Card>
);
