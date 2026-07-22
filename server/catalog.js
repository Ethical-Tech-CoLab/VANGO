/*
 * Server-side source of truth for valid stamp codes.
 *
 * Previously the catalog lived only in the front end (`CATALOG` in src/App.jsx),
 * which meant the API had no notion of which codes were real and would happily
 * mint a stamp for any string a client posted. Keep this list in sync with the
 * client catalog when artworks are added or removed.
 */

const CATALOG = {
  CHROMA14: { title: 'Chromatic Drift', artist: 'N. Osei', venue: 'Biennale — Gallery Sigma' },
  FAULT02: { title: 'Fault Lines', artist: 'M. Duarte', venue: 'Museum of Other Worlds' },
  HOLLOW21: { title: 'Hollow Choir', artist: 'R. Venn', venue: 'Studio Aperture' },
  ECHO07: { title: 'Echo Garden', artist: 'T. Lindqvist', venue: 'Nomad Pavilion' },
  VOID99: { title: 'Voidwalk', artist: 'K. Amaro', venue: 'Lattice Museum' },
  BURA01: { title: 'Bura Ceramics', artist: 'Niger', venue: 'AABC' },
  DAVID01: { title: 'David', artist: 'Michelangelo', venue: "Galleria dell'Accademia" },
};

function normalizeCode(raw) {
  return String(raw || '').trim().toUpperCase().replace(/[\s-]/g, '');
}

function isValidCode(code) {
  return Object.prototype.hasOwnProperty.call(CATALOG, normalizeCode(code));
}

module.exports = { CATALOG, CODES: Object.keys(CATALOG), normalizeCode, isValidCode };
