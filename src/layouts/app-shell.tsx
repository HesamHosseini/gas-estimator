import { type PropsWithChildren } from "react";

export function AppShell({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-background text-foreground max-w-2xl  px-4 py-8 container mx-auto ">
            <div className="max-w-2xl mx-auto space-y-8">
                <header>
                    <h1 className="text-3xl font-bold text-primary">NFT Trait Gas Estimator</h1>
                </header>
                <main>{children}</main>
            </div>
        </div>
    );
}
