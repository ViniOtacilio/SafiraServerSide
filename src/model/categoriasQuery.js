const { pool } = require("../database.js");

const createNewCustomCategoryQuery = async (user_id, name) => {
    pool.query(
        `INSERT INTO categoria (nome, personalizada, user_id)
         values($1,true,$2)`,
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

const deleteNewCustomCategoryQuery = async (id) => {
    pool.query(
        `DELETE FROM categoria WHERE
         id = $1`,
        [
           id
        ],
        (err, result) => {
            if (err) {
                throw err;
            }
        }
    )
}

const getAllCustomCategoriesQuery = async (user_id) => {
  return new Promise(function(resolve, reject) {
  pool.query(
      `SELECT * FROM categoria WHERE
       user_id = $1`,
      [
        user_id
      ],
      (err, result) => {
          if (err) {
              throw err;
          }
          else {
            let cloneArray = JSON.parse(JSON.stringify(result.rows));
            resolve(cloneArray);
          }
      }

  )
  });
};

const getCategoriaQuery = async (user_id) => {
  return new Promise(function(resolve, reject) {
  pool.query(
      `SELECT * FROM categoria WHERE
       user_id = $1 OR user_id IS Null `,
      [
        user_id
      ],
      (err, result) => {
          if (err) {
              throw err;
          }
          else {
            console.log(result.rows);
            let cloneArray = JSON.parse(JSON.stringify(result.rows));
            resolve(cloneArray);
          }
      }

  )
  });
};


// const getCategoriaQuery = async (user_id) => {
//    let query = "SELECT * FROM categoria WHERE user_id = "+user_id;
//     let cloneArray;
//     pool.query(query,
//     (err, result) => {
//       if (err) {
//         console.log('deu erro');
//         throw err;
//       }
//       else {
//       cloneArray = JSON.parse(JSON.stringify(result.rows));
//       console.log('deu certo');
//       return cloneArray;
//     }

//     }
//   );
// };

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


const getCategoriaSaldo = async (query) => {
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

            cloneArray = JSON.parse(JSON.stringify(result.rows));
            resolve(cloneArray);

          }
     
          });
  });
};


module.exports = {
    getCategoriaQuery,
    getCategoriaByUserQuery,
    createNewCustomCategoryQuery,
    deleteNewCustomCategoryQuery,
    getCategoriaSaldo,
    getAllCustomCategoriesQuery
};
