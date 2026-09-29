// The admin panel's hidden URL. It must match the route folder name
// src/app/(admin)/bys-panel-d10224a364 and the matcher in src/proxy.js
// (Next.js needs that one written out literally; a unit test checks they agree).
// To change the URL: rename the folder, then update this constant and proxy.js.
export const ADMIN_BASE = '/bys-panel-d10224a364';
