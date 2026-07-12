import type { PartType } from "./inspectionData";

/**
 * Distinct metallic part silhouettes drawn as SVG (viewBox 0 0 100 100).
 * `uid` keeps gradient ids unique per camera tile.
 */
export function PartGraphic({ part, uid }: { part: PartType; uid: number }) {
  const fill = `url(#pg${uid})`;
  const stroke = "#5b5b64";
  const hole = "#0b0b0e";

  return (
    <g>
      <defs>
        <radialGradient id={`pg${uid}`} cx="40%" cy="34%" r="78%">
          <stop offset="0%" stopColor="#52525c" />
          <stop offset="55%" stopColor="#34343c" />
          <stop offset="100%" stopColor="#212127" />
        </radialGradient>
      </defs>
      <Shape part={part} fill={fill} stroke={stroke} hole={hole} />
    </g>
  );
}

function Shape({
  part,
  fill,
  stroke,
  hole,
}: {
  part: PartType;
  fill: string;
  stroke: string;
  hole: string;
}) {
  switch (part) {
    case "flange": {
      const holes = [0, 60, 120, 180, 240, 300].map((d) => {
        const r = (d * Math.PI) / 180;
        return { x: 50 + 26 * Math.cos(r), y: 50 + 26 * Math.sin(r) };
      });
      return (
        <g>
          <circle cx="50" cy="50" r="36" fill={fill} stroke={stroke} strokeWidth="1.5" />
          {holes.map((h, i) => (
            <circle key={i} cx={h.x} cy={h.y} r="3" fill={hole} />
          ))}
          <circle cx="50" cy="50" r="18" fill={fill} stroke="#6a6a72" strokeWidth="1" />
          <circle cx="50" cy="50" r="9" fill={hole} stroke="#3a3a42" strokeWidth="1" />
          <ellipse cx="40" cy="36" rx="12" ry="6" fill="#ffffff" opacity="0.06" />
        </g>
      );
    }

    case "plate":
      return (
        <g transform="rotate(-6 50 50)">
          <rect x="16" y="30" width="68" height="40" rx="5" fill={fill} stroke={stroke} strokeWidth="1.5" />
          {[
            [26, 39],
            [74, 39],
            [26, 61],
            [74, 61],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3" fill={hole} />
          ))}
          <rect x="44" y="45" width="12" height="10" rx="2" fill={hole} />
          <rect x="21" y="33" width="20" height="5" rx="2.5" fill="#ffffff" opacity="0.05" />
        </g>
      );

    case "hexnut": {
      const hex = [
        [80, 50],
        [65, 76],
        [35, 76],
        [20, 50],
        [35, 24],
        [65, 24],
      ]
        .map((p) => p.join(","))
        .join(" ");
      return (
        <g>
          <polygon points={hex} fill={fill} stroke={stroke} strokeWidth="1.5" />
          <circle cx="50" cy="50" r="18" fill="#2a2a30" stroke="#6a6a72" strokeWidth="1" />
          <circle cx="50" cy="50" r="13" fill={hole} />
          <ellipse cx="42" cy="38" rx="10" ry="5" fill="#ffffff" opacity="0.06" />
        </g>
      );
    }

    case "bolt": {
      const hex = [
        [66, 30],
        [56, 47],
        [36, 47],
        [26, 30],
        [36, 13],
        [56, 13],
      ]
        .map((p) => p.join(","))
        .join(" ");
      return (
        <g transform="rotate(8 50 50)">
          {/* threaded shaft */}
          <rect x="40" y="42" width="12" height="44" rx="2" fill={fill} stroke={stroke} strokeWidth="1.2" />
          {[50, 58, 66, 74, 82].map((y) => (
            <line key={y} x1="40" y1={y} x2="52" y2={y} stroke="#0b0b0e" strokeWidth="1" opacity="0.5" />
          ))}
          {/* hex head */}
          <polygon points={hex} fill={fill} stroke={stroke} strokeWidth="1.5" />
          <circle cx="46" cy="30" r="6" fill="#2a2a30" stroke="#6a6a72" strokeWidth="0.8" />
          <ellipse cx="40" cy="22" rx="7" ry="3.5" fill="#ffffff" opacity="0.06" />
        </g>
      );
    }

    case "washer":
      return (
        <g>
          <circle cx="50" cy="50" r="34" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <circle cx="50" cy="50" r="19" fill={hole} stroke="#3a3a42" strokeWidth="1" />
          <circle cx="50" cy="50" r="27" fill="none" stroke="#6a6a72" strokeWidth="0.8" opacity="0.5" />
          <ellipse cx="38" cy="34" rx="10" ry="5" fill="#ffffff" opacity="0.06" />
        </g>
      );

    case "connector":
      return (
        <g>
          <rect x="18" y="34" width="64" height="32" rx="4" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <rect x="24" y="40" width="52" height="20" rx="2" fill="#1a1a1f" stroke="#3a3a42" strokeWidth="0.8" />
          {[30, 38, 46, 54, 62, 70].map((x) => (
            <rect key={x} x={x - 1.6} y="44" width="3.2" height="12" rx="1" fill="#8a8a92" />
          ))}
          <rect x="12" y="46" width="6" height="8" rx="1.5" fill={fill} stroke={stroke} strokeWidth="1" />
          <rect x="82" y="46" width="6" height="8" rx="1.5" fill={fill} stroke={stroke} strokeWidth="1" />
        </g>
      );
  }
}
