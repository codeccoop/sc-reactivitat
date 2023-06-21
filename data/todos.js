const { reactive } = require("../lib/reactivity");

const data = {
  "Sessió cultural reactivitat": false,
  "Landing pages": false,
  "Reprendre vocero": false,
};

module.exports = reactive(data);
