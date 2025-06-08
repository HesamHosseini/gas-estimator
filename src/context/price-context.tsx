import { createContext, useMemo, useState, type ReactNode } from "react";

type PriceContextType = {
    gasPriceGwei: number;
    ethPriceUsd: number;
    loading: boolean;
    updatedAt?: Date;
    setUpdatedAt: (date: Date) => void;
    setGasPriceGwei: (price: number) => void;
    setEthPriceUsd: (price: number) => void;
    setLoading: (loading: boolean) => void;
};

const PriceContext = createContext<PriceContextType>({
    gasPriceGwei: 30,
    ethPriceUsd: 3400,
    loading: false,
    updatedAt: undefined,
    setUpdatedAt: () => {},
    setGasPriceGwei: () => {},
    setEthPriceUsd: () => {},
    setLoading: () => {},
});

const PriceProvider = ({ children }: { children: ReactNode }) => {
    const [gasPriceGwei, setGasPriceGwei] = useState(30);
    const [ethPriceUsd, setEthPriceUsd] = useState(3400);
    const [loading, setLoading] = useState(false);
    const [updatedAt, setUpdatedAt] = useState<Date>();

    const value = useMemo(
        () => ({
            gasPriceGwei,
            ethPriceUsd,
            loading,
            updatedAt,
            setGasPriceGwei,
            setEthPriceUsd,
            setLoading,
            setUpdatedAt,
        }),
        [gasPriceGwei, ethPriceUsd, loading, updatedAt]
    );

    return <PriceContext.Provider value={value}>{children}</PriceContext.Provider>;
};

export { PriceContext, PriceProvider };
export type { PriceContextType };
