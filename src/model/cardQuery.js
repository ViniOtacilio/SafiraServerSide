const { pool } = require("../database.js");

const createNewCardQuery = async (
    user_id,
    card_name
) => {

    return new Promise(function(resolve, reject) {
        console.log("INSERT INTO cartoes (user_id, card_name) VALUES ("+user_id+","+card_name+")")
         pool.query( `INSERT INTO  cartoes (user_id, card_name)
         VALUES ($1, $2)`,
    [
        user_id,
        card_name
    ],
     (err, result) => {
            if (err) {
                reject (err);
            }
            resolve () ;
            })
       
        })       
};

const deleteNewCardQuery = async (user_id, card_name) => {
    console.log("DELETE FROM cartoes WHERE user_id = "+ user_id +" AND card_name = '"+ card_name+"'")
    pool.query(
        `DELETE FROM cartoes WHERE
        user_id = $1 AND card_name = $2`,
        [
            user_id, card_name
        ],
        (err, result) => {
            if (err) {
                throw err;
            }
        }
    )
}

const getCardQuery = async (user_id, card_name) => {
    query = "SELECT * FROM cartoes WHERE user_id = "+user_id

    if(!card_name){
        console.log(query)
    }
    else{
        query = query + " AND card_name = '"+ card_name+"'"
        console.log(query)
    }

    return new Promise(function(resolve, reject) {
        console.log(query)

         pool.query(query, (err, result) => {
            if (err) {
                reject (err);
            }
         console.log(result.rows);
            resolve (result.rows) ;
            })
       
        })        
};


const alterCardQuery = async (user_id, card_name, new_card_name) => {
    query = "UPDATE cartoes SET card_name = '"+ new_card_name +"' WHERE user_id = "+ user_id +" AND card_name = '"+ card_name +"'";

    return new Promise(function(resolve, reject) {
        console.log(query)

         pool.query(query, (err, result) => {
            if (err) {
                reject (err);
            }
         console.log(result.rows);
            resolve (result.rows) ;
            })
       
        })        
};


module.exports = {
  createNewCardQuery,
  deleteNewCardQuery,
  getCardQuery,
  alterCardQuery
};
