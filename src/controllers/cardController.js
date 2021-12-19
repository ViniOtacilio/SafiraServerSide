const { createNewCard } = require('../services/cardService');
const { deleteNewCard } = require('../services/cardService');
const { getNewCard } = require('../services/cardService');
const { alterCardName } = require('../services/cardService');


const createCard = async (req, res, next) => {

    const { user_id, card_name } = req.body;

    try {
        await createNewCard(user_id, card_name);
    }
    catch (e) {
        return res.status(500).send({ success: false, error: { message: e } });
    }

    return res.status(201).send({ success: true, message: "Cartão Criado"});

}

const deleteCard = async (req, res, next) => {

    const { user_id, card_name } = req.body;

    try {
        await deleteNewCard(user_id, card_name);
        res.status(200).send({ message: "Cartão deletado"});
        next();
    }
    catch (e) {
        return res.status(500).send({ success: false, error: { message: e } });
    }
}

const getCard = async (req, res, next) => {

    const user_id = req.query.user_id;
    const card_name = req.query.card_name;
    const card_id = req.query.card_id;

    try {
        result = await getNewCard(user_id, card_name, card_id);

        res.send(result);
        next();
    }
    catch (e) {
        return res.status(500).send({ success: false, error: { message: e } });
    }
}

const alterCard = async (req, res, next) => {

    const { user_id, card_name, new_card_name } = req.body;

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
