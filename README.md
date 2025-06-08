# NFT Trait Gas Estimator

A lightweight **React + Vite** dApp that lets users combine NFT traits, instantly **simulate** the on‑chain gas cost, and review a detailed gas‑breakdown—without broadcasting a transaction.

---

## ✨ Main Features

| Feature          | Details                                                                                    |
| ---------------- | ------------------------------------------------------------------------------------------ |
| Trait composer   | Multi‑select any subset of traits (XOR, AND, Loop, Hash…) and see live cost.               |
| Pure math model  | Formula: `Base (20 000) × Σweights × n^1.2` → gas units → ETH → USD.                       |
| Live pricing     | Fetches gas price from **Blocknative** (or ethers fallback) and ETH/USD from **Coinbase**. |
| Visual breakdown | Doughnut chart (Recharts) shows per‑trait gas share + fixed base.                          |
| Componentised UI | shadcn/ui + Tailwind, split into reusable cards + dialog.                                  |

---

## 🛠 Tech Stack

| Layer | Tools                                                              |
| ----- | ------------------------------------------------------------------ |
| Build | **Vite** + React 18 + TypeScript                                   |
| UI    | Tailwind CSS, shadcn/ui, Recharts, Framer Motion, Lucide Icons     |
| Data  | ethers.js (provider only), Blocknative Gas API, Coinbase rates API |

---

## 📂 Key Folder Structure

```
src/
├─ components/
│  ├─ home/
│  │  ├─ LiveFeedCard.tsx
│  │  ├─ TraitComposerCard.tsx
│  │  ├─ CheckoutDialog.tsx
│  │  ├─ GasChartCard.tsx
│  │  └─ LiveFeedSkeleton.tsx
│  ├─ estimation-result/
│  └─ gas-breakdown-chart/
├─ context/
│  └─ price-context.tsx        # global gas & price polling
├─ layouts/
│  └─ app-shell.tsx            # navbar / footer wrapper
├─ utils/
│  ├─ gas-estimator.ts         # pure math logic
│  ├─ gas-price-blocknative.ts # fetchGasPriceGwei()
│  └─ eth-usd-price.ts         # fetchEthUsdPrice()
└─ pages/
   └─ HomePage.tsx
```

---

## 🧮 Gas Estimation Formula

```
EstimatedGas = BASE × (Σ weights) × (n ^ 1.2)
BASE         = 20,000 gas units
n            = number of selected traits
```

1. Sum weights of selected traits.
2. Apply super‑linear penalty `(n^1.2)`.
3. Multiply by base (20 000) → **gas units**.
4. Convert to ETH (`units × gwei / 1e9`) and to USD (`× ETH/USD`).

---

## 🚀 Getting Started

```bash
# Install deps
pnpm install   # or yarn / npm

# Run local dev server (Vite)
pnpm dev       # http://localhost:5173

# Build for production
pnpm build
```

> Ensure you have `.env` variables if you plan to hit real Blocknative / Coinbase endpoints:
>
> ```env
> VITE_BLOCKNATIVE_KEY=your_key_here
> ```
