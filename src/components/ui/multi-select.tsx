import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import * as React from "react";
import { Button } from "./button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

type Option = {
    label: string;
    value: string;
};

type Props = {
    options: Option[];
    value: string[];
    onChange: (value: string[]) => void;
    placeholder?: string;
};

export function MultiSelect({ options, value, onChange, placeholder = "Select..." }: Props) {
    const [open, setOpen] = React.useState(false);

    const toggleOption = (val: string) => {
        if (value.includes(val)) {
            onChange(value.filter((v) => v !== val));
        } else {
            onChange([...value, val]);
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" className="w-full justify-between">
                    {value.length > 0 ? `${value.length} selected` : placeholder}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Search traits..." />
                    <CommandEmpty>No item found.</CommandEmpty>
                    <CommandGroup>
                        {options.map((option) => (
                            <CommandItem key={option.value} onSelect={() => toggleOption(option.value)}>
                                <div
                                    className={cn(
                                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                        value.includes(option.value) ? "bg-primary text-white" : "bg-background"
                                    )}
                                >
                                    {value.includes(option.value) && <Check className="h-3.5 w-3.5" />}
                                </div>
                                {option.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
