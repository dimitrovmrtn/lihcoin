import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import lihHero from "@/assets/lih-hero.png.asset.json";

const CA = "B2xetuWUZWdhqEvZ25ATSPmyG4hKhEoJgqtq8j4Bpump";
const DEX_URL = `https://dexscreener.com/solana/${CA}`;
const PUMP_URL = `https://pump.fun/coin/${CA}`;
const X_COMMUNITY = "https://x.com/i/communities/2037101099207803036";

export const Route = createFileRoute("/")({
  component: Home,
});

function Btn({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center px-6 py-3 rounded-full font-display text-sm border-[3px] border-[var(--ink)] shadow-[6px_6px_0_0_var(--ink)] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_0_var(--ink)] active:translate-x-0 active:translate-y-0 active:shadow-[3px_3px_0_0_var(--ink)]";
  const styles =
    variant === "primary"
      ? "bg-primary text-primary-foreground"
      : "bg-card text-foreground";
  return (
    <a href={href} target="_blank" rel="noreferrer" className={`${base} ${styles} ${className}`}>
      {children}
    </a>
  );
}

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Tokenomics />
      <Chart />
      <HowToBuy />
      <Community />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="border-b-[3px] border-[var(--ink)] bg-background/90 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary border-[3px] border-[var(--ink)] shadow-[3px_3px_0_0_var(--ink)]" />
          <span className="font-display text-2xl tracking-wide">LIH</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 font-display text-sm">
          <a href="#tokenomics" className="hover:text-accent">TOKENOMICS</a>
          <a href="#howtobuy" className="hover:text-accent">HOW TO BUY</a>
          <a href="#chart" className="hover:text-accent">CHART</a>
          <a href="#community" className="hover:text-accent">COMMUNITY</a>
        </nav>
        <Btn href={PUMP_URL}>BUY $LIH</Btn>
      </div>
    </header>
  );
}

function Hero() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CA);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };
  return (
    <section id="top" className="max-w-7xl mx-auto px-6 pt-16 pb-24">
      <div className="text-center mb-10">
        <span className="inline-block px-4 py-2 rounded-full bg-primary border-[3px] border-[var(--ink)] font-display text-xs shadow-[4px_4px_0_0_var(--ink)]">
          SOLANA · PUMP.FUN
        </span>
      </div>
      <div className="grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl leading-[0.95]">
          THE LIZARD<br />KING OF{" "}
          <span className="relative inline-block">
            <span className="relative z-10 px-2">CRYPTO</span>
            <span className="absolute inset-0 bg-primary -rotate-2 rounded-md" aria-hidden />
          </span>{" "}
          <span className="inline-block">⚡</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-lg">
          $LIH is powered by <span className="font-semibold text-foreground">@venusvaranus</span> — the viral social media lizard whose big-eyed stares broke the algorithm. Early lizard-coin vibes, endless reaction potential, one very handsome reptile.
        </p>
      </div>
      <div className="relative">
        <div className="rounded-3xl overflow-hidden border-[3px] border-[var(--ink)] shadow-[10px_10px_0_0_var(--ink)] rotate-1">
          <img
            src={lihHero.url}
            alt="LIH lizard mascot glowing with golden neon outline"
            width={1024}
            height={1024}
            className="w-full h-auto block"
          />
        </div>
        <div className="absolute -bottom-5 -left-5 px-4 py-2 rounded-full bg-accent text-accent-foreground border-[3px] border-[var(--ink)] font-display text-sm shadow-[4px_4px_0_0_var(--ink)] -rotate-6">
          10/10 COLD BLOODED
        </div>
      </div>
    </div>
    <div className="mt-12 flex flex-col items-center gap-6">
      <div className="flex flex-wrap justify-center gap-4">
        <Btn href={DEX_URL}>BUY ON DEXSCREENER →</Btn>
        <Btn href={X_COMMUNITY} variant="ghost">JOIN X COMMUNITY</Btn>
      </div>
      <div className="w-full max-w-2xl rounded-2xl border-[3px] border-[var(--ink)] bg-card shadow-[6px_6px_0_0_var(--ink)] p-5">
        <div className="text-xs font-display text-muted-foreground mb-2">CONTRACT ADDRESS</div>
        <div className="flex items-center gap-3">
          <code className="flex-1 truncate text-sm md:text-base font-mono">{CA}</code>
          <button
            onClick={copy}
            className="shrink-0 px-4 py-2 rounded-full bg-primary border-[3px] border-[var(--ink)] font-display text-xs shadow-[3px_3px_0_0_var(--ink)] hover:-translate-y-0.5 transition"
          >
            {copied ? "COPIED!" : "COPY CA"}
          </button>
        </div>
      </div>
    </div>
    </section>
  );
}

type Stats = {
  priceUsd?: string;
  marketCap?: number;
  volume24?: number;
  liquidity?: number;
  buys?: number;
  sells?: number;
  h1?: number;
  h24?: number;
};

function Tokenomics() {
  const [stats, setStats] = useState<Stats>({});
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${CA}`);
      const j = await res.json();
      const p = j.pairs?.[0];
      if (p) {
        setStats({
          priceUsd: p.priceUsd,
          marketCap: p.marketCap ?? p.fdv,
          volume24: p.volume?.h24,
          liquidity: p.liquidity?.usd,
          buys: p.txns?.h24?.buys,
          sells: p.txns?.h24?.sells,
          h1: p.priceChange?.h1,
          h24: p.priceChange?.h24,
        });
      }
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    load();
    const i = setInterval(load, 15000);
    return () => clearInterval(i);
  }, []);

  const fmtUsd = (n?: number) =>
    n === undefined
      ? "—"
      : n >= 1_000_000
      ? `$${(n / 1_000_000).toFixed(2)}M`
      : n >= 1_000
      ? `$${(n / 1_000).toFixed(2)}K`
      : `$${n.toFixed(2)}`;

  const Change = ({ v }: { v?: number }) =>
    v === undefined ? (
      <span className="text-muted-foreground">—</span>
    ) : (
      <span className={v >= 0 ? "text-emerald-600" : "text-destructive"}>
        {v >= 0 ? "▲" : "▼"} {Math.abs(v).toFixed(2)}%
      </span>
    );

  const cards: { label: string; value: React.ReactNode }[] = [
    { label: "PRICE (USD)", value: stats.priceUsd ? `$${Number(stats.priceUsd).toPrecision(4)}` : "—" },
    { label: "MARKET CAP", value: fmtUsd(stats.marketCap) },
    { label: "24H VOLUME", value: fmtUsd(stats.volume24) },
    { label: "LIQUIDITY", value: fmtUsd(stats.liquidity) },
    { label: "24H BUYS / SELLS", value: `${stats.buys ?? "—"} / ${stats.sells ?? "—"}` },
    { label: "1H CHANGE", value: <Change v={stats.h1} /> },
  ];

  return (
    <section id="tokenomics" className="border-t-[3px] border-[var(--ink)] bg-[oklch(0.94_0.08_140)]">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div>
            <h2 className="font-display text-5xl md:text-6xl">TOKENOMICS</h2>
            <p className="mt-2 text-muted-foreground">Live from Dexscreener · auto-refresh every 15s</p>
          </div>
          <button
            onClick={load}
            disabled={loading}
            className="px-5 py-3 rounded-full bg-primary border-[3px] border-[var(--ink)] font-display text-sm shadow-[4px_4px_0_0_var(--ink)] hover:-translate-y-0.5 transition disabled:opacity-60"
          >
            {loading ? "LOADING…" : "REFRESH"}
          </button>
        </div>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((c) => (
            <div key={c.label} className="rounded-2xl border-[3px] border-[var(--ink)] bg-card p-6 shadow-[6px_6px_0_0_var(--ink)]">
              <div className="font-display text-xs text-muted-foreground">{c.label}</div>
              <div className="mt-3 font-display text-3xl">{c.value}</div>
            </div>
          ))}
        </div>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {[
            { t: "1B SUPPLY", d: "Fair-launched on pump.fun. No team allocation, no VC unlocks." },
            { t: "0% TAX", d: "No buy or sell tax. Just vibes and viral clips." },
            { t: "LP BURNED", d: "Liquidity locked & burned via pump.fun mechanics." },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl border-[3px] border-[var(--ink)] bg-primary p-6 shadow-[6px_6px_0_0_var(--ink)]">
              <div className="font-display text-2xl">{x.t}</div>
              <p className="mt-2 text-sm">{x.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Chart() {
  return (
    <section id="chart" className="border-t-[3px] border-[var(--ink)]">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="font-display text-5xl md:text-6xl">LIVE CHART</h2>
        <p className="mt-2 text-muted-foreground">DEX Screener</p>
        <div className="mt-8 rounded-2xl overflow-hidden border-[3px] border-[var(--ink)] shadow-[8px_8px_0_0_var(--ink)] bg-card">
          <iframe
            title="Dexscreener chart"
            src={`https://dexscreener.com/solana/${CA}?embed=1&theme=light&trades=0&info=0`}
            className="w-full h-[560px] block"
          />
        </div>
        <div className="mt-4 flex justify-end">
          <a href={DEX_URL} target="_blank" rel="noreferrer" className="font-display text-sm underline hover:text-accent">
            Open on Dexscreener ↗
          </a>
        </div>
      </div>
    </section>
  );
}

function HowToBuy() {
  const steps = [
    { t: "Get a Solana Wallet", d: "Download Phantom or Solflare. Set up a fresh wallet and back up your seed phrase." },
    { t: "Fund with SOL", d: "Buy SOL on any exchange (Coinbase, Binance, etc.) and send it to your wallet address." },
    { t: "Open the Chart", d: "Head to Dexscreener or pump.fun and paste the LIH contract address to find the token." },
    { t: "Swap for $LIH", d: "Connect wallet, set slippage to ~2–5%, confirm the swap. Welcome to the pond." },
  ];
  return (
    <section id="howtobuy" className="border-t-[3px] border-[var(--ink)] bg-[oklch(0.94_0.08_140)]">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="font-display text-5xl md:text-6xl">HOW TO BUY</h2>
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {steps.map((s, i) => (
            <div key={s.t} className="rounded-2xl border-[3px] border-[var(--ink)] bg-card p-6 shadow-[6px_6px_0_0_var(--ink)] flex gap-5">
              <div className="w-14 h-14 shrink-0 rounded-full bg-primary border-[3px] border-[var(--ink)] flex items-center justify-center font-display text-xl">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="font-display text-2xl">{s.t}</h3>
                <p className="mt-2 text-muted-foreground">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Btn href={PUMP_URL}>BUY ON PUMP.FUN</Btn>
          <Btn href={DEX_URL} variant="ghost">OPEN DEXSCREENER</Btn>
        </div>
      </div>
    </section>
  );
}

function Community() {
  return (
    <section id="community" className="border-t-[3px] border-[var(--ink)]">
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h2 className="font-display text-5xl md:text-7xl">JOIN THE POND</h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          The Lih community lives on X and Instagram. Post memes, share clips, and watch the algorithm do the rest.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Btn href={X_COMMUNITY}>X COMMUNITY</Btn>
          <Btn href="https://www.instagram.com/reels/DbHJeW4B9Yi/" variant="ghost">INSTAGRAM</Btn>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t-[3px] border-[var(--ink)] py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
        <span>© {new Date().getFullYear()} $LIH · Memecoin. Not financial advice.</span>
        <span className="font-display">COLD BLOODED 10/10</span>
      </div>
    </footer>
  );
}
