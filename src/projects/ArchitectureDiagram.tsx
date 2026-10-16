import type { Diagram, DiagramNode } from "./types";

// Where a straight line from the box centre towards (tx, ty) leaves the box
function edgePoint(n: DiagramNode, tx: number, ty: number, pad = 6) {
  const cx = n.x + n.w / 2;
  const cy = n.y + n.h / 2;
  const dx = tx - cx;
  const dy = ty - cy;
  if (dx === 0 && dy === 0) return { x: cx, y: cy };
  const sx = dx === 0 ? Infinity : (n.w / 2 + pad) / Math.abs(dx);
  const sy = dy === 0 ? Infinity : (n.h / 2 + pad) / Math.abs(dy);
  const s = Math.min(sx, sy);
  return { x: cx + dx * s, y: cy + dy * s };
}

const centre = (n: DiagramNode) => ({ x: n.x + n.w / 2, y: n.y + n.h / 2 });

type Props = { diagram: Diagram; accent: string; title: string };

// Draws a box-and-arrow architecture diagram as SVG.
// Arrows have a slow "marching" dash so you can see which way data flows.
function ArchitectureDiagram({ diagram, accent, title }: Props) {
  const byId = Object.fromEntries(diagram.nodes.map((n) => [n.id, n]));
  const markerId = `arrow-${title.replace(/\W+/g, "")}`;

  return (
    <svg
      className="arch-diagram"
      viewBox={`0 0 ${diagram.width} ${diagram.height}`}
      role="img"
      aria-label={`Architecture diagram of ${title}`}
      style={{ "--accent": accent } as React.CSSProperties}
    >
      <defs>
        <marker id={markerId} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={accent} />
        </marker>
      </defs>

      {/* Dashed containers, e.g. "Docker Compose" or "K3s cluster" */}
      {diagram.groups?.map((g) => (
        <g key={g.label}>
          <rect className="arch-group" x={g.x} y={g.y} width={g.w} height={g.h} rx={16} style={g.color ? { stroke: g.color } : undefined} />
          <text className="arch-group-label" x={g.x + 14} y={g.y + 20} style={g.color ? { fill: g.color } : undefined}>
            {g.label}
          </text>
        </g>
      ))}

      {/* Arrows */}
      {diagram.edges.map((e, i) => {
        const a = byId[e.from];
        const b = byId[e.to];
        if (!a || !b) return null;
        let p1 = edgePoint(a, centre(b).x, centre(b).y);
        let p2 = edgePoint(b, centre(a).x, centre(a).y);
        if (e.vertical) {
          const x = centre(a).x;
          const down = centre(b).y > centre(a).y;
          p1 = { x, y: down ? a.y + a.h + 6 : a.y - 6 };
          p2 = { x, y: down ? b.y - 6 : b.y + b.h + 6 };
        }
        const mx = (p1.x + p2.x) / 2 + (e.labelDx ?? 0);
        const my = (p1.y + p2.y) / 2 + (e.labelDy ?? 0);
        const labelW = (e.label?.length ?? 0) * 6.1 + 14;
        return (
          <g key={i}>
            <line
              className={`arch-edge ${e.dashed ? "dashed" : ""}`}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              markerEnd={`url(#${markerId})`}
              markerStart={e.both ? `url(#${markerId})` : undefined}
            />
            {e.label && (
              <g>
                <rect className="arch-edge-label-bg" x={mx - labelW / 2} y={my - 10} width={labelW} height={20} rx={10} />
                <text className="arch-edge-label" x={mx} y={my + 4} textAnchor="middle">
                  {e.label}
                </text>
              </g>
            )}
          </g>
        );
      })}

      {/* Boxes */}
      {diagram.nodes.map((n) => {
        const Icon = n.icon;
        const iconSize = 26;
        const hasIcon = Boolean(Icon);
        const textX = hasIcon ? n.x + 50 : n.x + n.w / 2;
        const anchor = hasIcon ? "start" : "middle";
        return (
          <g key={n.id}>
            <rect
              className="arch-node"
              x={n.x}
              y={n.y}
              width={n.w}
              height={n.h}
              rx={12}
              style={n.color ? { stroke: `color-mix(in srgb, ${n.color} 55%, #333)` } : undefined}
            />
            {Icon && (
              <Icon x={n.x + 14} y={n.y + n.h / 2 - iconSize / 2} width={iconSize} height={iconSize} color={n.color ?? accent} />
            )}
            <text className="arch-node-label" x={textX} y={n.y + n.h / 2 + (n.sub ? -3 : 5)} textAnchor={anchor}>
              {n.label}
            </text>
            {n.sub && (
              <text className="arch-node-sub" x={textX} y={n.y + n.h / 2 + 14} textAnchor={anchor}>
                {n.sub}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export default ArchitectureDiagram;
