/**
 * satori-safe rendering of the Nexora mark for `next/og` ImageResponse
 * routes (icon.tsx, apple-icon.tsx, opengraph-image.tsx). satori doesn't
 * reliably support arbitrary SVG paths, so the hub, nodes, and
 * connecting lines are built from absolutely positioned divs instead —
 * the same hub-and-three-nodes geometry as the DOM <Mark />.
 */

const POINTS = {
  hub: [16, 16] as const,
  top: [16, 5] as const,
  bottomLeft: [6, 25] as const,
  bottomRight: [26, 25] as const,
};

const NODE_KEYS = ["top", "bottomLeft", "bottomRight"] as const;

interface OgMarkProps {
  size: number;
  color: string;
}

export function OgMark({ size, color }: OgMarkProps) {
  const frac = (v: number) => (v / 32) * size;
  const lineThickness = Math.max(1.5, size * 0.05);
  const hubSize = size * 0.25;
  const nodeSize = size * 0.22;

  const lines = NODE_KEYS.map((key) => {
    const [x1, y1] = POINTS.hub;
    const [x2, y2] = POINTS[key];
    const dx = frac(x2 - x1);
    const dy = frac(y2 - y1);
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    const midX = frac((x1 + x2) / 2);
    const midY = frac((y1 + y2) / 2);

    return {
      key,
      style: {
        position: "absolute" as const,
        width: length,
        height: lineThickness,
        background: color,
        left: midX - length / 2,
        top: midY - lineThickness / 2,
        transform: `rotate(${angle}deg)`,
      },
    };
  });

  return (
    <div style={{ position: "relative", width: size, height: size, display: "flex" }}>
      {lines.map((line) => (
        <div key={line.key} style={line.style} />
      ))}
      <div
        style={{
          position: "absolute",
          left: frac(POINTS.hub[0]) - hubSize / 2,
          top: frac(POINTS.hub[1]) - hubSize / 2,
          width: hubSize,
          height: hubSize,
          borderRadius: size * 0.06,
          background: color,
        }}
      />
      {NODE_KEYS.map((key) => (
        <div
          key={key}
          style={{
            position: "absolute",
            left: frac(POINTS[key][0]) - nodeSize / 2,
            top: frac(POINTS[key][1]) - nodeSize / 2,
            width: nodeSize,
            height: nodeSize,
            borderRadius: size * 0.055,
            background: color,
          }}
        />
      ))}
    </div>
  );
}
