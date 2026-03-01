const Logo = ({ className = "", size = 32 }: { className?: string; size?: number }) => {
  const scale = size / 32;
  const width = Math.round(72 * scale);
  const height = Math.round(32 * scale);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 72 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="db9 logo"
    >
      {/* "d" */}
      <path
        d="M2 8h8a8 8 0 0 1 0 16H2V8zm4 3.5v9h4a4.5 4.5 0 0 0 0-9H6z"
        fill="currentColor"
      />
      {/* "b" */}
      <path
        d="M22 4v20h8a8 8 0 0 0 0-16h-4V4h-4zm4 11.5v5h4a4.5 4.5 0 0 0 0-9h-4v4z"
        fill="currentColor"
      />
      {/* "9" — distinctive geometric */}
      <circle cx="54" cy="14" r="7" stroke="currentColor" strokeWidth="3.5" fill="none" />
      <line x1="59" y1="18" x2="55" y2="28" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
};

export default Logo;
