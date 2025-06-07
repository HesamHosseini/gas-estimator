import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import { type Trait } from "@/data/traits";

type Props = {
    traits: Trait[];
    selectedTraits: Trait[];
    onChange: (traits: Trait[]) => void;
};

export function TraitSelector({ traits, selectedTraits, onChange }: Props) {
    return (
        <Card className="p-6 space-y-4 shadow-sm">
            <div className="space-y-2">
                <Label htmlFor="trait-selector" className="text-lg font-semibold">
                    Select Traits
                </Label>
                <MultiSelect
                    placeholder="Choose traits..."
                    items={traits.map((trait) => ({
                        label: trait.name,
                        value: trait.id,
                    }))}
                    selected={selectedTraits.map((trait) => trait.id)}
                    onChange={(selectedIds) => {
                        const newSelectedTraits = traits.filter((trait) => selectedIds.includes(trait.id));
                        onChange(newSelectedTraits);
                    }}
                />
            </div>
        </Card>
    );
}
