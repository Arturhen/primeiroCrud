class Table {
  init(conexao) {
    this.conexao = conexao;
  }

  createTable() {
    const sql = `CREATE TABLE IF NOT EXISTS Pokemons(id int NOT NULL AUTO_INCREMENT,
        pokemon varchar(50) NOT NULL, treinador varchar(20),tipos varchar(20)
        NOT NULL,data datetime NOT NULL,dataCriacao datetime NOT NULL, status varchar(20) NOT NULL,observacoes text, PRIMARY KEY(id))`;
    this.conexao.query(sql, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
}

module.exports = new Table();
