const moment = require("moment");
const conexao = require("../infra/conexao.js");
const Validate = require("./validate.js");

class Pokemon {
  add(pokemon, res) {
    const dataCriacao = moment().format("YYYY-MM-DD");
    const data = moment(pokemon.data, "DD/MM/YYYY").format(
      "YYYY-MM-DD"
    );
    const pokemonWithDate = { ...pokemon, dataCriacao, data };

    //validações
    const errors = Validate.validateDate(data, dataCriacao);
    const anyError = errors.length;
      console.log(data)
    if (anyError) {
      res.status(400).json(errors);
      return;
    }

    const sql = `INSERT INTO pokemons SET ?`;

    conexao.query(sql, pokemonWithDate, (err, resultado) => {
      if (err) {
        res.status(400).json(err);
        return;
      }
      res.status(201).json(pokemon);
      return;
    });
  }

  list(res) {
    const sql = "SELECT * FROM `pokemon-db`.pokemons";

    conexao.query(sql, (err, result) => {
      if (err) {
        res.status(400).json(err);
        return;
      }
      res.status(200).json(result);
    });
  }

  find(id, res) {
    const sql = `SELECT * FROM \`pokemon-db\`.pokemons WHERE id=${id}`;

    conexao.query(sql, (err, result) => {
      if (err) {
        res.status(400).json(err);
        return;
      }
      res.status(200).json(result[0]);
    });
  }

  update(id, values, res) {
    if (values.data) {
      values.data = moment(values.data, "DD/MM/YYYY").format(
        "YYYY-MM-DD HH:MM:SS"
      );
      const errors = Validate.validateDate(values.data, new Date());
      const existemErrors = errors.length;

      if (existemErrors) {
        res.status(400).json(errors);
        return;
      }
    }

    const sql = `UPDATE \`pokemon-db\`.pokemons SET ? WHERE id=?`;
    conexao.query(sql, [values, id], (err, result) => {
      if (err) {
        res.status(400).json(err);
      }
      res.status(200).json({ ...values, id });
    });
  }

  delete(id, res) {
    const sql = "DELETE FROM `pokemon-db` .pokemons WHERE id=?";

    conexao.query(sql, id, (err, result) => {
      if (err) {
        res.status(400).json(err);
        return;
      }
      res.status(200).json(`Id Deleted:${id}`);
    });
  }
}

module.exports = new Pokemon();
