/**
 * Optional IndexedDB persistence for ReK AI chat history.
 */

const DB_NAME = "res-ai-portfolio";
const DB_VERSION = 1;
const STORE = "messages";

function openDb() {
  return new Promise(function (resolve, reject) {
    if (!window.indexedDB) {
      resolve(null);
      return;
    }
    var req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onerror = function () {
      resolve(null);
    };
    req.onsuccess = function () {
      resolve(req.result);
    };
    req.onupgradeneeded = function (e) {
      var db = e.target.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "id", autoIncrement: true });
      }
    };
  });
}

/**
 * @param {{ role: string, content: string, ts: number }} row
 */
export async function saveMessage(row) {
  var db = await openDb();
  if (!db) return;
  return new Promise(function (resolve) {
    var tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).add(row);
    tx.oncomplete = function () {
      resolve();
    };
    tx.onerror = function () {
      resolve();
    };
  });
}

/**
 * @returns {Promise<{ role: string, content: string, ts: number }[]>}
 */
export async function loadHistory() {
  var db = await openDb();
  if (!db) return [];
  return new Promise(function (resolve) {
    var out = [];
    var tx = db.transaction(STORE, "readonly");
    var req = tx.objectStore(STORE).getAll();
    req.onsuccess = function () {
      resolve(req.result || []);
    };
    req.onerror = function () {
      resolve([]);
    };
  });
}

export async function clearHistory() {
  var db = await openDb();
  if (!db) return;
  return new Promise(function (resolve) {
    var tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).clear();
    tx.oncomplete = function () {
      resolve();
    };
    tx.onerror = function () {
      resolve();
    };
  });
}
