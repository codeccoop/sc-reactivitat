const { Observable } = require("../lib/observables");

const data = {
  "Ser soci d'una cooperativa": true,
  "Haver fet l'aportació de capital corresponent": true,
  "Complir amb les teves obligacions": true,
  "Participar activament a les assemblees": true,
};

module.exports = new Observable(data);
