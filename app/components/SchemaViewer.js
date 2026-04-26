"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { parseDBML } from "../lib/dbmlParser";

/* ══════════════════════════════════════════════════════════
   SchemaViewer — Interactive ER-diagram renderer
   ══════════════════════════════════════════════════════════ */

/* ── Layout Constants ── */
const COL_HEIGHT = 26;
const HEADER_HEIGHT = 36;
const TABLE_PAD_BOTTOM = 8;
const TABLE_MIN_WIDTH = 260;
const CHAR_WIDTH = 7.2;
const BADGE_EXTRA = 42;
const TABLE_GAP_X = 60;
const TABLE_GAP_Y = 40;

/* ── Colour Palette ── */
const COLORS = {
  bg: "#08080a",
  gridLine: "rgba(255,255,255,0.02)",
  tableBg: "#111115",
  tableBorder: "#24242b",
  tableHeaderBg: "#1a1a22",
  headerText: "#ffffff",
  colName: "#e2e2e8",
  colType: "#7c7c8a",
  constraintBg: "rgba(99,102,241,0.1)",
  constraintText: "#9ea1ff",
  constraintBorder: "rgba(99,102,241,0.25)",
  nnBg: "rgba(239,68,68,0.08)",
  nnText: "#ff8e8e",
  nnBorder: "rgba(239,68,68,0.2)",
  refLine: "#6366f1",
  refDot: "#818cf8",
  pkIcon: "#fbbf24",
  fkIcon: "#38bdf8",
  shadow: "rgba(0,0,0,0.6)",
};

/* ══════════════════════════════════════════════════════════
   Auto-Layout: logical grouping based on relationships
   ══════════════════════════════════════════════════════════ */
function autoLayout(tables) {
  const positions = {};

  // Group tables by their role in the system
  const groups = [
    { name: "Config", tables: ["shops", "app_settings"] },
    { name: "Masters", tables: ["categories", "units", "suppliers", "customers"] },
    { name: "Core", tables: ["products", "bills"] },
    { name: "Activity", tables: ["bill_items", "stock_movements"] }
  ];

  let currentX = 100;

  groups.forEach((group) => {
    let currentY = 100;
    let maxGroupWidth = 0;

    group.tables.forEach((tableName) => {
      const table = tables.find(t => t.name === tableName);
      if (!table) return;

      // Measure width
      const maxColLen = table.columns.reduce((max, c) => {
        const badgeW = c.constraints.length > 0 ? BADGE_EXTRA * c.constraints.length : 0;
        return Math.max(max, c.name.length * CHAR_WIDTH + c.type.length * CHAR_WIDTH + badgeW + 80);
      }, table.name.length * CHAR_WIDTH + 100);
      
      const w = Math.max(TABLE_MIN_WIDTH, maxColLen);
      const h = HEADER_HEIGHT + table.columns.length * COL_HEIGHT + TABLE_PAD_BOTTOM;

      positions[tableName] = { x: currentX, y: currentY, w, h };
      maxGroupWidth = Math.max(maxGroupWidth, w);
      currentY += h + TABLE_GAP_Y + 20;
    });

    currentX += maxGroupWidth + TABLE_GAP_X + 60;
  });

  // Handle any tables not in groups
  const placed = Object.keys(positions);
  tables.forEach((table) => {
    if (!placed.includes(table.name)) {
      const w = TABLE_MIN_WIDTH;
      const h = HEADER_HEIGHT + table.columns.length * COL_HEIGHT + TABLE_PAD_BOTTOM;
      positions[table.name] = { x: currentX, y: 100, w, h };
      currentX += w + TABLE_GAP_X;
    }
  });

  return positions;
}

/* ══════════════════════════════════════════════════════════
   Component
   ══════════════════════════════════════════════════════════ */
export default function SchemaViewer({ dbml }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [transform, setTransform] = useState({ x: 40, y: 40, scale: 0.85 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [tooltip, setTooltip] = useState(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  const schema = useMemo(() => parseDBML(dbml), [dbml]);

  const positions = useMemo(
    () => autoLayout(schema.tables),
    [schema.tables]
  );

  const bounds = useMemo(() => {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    Object.values(positions).forEach((p) => {
      minX = Math.min(minX, p.x);
      minY = Math.min(minY, p.y);
      maxX = Math.max(maxX, p.x + p.w);
      maxY = Math.max(maxY, p.y + p.h);
    });
    return { minX, minY, maxX, maxY, w: maxX - minX, h: maxY - minY };
  }, [positions]);

  const fitToScreen = useCallback(() => {
    if (!canvasRef.current || bounds.w === -Infinity) return;
    const rect = canvasRef.current.getBoundingClientRect();
    if (rect.width === 0) return;
    
    const pad = 60;
    const scaleX = (rect.width - pad * 2) / bounds.w;
    const scaleY = (rect.height - pad * 2) / bounds.h;
    const scale = Math.max(0.2, Math.min(1.5, Math.min(scaleX, scaleY)));
    
    const cx = rect.width / 2 - (bounds.minX + bounds.w / 2) * scale;
    const cy = rect.height / 2 - (bounds.minY + bounds.h / 2) * scale;
    
    setTransform({ x: cx, y: cy, scale });
  }, [bounds]);

  useEffect(() => {
    if (!hasInitialized && bounds.w !== -Infinity) {
      fitToScreen();
      setHasInitialized(true);
    }
  }, [bounds, hasInitialized, fitToScreen]);

  const clampBounds = useCallback((x, y, scale) => {
    if (!canvasRef.current || bounds.w === -Infinity) return { x, y };
    const rect = canvasRef.current.getBoundingClientRect();
    
    const contentMinX = bounds.minX * scale;
    const contentMaxX = bounds.maxX * scale;
    const contentMinY = bounds.minY * scale;
    const contentMaxY = bounds.maxY * scale;
    
    const limitMinX = rect.width - contentMaxX - 50;
    const limitMaxX = 50 - contentMinX;
    const limitMinY = rect.height - contentMaxY - 50;
    const limitMaxY = 50 - contentMinY;
    
    const actualMinX = Math.min(limitMinX, limitMaxX);
    const actualMaxX = Math.max(limitMinX, limitMaxX);
    const actualMinY = Math.min(limitMinY, limitMaxY);
    const actualMaxY = Math.max(limitMinY, limitMaxY);

    return {
      x: Math.max(actualMinX, Math.min(x, actualMaxX)),
      y: Math.max(actualMinY, Math.min(y, actualMaxY))
    };
  }, [bounds]);

  /* ── Measure table geometry (reusable) ── */
  const getTableRect = useCallback(
    (tableName) => {
      const pos = positions[tableName];
      if (!pos) return null;
      const table = schema.tables.find((t) => t.name === tableName);
      if (!table) return null;
      const h = HEADER_HEIGHT + table.columns.length * COL_HEIGHT + TABLE_PAD_BOTTOM;
      return { ...pos, h };
    },
    [positions, schema.tables]
  );

  /* ── Column Y position ── */
  const getColumnY = useCallback(
    (tableName, columnName) => {
      const table = schema.tables.find((t) => t.name === tableName);
      if (!table) return 0;
      const pos = positions[tableName];
      const colIdx = table.columns.findIndex((c) => c.name === columnName);
      return pos.y + HEADER_HEIGHT + colIdx * COL_HEIGHT + COL_HEIGHT / 2;
    },
    [schema.tables, positions]
  );

  /* ── Draw ── */
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const { x: tx, y: ty, scale } = transform;

    // Clear
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Grid
    ctx.save();
    const gridSize = 48 * scale;
    if (gridSize > 8) {
      ctx.strokeStyle = COLORS.gridLine;
      ctx.lineWidth = 1;
      const startX = (tx % gridSize + gridSize) % gridSize;
      const startY = (ty % gridSize + gridSize) % gridSize;
      for (let gx = startX; gx < rect.width; gx += gridSize) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, rect.height);
        ctx.stroke();
      }
      for (let gy = startY; gy < rect.height; gy += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(rect.width, gy);
        ctx.stroke();
      }
    }
    ctx.restore();

    // Apply transform
    ctx.save();
    ctx.translate(tx, ty);
    ctx.scale(scale, scale);

    // ── Draw Relationships ──
    schema.refs.forEach((ref) => {
      const fromRect = getTableRect(ref.from.table);
      const toRect = getTableRect(ref.to.table);
      if (!fromRect || !toRect) return;

      const fromY = getColumnY(ref.from.table, ref.from.column);
      const toY = getColumnY(ref.to.table, ref.to.column);

      let fromX, toX;
      // Determine sides
      if (fromRect.x + fromRect.w < toRect.x) {
        fromX = fromRect.x + fromRect.w;
        toX = toRect.x;
      } else if (toRect.x + toRect.w < fromRect.x) {
        fromX = fromRect.x;
        toX = toRect.x + toRect.w;
      } else {
        fromX = fromRect.x + fromRect.w;
        toX = toRect.x + toRect.w;
      }

      const midX = (fromX + toX) / 2;

      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      
      // Strict orthogonal paths for clean diagram look
      ctx.lineTo(midX, fromY);
      ctx.lineTo(midX, toY);
      ctx.lineTo(toX, toY);
      
      ctx.strokeStyle = COLORS.refLine;
      ctx.lineWidth = 1.2;
      ctx.globalAlpha = 0.6;
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Pulse effect at endpoints
      [
        [fromX, fromY],
        [toX, toY],
      ].forEach(([dx, dy]) => {
        ctx.beginPath();
        ctx.arc(dx, dy, 3, 0, Math.PI * 2);
        ctx.fillStyle = COLORS.refDot;
        ctx.fill();
      });

      // Cardinality markers (1 or Many)
      if (ref.type === ">") {
        drawManyMark(ctx, fromX, fromY, fromX < toX ? 1 : -1);
        drawOneMark(ctx, toX, toY, toX < fromX ? 1 : -1);
      } else if (ref.type === "<") {
        drawOneMark(ctx, fromX, fromY, fromX < toX ? 1 : -1);
        drawManyMark(ctx, toX, toY, toX < fromX ? 1 : -1);
      }
    });

    // ── Draw Tables ──
    schema.tables.forEach((table) => {
      const pos = positions[table.name];
      if (!pos) return;
      const { x, y, w } = pos;
      const h = HEADER_HEIGHT + table.columns.length * COL_HEIGHT + TABLE_PAD_BOTTOM;

      // Shadow
      ctx.shadowColor = COLORS.shadow;
      ctx.shadowBlur = 24;
      ctx.shadowOffsetY = 8;

      // Table body
      roundRect(ctx, x, y, w, h, 8);
      ctx.fillStyle = COLORS.tableBg;
      ctx.fill();
      ctx.strokeStyle = COLORS.tableBorder;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;

      // Header
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x + 8, y);
      ctx.lineTo(x + w - 8, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + 8);
      ctx.lineTo(x + w, y + HEADER_HEIGHT);
      ctx.lineTo(x, y + HEADER_HEIGHT);
      ctx.lineTo(x, y + 8);
      ctx.quadraticCurveTo(x, y, x + 8, y);
      ctx.closePath();
      ctx.fillStyle = COLORS.tableHeaderBg;
      ctx.fill();

      // Header gradient line
      const grad = ctx.createLinearGradient(x, y + HEADER_HEIGHT - 1, x + w, y + HEADER_HEIGHT - 1);
      grad.addColorStop(0, "rgba(99,102,241,0.4)");
      grad.addColorStop(0.5, "rgba(168,85,247,0.3)");
      grad.addColorStop(1, "rgba(236,72,153,0.2)");
      ctx.beginPath();
      ctx.moveTo(x, y + HEADER_HEIGHT);
      ctx.lineTo(x + w, y + HEADER_HEIGHT);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // Table name
      ctx.fillStyle = COLORS.headerText;
      ctx.font = "bold 12px Inter, system-ui, sans-serif";
      ctx.textBaseline = "middle";
      ctx.fillText(table.name, x + 14, y + HEADER_HEIGHT / 2);

      // Table icon
      ctx.fillStyle = COLORS.colType;
      ctx.font = "10px Inter, system-ui, sans-serif";
      ctx.fillText(`${table.columns.length} cols`, x + w - 52, y + HEADER_HEIGHT / 2);

      // Columns
      table.columns.forEach((col, ci) => {
        const cy = y + HEADER_HEIGHT + ci * COL_HEIGHT;
        const rowMid = cy + COL_HEIGHT / 2;

        // Alternate row tinting
        if (ci % 2 === 0) {
          ctx.fillStyle = "rgba(255,255,255,0.012)";
          ctx.fillRect(x + 1, cy, w - 2, COL_HEIGHT);
        }

        // PK/FK icon
        let iconOffset = 14;
        if (col.constraints.includes("PK")) {
          ctx.fillStyle = COLORS.pkIcon;
          ctx.font = "bold 9px Inter, system-ui, sans-serif";
          ctx.fillText("🔑", x + iconOffset - 2, rowMid + 1);
          iconOffset += 18;
        } else if (col.constraints.includes("FK")) {
          ctx.fillStyle = COLORS.fkIcon;
          ctx.font = "bold 9px Inter, system-ui, sans-serif";
          ctx.fillText("🔗", x + iconOffset - 2, rowMid + 1);
          iconOffset += 18;
        }

        // Column name
        ctx.fillStyle = COLORS.colName;
        ctx.font = "12px Inter, system-ui, sans-serif";
        ctx.textBaseline = "middle";
        ctx.fillText(col.name, x + iconOffset, rowMid);

        // Type (right-aligned area)
        ctx.fillStyle = COLORS.colType;
        ctx.font = "11px Inter, system-ui, sans-serif";
        const typeText = col.type;
        const typeW = ctx.measureText(typeText).width;
        ctx.fillText(typeText, x + w - typeW - 14, rowMid);

        // Constraint badges
        const visibleConstraints = col.constraints.filter(
          (c) => c !== "PK" && c !== "FK"
        );
        if (visibleConstraints.length > 0) {
          let badgeX = x + w - typeW - 24;
          visibleConstraints.reverse().forEach((badge) => {
            const isNN = badge === "NN";
            ctx.font = "bold 7.5px Inter, system-ui, sans-serif";
            const bw = ctx.measureText(badge).width + 10;
            badgeX -= bw + 6;

            roundRect(ctx, badgeX, rowMid - 8, bw, 16, 4);
            ctx.fillStyle = isNN ? COLORS.nnBg : COLORS.constraintBg;
            ctx.fill();
            ctx.strokeStyle = isNN ? COLORS.nnBorder : COLORS.constraintBorder;
            ctx.lineWidth = 0.5;
            ctx.stroke();

            ctx.fillStyle = isNN ? COLORS.nnText : COLORS.constraintText;
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.fillText(badge, badgeX + bw / 2, rowMid);
            ctx.textAlign = "left";
          });
        }
      });
    });

    ctx.restore();
  }, [transform, schema, positions, getTableRect, getColumnY]);

  /* ── Resize observer ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ro = new ResizeObserver(() => draw());
    ro.observe(canvas.parentElement);
    draw();
    return () => ro.disconnect();
  }, [draw]);

  /* ── Interactions: Pan ── */
  const onPointerDown = (e) => {
    if (e.button !== 0) return;
    setDragging(true);
    setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
    e.currentTarget.style.cursor = "grabbing";
  };

  const onPointerMove = (e) => {
    if (!dragging) return;
    setTransform((t) => {
      let newX = e.clientX - dragStart.x;
      let newY = e.clientY - dragStart.y;
      const clamped = clampBounds(newX, newY, t.scale);
      return { ...t, x: clamped.x, y: clamped.y };
    });
  };

  const onPointerUp = (e) => {
    setDragging(false);
    e.currentTarget.style.cursor = "grab";
  };

  /* ── Interactions: Wheel/Trackpad ── */
  const onWheel = (e) => {
    e.preventDefault();
    
    // Pinch-to-zoom or Ctrl+Scroll
    if (e.ctrlKey) {
      const delta = e.deltaY > 0 ? 0.92 : 1.08;
      setTransform((t) => {
        const newScale = Math.max(0.2, Math.min(1.5, t.scale * delta));
        const rect = canvasRef.current.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        
        let newX = mx - (mx - t.x) * (newScale / t.scale);
        let newY = my - (my - t.y) * (newScale / t.scale);
        
        const clamped = clampBounds(newX, newY, newScale);
        return { scale: newScale, x: clamped.x, y: clamped.y };
      });
    } else {
      // 2-finger pan / standard scroll
      setTransform((t) => {
        let newX = t.x - e.deltaX;
        let newY = t.y - e.deltaY;
        const clamped = clampBounds(newX, newY, t.scale);
        return { ...t, x: clamped.x, y: clamped.y };
      });
    }
  };

  /* ── Zoom controls ── */
  const zoomIn = () => {
    setTransform((t) => {
      const newScale = Math.min(1.5, t.scale * 1.2);
      const clamped = clampBounds(t.x, t.y, newScale);
      return { scale: newScale, x: clamped.x, y: clamped.y };
    });
  };
  const zoomOut = () => {
    setTransform((t) => {
      const newScale = Math.max(0.2, t.scale / 1.2);
      const clamped = clampBounds(t.x, t.y, newScale);
      return { scale: newScale, x: clamped.x, y: clamped.y };
    });
  };
  const resetView = () => fitToScreen();

  /* ── Tooltip on hover ── */
  const onCanvasMouseMove = (e) => {
    if (dragging) {
      setTooltip(null);
      return;
    }
    const rect = canvasRef.current.getBoundingClientRect();
    const mx = (e.clientX - rect.left - transform.x) / transform.scale;
    const my = (e.clientY - rect.top - transform.y) / transform.scale;

    for (const table of schema.tables) {
      const pos = positions[table.name];
      if (!pos) continue;
      if (mx >= pos.x && mx <= pos.x + pos.w) {
        for (let ci = 0; ci < table.columns.length; ci++) {
          const cy = pos.y + HEADER_HEIGHT + ci * COL_HEIGHT;
          if (my >= cy && my <= cy + COL_HEIGHT) {
            const col = table.columns[ci];
            if (col.note) {
              setTooltip({
                text: col.note,
                x: e.clientX - rect.left + 12,
                y: e.clientY - rect.top - 8,
              });
              return;
            }
          }
        }
      }
    }
    setTooltip(null);
  };

  return (
    <div className="schema-viewer-container" ref={containerRef}>
      <div className="schema-viewer-toolbar">
        <button onClick={zoomIn} className="schema-btn" title="Zoom in">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
            <path d="M11 8v6M8 11h6" />
          </svg>
        </button>
        <span className="schema-zoom-label">
          {Math.round(transform.scale * 100)}%
        </span>
        <button onClick={zoomOut} className="schema-btn" title="Zoom out">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
            <path d="M8 11h6" />
          </svg>
        </button>
        <div className="schema-toolbar-divider" />
        <button onClick={resetView} className="schema-btn" title="Reset view">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>
      </div>

      <canvas
        ref={canvasRef}
        className="schema-canvas"
        onPointerDown={onPointerDown}
        onPointerMove={(e) => {
          onPointerMove(e);
          onCanvasMouseMove(e);
        }}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onWheel={onWheel}
      />

      {tooltip && (
        <div
          className="schema-tooltip"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.text}
        </div>
      )}

      <div className="schema-legend">
        <span className="schema-legend-item">
          <span className="schema-legend-key" style={{ background: COLORS.pkIcon }} /> PK
        </span>
        <span className="schema-legend-item">
          <span className="schema-legend-key" style={{ background: COLORS.fkIcon }} /> FK
        </span>
        <span className="schema-legend-item">
          <span className="schema-legend-key schema-legend-badge nn" /> NN
        </span>
        <span className="schema-legend-item">
          <span className="schema-legend-key schema-legend-badge" /> Constraint
        </span>
      </div>
    </div>
  );
}

/* ── Canvas Helpers ── */

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawManyMark(ctx, cx, cy, dir) {
  const s = 5;
  const ox = dir * 14;
  ctx.beginPath();
  ctx.moveTo(cx + ox, cy);
  ctx.lineTo(cx + ox + s * dir, cy - s);
  ctx.moveTo(cx + ox, cy);
  ctx.lineTo(cx + ox + s * dir, cy + s);
  ctx.moveTo(cx + ox, cy);
  ctx.lineTo(cx + ox + s * dir, cy);
  ctx.strokeStyle = COLORS.refDot;
  ctx.lineWidth = 1.2;
  ctx.stroke();
}

function drawOneMark(ctx, cx, cy, dir) {
  const ox = dir * 14;
  ctx.beginPath();
  ctx.moveTo(cx + ox, cy - 6);
  ctx.lineTo(cx + ox, cy + 6);
  ctx.strokeStyle = COLORS.refDot;
  ctx.lineWidth = 1.5;
  ctx.stroke();
}
