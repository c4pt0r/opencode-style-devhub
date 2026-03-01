const Logo = ({ className = "", size = 32 }: { className?: string; size?: number }) => {
  const fontSize = size * 0.65;

  return (
    <span
      className={`inline-flex items-baseline font-mono tracking-tight ${className}`}
      style={{ fontSize: `${fontSize}px`, lineHeight: 1 }}
      aria-label="DB9 logo"
    >
      <span className="font-extrabold">DB</span>
      <span className="font-extrabold text-pg-blue">9</span>
    </span>
  );
};

export default Logo;
