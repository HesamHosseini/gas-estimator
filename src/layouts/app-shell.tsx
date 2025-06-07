import { type PropsWithChildren } from "react";

export default function AppShell({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-background text-foreground px-6 py-8">
            <div className="max-w-2xl mx-auto space-y-8">
                <header>
                    <h1 className="text-3xl font-bold text-primary">NFT Trait Gas Estimator</h1>
                </header>
                <main>{children}</main>
            </div>
        </div>
    );
}
