export type Trait = {
    id: string;
    name: string;
    weight: number;
};

export const traits: Trait[] = [
    { id: "A", name: "Trait A - XOR", weight: 1.1 },
    { id: "B", name: "Trait B - AND", weight: 0.9 },
    { id: "C", name: "Trait C - Mapping Lookup", weight: 1.3 },
    { id: "D", name: "Trait D - Loop (5x)", weight: 2.5 },
    { id: "E", name: "Trait E - Hashing", weight: 2.0 },
];
