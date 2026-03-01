import { useState } from "react";
import { Copy, Check } from "lucide-react";

const Navbar = () => (
  <nav className="border-b border-border">
    <div className="container flex items-center justify-between h-14">
      <a href="/" className="font-mono font-bold text-lg tracking-tight">
        db9
      </a>
      <div className="hidden md:flex items-center gap-8">
        <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
        <a href="#commands" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Commands</a>
        <a href="https://staging.db9.ai" target="_blank" rel="noopener" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Docs</a>
        <a
          href="#get-started"
          className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-1.5 text-sm font-mono font-medium hover:opacity-90 transition-opacity"
        >
          Get Started
        </a>
      </div>
    </div>
  </nav>
);

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="text-muted-foreground hover:text-foreground transition-colors p-1"
      aria-label="Copy"
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
    </button>
  );
};

const HeroSection = () => (
  <section className="py-24 md:py-32">
    <div className="container max-w-3xl">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] text-balance">
        Postgres<br />but <span className="text-muted-foreground">for agents</span>
      </h1>
      <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed font-sans">
        Create, manage, and query serverless PostgreSQL databases from your terminal. Branching, migrations, observability, type generation — all built in.
      </p>

      <div className="mt-12 grid md:grid-cols-2 gap-4">
        <div className="border border-border rounded-md p-4">
          <div className="text-xs font-mono font-semibold tracking-widest uppercase text-muted-foreground mb-3">CLI</div>
          <div className="flex items-center gap-2">
            <code className="text-sm font-mono flex-1 break-all">
              <span className="text-muted-foreground">$</span> curl -fsSL https://db9.ai/install | sh
            </code>
            <CopyButton text="curl -fsSL https://db9.ai/install | sh" />
          </div>
          <p className="text-xs text-muted-foreground mt-2 font-sans">macOS / Linux (x86_64, arm64)</p>
        </div>

        <div className="border border-border rounded-md p-4">
          <div className="text-xs font-mono font-semibold tracking-widest uppercase text-muted-foreground mb-3">AI Agents</div>
          <div className="flex items-center gap-2">
            <code className="text-sm font-mono flex-1 break-all">
              Read <span className="underline">https://db9.ai/skill.md</span> and follow the instructions
            </code>
            <CopyButton text="Read https://db9.ai/skill.md and follow the instructions" />
          </div>
          <p className="text-xs text-muted-foreground mt-2 font-sans">Your agent learns to install, auth, and use db9 autonomously</p>
        </div>
      </div>
    </div>
  </section>
);

const terminalLines = [
  { type: "comment", text: "// Create a database with vector support" },
  { type: "command", text: "$ db9 db create --name rag-app" },
  { type: "output", text: "Database created: abc123" },
  { type: "spacer" },
  { type: "comment", text: "// Upload docs to cloud filesystem (for RAG)" },
  { type: "command", text: "$ db9 fs cp ./docs/ abc123:/knowledge/" },
  { type: "output", text: "Uploaded 42 files to /knowledge/" },
  { type: "spacer" },
  { type: "comment", text: "// Create embeddings table with pgvector" },
  { type: "command", text: '$ db9 db sql abc123 -q "CREATE TABLE docs ( id serial PRIMARY KEY, content text, embedding vector(1536), metadata jsonb)"' },
  { type: "output", text: "CREATE TABLE" },
  { type: "spacer" },
  { type: "comment", text: "// Semantic search with cosine similarity" },
  { type: "command", text: '$ db9 db sql abc123 -q "SELECT content, 1 - (embedding <=> $1) AS score FROM docs ORDER BY embedding <=> $1 LIMIT 3"' },
  { type: "table-header", text: "content                              score" },
  { type: "table-divider", text: "──────────────────────────────────── ─────" },
  { type: "table-row", text: "Authentication uses JWT tokens...     0.94" },
  { type: "table-row", text: "API rate limits are per-customer...   0.87" },
  { type: "table-row", text: "Webhooks require HTTPS endpoints...   0.82" },
  { type: "output", text: "(3 rows)" },
];

const TerminalSection = () => (
  <section className="py-16">
    <div className="container max-w-3xl">
      <div className="rounded-lg overflow-hidden border border-border bg-terminal">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border/20">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-terminal-accent/40" />
            <div className="w-3 h-3 rounded-full bg-terminal-accent/40" />
            <div className="w-3 h-3 rounded-full bg-terminal-accent/40" />
          </div>
          <span className="text-xs font-mono text-terminal-accent mx-auto">db9</span>
        </div>
        <div className="p-5 overflow-x-auto">
          <pre className="text-sm leading-6">
            {terminalLines.map((line, i) => {
              if (line.type === "spacer") return <div key={i} className="h-3" />;
              if (line.type === "comment") return <div key={i} className="text-terminal-accent">{line.text}</div>;
              if (line.type === "command") return <div key={i} className="text-terminal-highlight">{line.text}</div>;
              if (line.type === "output") return <div key={i} className="text-terminal-foreground">{line.text}</div>;
              if (line.type === "table-header") return <div key={i} className="text-terminal-foreground">{line.text}</div>;
              if (line.type === "table-divider") return <div key={i} className="text-terminal-accent">{line.text}</div>;
              if (line.type === "table-row") return <div key={i} className="text-terminal-foreground">{line.text}</div>;
              return null;
            })}
          </pre>
        </div>
      </div>
    </div>
  </section>
);

const features = [
  { title: "Instant databases", desc: "Spin up a serverless Postgres instance in seconds. No provisioning, no config files." },
  { title: "Vector search", desc: "pgvector built-in with HNSW indexes. Semantic search, RAG, and embeddings — no external vector DB needed." },
  { title: "SQL from CLI", desc: "Execute queries inline, from files, or pipe from stdin. Output as table, JSON, or CSV." },
  { title: "Database branching", desc: "Create schema branches for testing and development. Isolated environments in one command." },
  { title: "Built-in observability", desc: "Inspect QPS, latency, slow queries, and connection metrics without external tools." },
  { title: "Migration management", desc: "Create, apply, and track SQL migrations. Integrated status tracking per database." },
  { title: "Type generation", desc: "Generate TypeScript or Python types from your database schema automatically." },
  { title: "JSONB + GIN indexes", desc: "Store and query semi-structured data with lightning-fast GIN indexes. Perfect for agent memory and tool outputs." },
  { title: "Dump & seed", desc: "Export schemas and data as SQL. Seed databases from files for reproducible environments." },
  { title: "Cloud filesystem", desc: "Read, write, and manage files per database via the SDK or interactive shell. Built for RAG pipelines." },
];

const FeaturesSection = () => (
  <section id="features" className="py-24 border-t border-border">
    <div className="container max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Everything you need</h2>
      <p className="mt-3 text-muted-foreground font-sans">From database creation to production monitoring, db9 covers the full lifecycle.</p>

      <div className="mt-12 grid sm:grid-cols-2 gap-x-12 gap-y-8">
        {features.map((f) => (
          <div key={f.title}>
            <h3 className="text-sm font-semibold font-mono">{f.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed font-sans">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const commands = [
  { cmd: "db9 db create --name myapp", desc: "Create a serverless Postgres database" },
  { cmd: 'db9 db sql <id> -q "..."', desc: "Execute SQL queries directly" },
  { cmd: "db9 db branch create <id> --name dev", desc: "Branch a database for dev/test" },
  { cmd: "db9 db inspect <id>", desc: "View QPS, latency, and metrics" },
  { cmd: "db9 gen types <id> --lang typescript", desc: "Generate TS/Python types from schema" },
  { cmd: "db9 migration up <id>", desc: "Apply pending migrations" },
  { cmd: "db9 db dump <id> -o backup.sql", desc: "Export database as SQL" },
  { cmd: "db9 db connect <id>", desc: "Get connection string for psql" },
  { cmd: "db9 fs sh <id>", desc: "Interactive filesystem shell" },
  { cmd: "db9 fs cp local.txt <id>:/data/", desc: "Upload files to cloud filesystem" },
];

const CommandsSection = () => (
  <section id="commands" className="py-24 border-t border-border">
    <div className="container max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight">30+ commands</h2>
      <p className="mt-3 text-muted-foreground font-sans">A comprehensive toolkit for every database operation.</p>

      <div className="mt-10 space-y-0 border border-border rounded-md overflow-hidden divide-y divide-border">
        {commands.map((c) => (
          <div key={c.cmd} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 px-4 py-3 hover:bg-accent/50 transition-colors">
            <code className="text-sm font-mono flex-1 min-w-0 truncate">{c.cmd}</code>
            <span className="text-sm text-muted-foreground font-sans shrink-0">{c.desc}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section id="get-started" className="py-24 border-t border-border">
    <div className="container max-w-3xl text-center">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Start building in seconds</h2>
      <p className="mt-3 text-muted-foreground font-sans">One command to install. One command to create a database. Zero config.</p>
      <div className="mt-8 inline-flex items-center gap-3 bg-secondary border border-border rounded-md px-5 py-3">
        <code className="text-sm font-mono">
          <span className="text-muted-foreground">$</span> curl -fsSL https://db9.ai/install | sh
        </code>
        <CopyButton text="curl -fsSL https://db9.ai/install | sh" />
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-border py-8">
    <div className="container max-w-3xl flex items-center justify-between">
      <span className="text-sm font-mono font-semibold">db9</span>
      <span className="text-xs text-muted-foreground font-sans">© 2025 db9.ai</span>
    </div>
  </footer>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <TerminalSection />
        <FeaturesSection />
        <CommandsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
