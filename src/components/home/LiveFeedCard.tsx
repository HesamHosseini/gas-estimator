import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, DollarSign, Fuel } from "lucide-react";
import { LiveFeedSkeleton } from "./LiveFeedSkeleton";

interface Props {
    gasPriceGwei: number;
    ethPriceUsd: number;
    loading: boolean;
    updatedAt?: Date;
}

export const LiveFeedCard = ({ gasPriceGwei, ethPriceUsd, loading, updatedAt }: Props) => (
    <Card className="h-full shadow-xl backdrop-blur-md">
        <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <Fuel className="w-5 h-5" /> Live Gas & Price
            </CardTitle>
        </CardHeader>
        <CardContent>
            {loading ? (
                <LiveFeedSkeleton />
            ) : (
                <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-2">
                        <Fuel className="w-4 h-4 text-primary" />
                        Gas Price:&nbsp;
                        <span className="font-medium">{gasPriceGwei.toLocaleString()} gwei</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-primary" />
                        ETH / USD:&nbsp;
                        <span className="font-medium">${ethPriceUsd.toLocaleString()}</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        Updated at:&nbsp;
                        <span>{updatedAt?.toLocaleTimeString() ?? "—"}</span>
                    </li>
                </ul>
            )}
        </CardContent>
    </Card>
);
