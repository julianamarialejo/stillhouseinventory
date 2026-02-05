// src/lib/inventoryStore.js
// LocalStorage single source of truth

const STORAGE_KEY = "stillhouse_inventory_db";

const InventoryDB = {
  cameras: [],
  lenses: [],
  tripods: [],
  printer: [],
  accessories: [],
};

// hydrate
(function hydrate() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;
  try {
    const parsed = JSON.parse(saved);
    Object.assign(InventoryDB, parsed);
  } catch (e) {}
})();

function saveDB() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(InventoryDB));
}

function makeId(name) {
  return (
    (name || "item")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") +
    "-" +
    Date.now()
  );
}

export function getItems(category) {
  return InventoryDB[category] || [];
}

export function addInventoryItem(category, item) {
  const list = getItems(category);
  const created = {
    ...item,
    id: item.id || makeId(item.name),
    info: item.info || {},
    history: item.history || [],
  };
  list.unshift(created);
  InventoryDB[category] = list;
  saveDB();
  return created;
}

export function updateInventoryItem(category, id, patch) {
  const list = getItems(category);
  const it = list.find((x) => x.id === id);
  if (!it) return null;

  // merge base
  Object.assign(it, patch);

  // safe merges
  if (patch.info) it.info = { ...(it.info || {}), ...(patch.info || {}) };
  if (patch.history) it.history = patch.history;

  saveDB();
  return it;
}

export function deleteInventoryItem(category, id) {
  const list = getItems(category);
  const idx = list.findIndex((x) => x.id === id);
  if (idx === -1) return false;
  list.splice(idx, 1);
  saveDB();
  return true;
}

export function seedIfEmpty(category, items) {
  const list = getItems(category);
  if (list.length) return;
  InventoryDB[category] = items.map((x) => ({
    ...x,
    id: x.id || makeId(x.name),
    info: x.info || {},
    history: x.history || [],
  }));
  saveDB();
}
