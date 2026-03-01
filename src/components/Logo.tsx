const Logo = ({ className = "", size = 32 }: { className?: string; size?: number }) => {
  const scale = size / 32;
  const w = Math.round(80 * scale);
  const h = Math.round(32 * scale);

  const S = 4; // pixel size
  const G = 1; // gap

  // Each letter on a 5x7 grid
  const d = [
    [1,1,1,0,0],
    [1,0,0,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,1,0],
    [1,1,1,0,0],
  ];
  const b = [
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,0],
  ];
  const nine = [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,1],
    [0,0,0,0,1],
    [0,0,0,1,0],
    [0,1,1,0,0],
  ];

  const renderGrid = (grid: number[][], ox: number, oy: number) => {
    const rects: JSX.Element[] = [];
    grid.forEach((row, y) =>
      row.forEach((v, x) => {
        if (v) {
          rects.push(
            <rect
              key={`${ox}-${x}-${y}`}
              x={ox + x * (S + G)}
              y={oy + y * (S + G)}
              width={S}
              height={S}
              fill="currentColor"
            />
          );
        }
      })
    );
    return rects;
  };

  const stride = 5 * (S + G) + 4; // letter width + spacing

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 80 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="db9 logo"
    >
      <g transform="translate(4, 1)">
        {renderGrid(d, 0, 2)}
        {renderGrid(b, stride, 2)}
        {renderGrid(nine, stride * 2, 2)}
      </g>
    </svg>
  );
};

export default Logo;
