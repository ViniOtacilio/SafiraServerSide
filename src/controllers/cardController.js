const { createNewCard } = require('../services/cardService');
const { deleteNewCard } = require('../services/cardService');
const { getNewCard } = require('../services/cardService');
const { alterCardName } = require('../services/cardService');


const createCard = async (req, res, next) => {
    
    const { user_id, card_name } = req.body;

    console.log('controller: ' + user_id + ' | ' + card_name)

    try {
        await createNewCard(user_id, card_name);
    }
    catch (e) {
        console.log("ERRO: "+ e);
        return res.status(500).send({ success: false, error: { message: e } });
    }

    
    return res.status(201);

}

const deleteCard = async (req, res, next) => {

    const { user_id, card_name } = req.body;

    console.log('controller: ' + user_id + ' | ' + card_name)

    try {
        console.log('try')
        await deleteNewCard(user_id, card_name);
        res.status(200).send({ message: "Cartão deletado"});
        next();
    }
    catch (e) {
        return res.status(500).send({ success: false, error: { message: e } });
    }
}

const getCard = async (req, res, next) => {
   
    const { user_id, card_name, card_id } = req.body;

    console.log('controller: ' + user_id + ' | ' + card_name + ' | ' + card_id)

    try {
        result = await getNewCard(user_id, card_name, card_id);
        console.log(result);
        res.send(result);
        next();
    }
    catch (e) {
        return res.status(500).send({ success: false, error: { message: e } });
    }
}

const alterCard = async (req, res, next) => {
   
    const { user_id, card_name, new_card_name } = req.body;

    console.log('controller: ' + user_id + ' | ' + card_name + ' | ' + new_card_name)

    try {
        await alterCardName(user_id, card_name, new_card_name);
        res.status(200).send({ message: "Nome do Cartão modificado com sucesso"});
        next();
    }
    catch (e) {
        return res.status(500).send({ success: false, error: { message: e } });
    }
}

module.exports = {
    createCard,
    deleteCard,
    getCard,
    alterCard
}