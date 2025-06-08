import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { type GasEstimate, type Trait } from "@/utils/gas-estimator";
import { CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";
import { toast } from "sonner";

interface Props {
    selectedTraits: Trait[];
    gasEstimation: GasEstimate;
    children: ReactNode;
}

export const CheckoutDialog = ({ selectedTraits, gasEstimation, children }: Props) => (
    <AlertDialog>
        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    Confirm Your Composition
                </AlertDialogTitle>
                <AlertDialogDescription asChild>
                    <div className="space-y-4 text-sm">
                        <div>
                            <span className="font-medium">Selected traits:</span>
                            <ul className="list-disc list-inside ml-2 mt-1 space-y-1">
                                {selectedTraits.map((t) => (
                                    <li key={t.key}>{t.name}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <span>Estimated Gas:</span>
                            <span className="font-medium text-right">{gasEstimation.gasUnits.toLocaleString()} units</span>
                            <span>Cost (ETH):</span>
                            <span className="font-medium text-right">{gasEstimation.costEth.toFixed(6)} ETH</span>
                            <span>Cost (USD):</span>
                            <span className="font-medium text-right">${gasEstimation.costUsd.toFixed(2)}</span>
                        </div>
                    </div>
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                    onClick={() => {
                        toast.success("Transaction confirmed! ", {
                            duration: 3000,
                            position: "top-right",
                        });
                    }}
                >
                    Confirm
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
);
