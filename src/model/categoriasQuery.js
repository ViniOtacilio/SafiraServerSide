const { pool } = require("../database.js");

const getCategoriaQuery = async () => {
    let cloneArray;
    pool.query(
    `SELECT * FROM categoria`,
    (err, result) => {
      if (err) {
        throw err;
      }
      else {
      cloneArray = JSON.parse(JSON.stringify(result.rows));
      return cloneArray;
    }

    }
  );
};

module.exports = {
    getCategoriaQuery,
};
