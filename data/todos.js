const { Observable } = require("../lib/observables");

const data = {
  "Sessió cultural reactivitat": false,
  "Landing pages": false,
  "Reprendre vocero": false,
};

module.exports = new Observable(data);
