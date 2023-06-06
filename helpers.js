/*
 * Map getter with a fallback value
 *
 * @param {Map} map
 * @param {String} key
 * @param {Any} fallback
 */
function fallbackGet(map, key, fallback) {
  if (map.has(key)) return map.get(key);

  map.set(key, fallback);
  return map.get(key);
}

module.exports = { fallbackGet };
