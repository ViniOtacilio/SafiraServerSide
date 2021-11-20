const { createNewCardQuery } = require("../model/cardQuery");
const { deleteNewCardQuery } = require('../model/cardQuery');
const { getCardQuery } = require('../model/cardQuery');
const { alterCardQuery } = require('../model/cardQuery');


const createNewCard = async (
  user_id,
  card_name
) => {
  let errors = [];

  if (!user_id) {
    errors.push({ message: "Sem id de usuário" });
  }
  if (!card_name) {
    errors.push({ message: "Sem nome do cartão" });
  }

  if (errors.length > 0) {
    console.log(errors)
    throw errors;
  } 
  else {
    await createNewCardQuery(
        user_id,
        card_name
      );


  }
};

const deleteNewCard = async (user_id, card_name) => {
    let errors = [];
   
    if (!user_id) {
        
        errors.push({ message: "Sem id de usuário" });
      }
      console.log('40')
      if (!card_name) {
       
        errors.push({ message: "Sem nome do cartão" });
      }
     
      if (errors.length > 0) {
        console.log(errors)
        throw errors;
      } 
    else {
        
        await deleteNewCardQuery(
            user_id,
            card_name
          );
    }
    
}

const getNewCard = async (user_id, card_name, card_id) => {
    let errors = [];

    if (!user_id) {
        errors.push({ message: "Sem id de usuário" });
    }

    if (errors.length > 0) {
        console.log(errors)
        throw errors;
    } 

      data = await getCardQuery( user_id, card_name, card_id);

      return data;

};   

const alterCardName = async (user_id, card_name, new_card_name) => {
  let errors = [];

  if (!user_id) {
      errors.push({ message: "Sem id de usuário"});
  }
  if (!card_name) {
    errors.push({ message: "Sem nome do cartão"});
  }
  if (!new_card_name) {
    errors.push({ message: "Sem novo nome do cartão"});
  }

  if (errors.length > 0) {
      console.log(errors)
      throw errors;
  } 

    data = await alterCardQuery( user_id, card_name, new_card_name );

    return data;

};   

module.exports = {
    createNewCard,
    deleteNewCard,
    getNewCard,
    alterCardName
};
