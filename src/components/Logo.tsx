const Logo = ({ className = "", size = 32 }: { className?: string; size?: number }) => {
  const scale = size / 32;
  const w = Math.round(88 * scale);
  const h = Math.round(32 * scale);

  // Pixel grid: each "pixel" is 3x3 units
  const P = 3;

  // d - pixel letter (7 tall, 5 wide)
  const dPixels = [
    [0,0],[1,0],[2,0],
    [0,1],[3,1],
    [0,2],[4,2],
    [0,3],[4,3],
    [0,4],[4,4],
    [0,5],[3,5],
    [0,6],[1,6],[2,6],
  ];

  // b - pixel letter
  const bPixels = [
    [0,0],
    [0,1],
    [0,2],[1,2],[2,2],
    [0,3],[3,3],
    [0,4],[3,4],
    [0,5],[3,5],
    [0,6],[1,6],[2,6],
  ];

  // 9 - pixel number
  const ninePixels = [
    [1,0],[2,0],[3,0],
    [0,1],[4,1],
    [0,2],[4,2],
    [1,3],[2,3],[3,3],[4,3],
    [4,4],
    [3,5],
    [1,6],[2,6],
  ];

  const renderPixels = (pixels: number[][], offsetX: number, offsetY: number) =>
    pixels.map(([x, y], i) => (
      <rect
        key={i}
        x={offsetX + x * P}
        y={offsetY + y * P}
        width={P - 0.5}
        height={P - 0.5}
        fill="currentColor"
        rx={0.3}
      />
    ));

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 88 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="db9 logo"
      style={{ imageRendering: "pixelated" }}
    >
      <g transform="translate(8, 5)">
        {renderPixels(dPixels, 0, 0)}
        {renderPixels(bPixels, 20, 0)}
        {renderPixels(ninePixels, 40, 0)}
      </g>
      {/* Scanline effect */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(i => (
        <line
          key={i}
          x1={0}
          y1={i * 2 + 0.5}
          x2={88}
          y2={i * 2 + 0.5}
          stroke="currentColor"
          strokeWidth={0.15}
          opacity={0.08}
        />
      ))}
    </svg>
  );
};

export default Logo;
