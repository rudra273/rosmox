/**
 * DBML Parser — Logic Layer
 *
 * Parses a DBML string into structured data:
 *   { tables: [...], refs: [...] }
 *
 * Each table:
 *   { name, columns: [{ name, type, constraints[], note }], indexes: [...] }
 *
 * Each ref (from inline `ref:` or standalone `Ref`):
 *   { from: { table, column }, to: { table, column }, type }
 */

export function parseDBML(dbml) {
  const tables = [];
  const refs = [];

  // Normalise line-endings
  const lines = dbml.replace(/\r\n/g, "\n").split("\n");

  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    // ── Table declaration ──
    const tableMatch = line.match(/^Table\s+(\w+)\s*\{/i);
    if (tableMatch) {
      const table = { name: tableMatch[1], columns: [], indexes: [] };
      i++;
      let inIndexes = false;

      while (i < lines.length) {
        const inner = lines[i].trim();

        // End of table
        if (inner === "}") {
          i++;
          break;
        }

        // Indexes block
        if (inner.startsWith("indexes")) {
          inIndexes = true;
          i++;
          continue;
        }
        if (inIndexes) {
          if (inner === "}") {
            inIndexes = false;
            i++;
            continue;
          }
          table.indexes.push(inner);
          i++;
          continue;
        }

        // Column line
        const colMatch = inner.match(
          /^(\w+)\s+([\w.]+(?:\s*\(.*?\))?)\s*(?:\[(.*?)\])?$/
        );
        if (colMatch) {
          const colName = colMatch[1];
          const colType = colMatch[2];
          const optionsStr = colMatch[3] || "";
          const constraints = parseConstraints(optionsStr);
          const note = extractNote(optionsStr);

          // Extract inline ref
          const refMatch = optionsStr.match(
            /ref:\s*([<>-])\s*(\w+)\.(\w+)/
          );
          if (refMatch) {
            const relType = refMatch[1]; // > (many-to-one), < (one-to-many), - (one-to-one)
            refs.push({
              from: { table: table.name, column: colName },
              to: { table: refMatch[2], column: refMatch[3] },
              type: relType,
            });
          }

          table.columns.push({
            name: colName,
            type: colType,
            constraints,
            note,
          });
        }

        i++;
      }

      tables.push(table);
      continue;
    }

    // ── Standalone Ref ──
    const refLineMatch = line.match(
      /^Ref\s*:\s*(\w+)\.(\w+)\s*([<>-])\s*(\w+)\.(\w+)/i
    );
    if (refLineMatch) {
      refs.push({
        from: { table: refLineMatch[1], column: refLineMatch[2] },
        to: { table: refLineMatch[4], column: refLineMatch[5] },
        type: refLineMatch[3],
      });
    }

    i++;
  }

  return { tables, refs };
}

/* ── Helpers ── */

function parseConstraints(str) {
  const tags = [];
  if (!str) return tags;

  if (/\bpk\b/i.test(str)) tags.push("PK");
  if (/\bincrement\b/i.test(str)) tags.push("AI");
  if (/\bnot null\b/i.test(str)) tags.push("NN");
  if (/\bunique\b/i.test(str)) tags.push("UQ");
  if (/\bdefault\b/i.test(str)) tags.push("D");
  if (/\bref:/i.test(str)) tags.push("FK");

  return tags;
}

function extractNote(str) {
  const m = str.match(/note:\s*'([^']+)'/i);
  return m ? m[1] : null;
}
