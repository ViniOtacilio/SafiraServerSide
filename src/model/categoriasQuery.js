const { pool } = require("../database.js");

const getCategoriaQuery = async () => {
    let teste;
    pool.query(
    `SELECT * FROM categoria`,
    (err, result) => {
      if (err) {
        throw err;
      }
      else {
        console.log(result.rows);
    }
    //   console.log(result);
    //   console.log(err);
    }
  );
  console.log(teste);
  return teste;
};

module.exports = {
    getCategoriaQuery,
};
