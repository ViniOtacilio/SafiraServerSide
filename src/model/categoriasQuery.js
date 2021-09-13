const { pool } = require("../database.js");

const createNewCustomCategoryQuery = async (user_id, name) => {
    pool.query(
        `INSERT INTO categorias_customizaveis (nome, user_id)
         values($1,$2)`,
        [
            name,
            user_id
        ],
        (err, result) => {
            if (err) {
                throw err;
            }
        }
    )
}

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

const getCategoriaByUserQuery = async (query) => {
  return new Promise(function(resolve, reject) {
       console.log('In model: '+ query);
       categorias = []

       pool.query(query, (err, result) => {
          if (err) {
              throw (err) ;
          }
          else{

            if(result.rows.length == 0){    
              console.log( 'nenhum lancamento encontrado')
              resolve('nenhum lancamento encontrado') 
              return
            }

            for(let i = 0; i < result.rows.length; i++){
              console.log(i);
              categorias.push(Object.values(result.rows[i]))
            }

            console.log(categorias);

            pool.query(
              'SELECT * FROM categoria WHERE id IN ('+categorias+')',
              (err, result) => {
                if (err) {
                  throw err;
                }
                else {
                cloneArray = JSON.parse(JSON.stringify(result.rows));
                resolve(cloneArray);
              }
          
            }) 
          }
     
          });
  });
};

module.exports = {
    getCategoriaQuery,
    getCategoriaByUserQuery,
    createNewCustomCategoryQuery
};
