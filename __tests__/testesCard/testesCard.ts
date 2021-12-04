var express = require("express");
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { createCard } = require("../../src/controllers/cardController.js");
const { deleteCard } = require("../../src/controllers/cardController.js");
const { alterCard } = require("../../src/controllers/cardController.js");

describe("Teste criacao card, caso ideal", () => {
    test("Deve retornar 201", async () => {
        const req = {
            body: {
                user_id: 19,
                card_name: 'teste'
            },
        };

        const res = {
            _status: null,
            _json: null,
            status: function (code) {
                this._status = code
                return this
            },
            send: function (json) {
                this._json = json
                return this
            }
        }

        const next = () => { }

        const output = 201;

        await createCard(req, res, next);

        expect(res._status).toEqual(output);
    });
});

describe("Teste criacao card, caso erro", () => {
    test("Deve retornar 500", async () => {
        const req = {
            body: {
              //body vazio deve retornar erro
            },
        };

        const res = {
            _status: null,
            _json: null,
            status: function (code) {
                this._status = code
                return this
            },
            send: function (json) {
                this._json = json
                return this
            }
        }

        const next = () => { }

        const output = 500;

        await createCard(req, res, next);

        expect(res._status).toEqual(output);
    });
});

describe("Teste deletar card, caso ideal", () => {
    test("Deve retornar 200", async () => {
        const req = {
            body: {
                user_id: 19,
                card_name: 'teste'
            },
        };

        const res = {
            _status: null,
            _json: null,
            status: function (code) {
                this._status = code
                return this
            },
            send: function (json) {
                this._json = json
                return this
            }
        }

        const next = () => { }

        const output = 200;

        await deleteCard(req, res, next);

        expect(res._status).toEqual(output);
    });
});

describe("Teste deletar card, caso erro", () => {
    test("Deve retornar 500", async () => {
        const req = {
            body: {
               
            },
        };

        const res = {
            _status: null,
            _json: null,
            status: function (code) {
                this._status = code
                return this
            },
            send: function (json) {
                this._json = json
                return this
            }
        }

        const next = () => { }

        const output = 500;

        await deleteCard(req, res, next);

        expect(res._status).toEqual(output);
    });
});

describe("Teste alterar card, caso ideal", () => {
    test("Deve retornar 200", async () => {
        const req = {
            body: {
                user_id: 19,
                card_name: 'teste',
                new_card_name: 'teste2'
            },
        };

        const res = {
            _status: null,
            _json: null,
            status: function (code) {
                this._status = code
                return this
            },
            send: function (json) {
                this._json = json
                return this
            }
        }

        const next = () => { }

        const output = 200;

        await alterCard(req, res, next);

        expect(res._status).toEqual(output);
    });
});

describe("Teste alterar card, caso erro", () => {
    test("Deve retornar 500", async () => {
        const req = {
            body: {
                
            },
        };

        const res = {
            _status: null,
            _json: null,
            status: function (code) {
                this._status = code
                return this
            },
            send: function (json) {
                this._json = json
                return this
            }
        }

        const next = () => { }

        const output = 500;

        await alterCard(req, res, next);

        expect(res._status).toEqual(output);
    });
});