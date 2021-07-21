const customExpress = require("./config/customExpress.js");
const conexao = require("./infra/conexao.js");
const Tables = require("./infra/table.js");

conexao.connect((err) => {
  if (err) {
    return console.log(err);
  }
  console.log("conectado com DB");

  Tables.init(conexao);
  Tables.createTable();
  app = customExpress();
  app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
});
