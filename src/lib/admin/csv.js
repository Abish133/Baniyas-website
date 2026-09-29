/** One CSV cell, quoted. Cells starting with = + - @ are prefixed with ' so Excel won't run them as formulas. */
export function csvCell(value) {
  let text = value === null || value === undefined ? '' : String(value);
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

/** Rows → CSV text for Excel (UTF-8 BOM so Arabic names etc. open correctly, CRLF line endings). */
export function toCsv(rows) {
  return `\uFEFF${rows.map((row) => row.map(csvCell).join(',')).join('\r\n')}`;
}
