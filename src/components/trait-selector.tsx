import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import { type Trait, traits } from "@/data/traits";
import { useState } from "react";

type TraitSelectorProps = {
    onChange: (selected: Trait[]) => void;
};

export default function TraitSelector({ onChange }: TraitSelectorProps) {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const handleChange = (ids: string[]) => {
        setSelectedIds(ids);
        const selectedTraits = traits.filter((trait) => ids.includes(trait.id));
        onChange(selectedTraits);
    };

    return (
        <Card className="p-4 space-y-4">
            <div className="space-y-1">
                <Label htmlFor="trait-select">Select Traits</Label>
                <MultiSelect
                    options={traits.map((trait) => ({
                        value: trait.id,
                        label: `${trait.name} (${trait.weight})`,
                    }))}
                    value={selectedIds}
                    onChange={handleChange}
                    placeholder="Choose traits"
                />
            </div>
        </Card>
    );
}
