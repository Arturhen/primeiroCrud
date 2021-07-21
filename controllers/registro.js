const Pokemon = require("../models/pokemon.js");

module.exports = (app) => {
  app.get("/registro", (req, res) => Pokemon.list(res));

  app.get("/registro/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Pokemon.find(id, res);
  });

  app.post("/registro", (req, res) => {
    const pokemon = req.body;
    Pokemon.add(pokemon, res);
  });

  app.patch("/registro/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const values = req.body;

    Pokemon.update(id, values, res);
  });

  app.delete("/registro/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Pokemon.delete(id, res);
  });
};
