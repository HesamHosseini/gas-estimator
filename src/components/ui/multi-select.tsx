import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

type Option = {
    label: string;
    value: string;
};

type Props = {
    items: Option[];
    selected: string[];
    onChange: (values: string[]) => void;
    placeholder?: string;
    id?: string;
};

export function MultiSelect({ items, selected, onChange, placeholder = "Select items...", id }: Props) {
    const [open, setOpen] = React.useState(false);

    const handleSelect = (value: string) => {
        const isSelected = selected.includes(value);
        if (isSelected) {
            onChange(selected.filter((v) => v !== value));
        } else {
            onChange([...selected, value]);
        }
    };

    const selectedLabels = items
        .filter((item) => selected.includes(item.value))
        .map((item) => item.label)
        .join(", ");

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    id={id}
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between bg-card text-foreground border-border hover:bg-muted overflow-hidden"
                >
                    <span className="truncate max-w-[90%] text-left">{selected.length > 0 ? selectedLabels : placeholder}</span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                <Command>
                    <CommandList>
                        <CommandGroup>
                            {items.map((item) => {
                                const isSelected = selected.includes(item.value);
                                return (
                                    <CommandItem key={item.value} onSelect={() => handleSelect(item.value)} className="cursor-pointer">
                                        <Checkbox checked={isSelected} onCheckedChange={() => handleSelect(item.value)} className="mr-2" />
                                        {item.label}
                                        {isSelected && <Check className="ml-auto h-4 w-4 opacity-100" />}
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
