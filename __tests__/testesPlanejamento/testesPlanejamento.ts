var express = require("express");
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { createPlanejamento } = require("../../src/controllers/planejamentoController.js");
const { deletePlanejamento } = require("../../src/controllers/planejamentoController.js");

describe("Teste criacao planejamento, caso ideal", () => {
    test("Deve retornar 201", async () => {
        const req = {
            body: 
                [{
                    user_id: 19,
                    mes: '12-2021',
                    categoria_id: 5,
                    value: 300
                }]
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

        await createPlanejamento(req, res, next);

        expect(res._status).toEqual(output);
    });
});

describe("Teste criacao planejamento, caso erro", () => {
    test("Deve retornar 500", async () => {
        const req = {
            body:
                [{
                    mes: '12-2021',
                    categoria_id: 5,
                    value: 300
                }]
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

        await createPlanejamento(req, res, next);

        expect(res._status).toEqual(output);
    });
});


describe("Teste deletar planejamento, caso ideal", () => {
    test("Deve retornar 200", async () => {
        const req = {
            body:
                {
                    user_id: 19,
                    mes: '12-2021',
                    categoria_id: 5
                }
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

        await deletePlanejamento(req, res, next);

        expect(res._status).toEqual(output);
    });
});

describe("Teste deletar planejamento, caso erro", () => {
    test("Deve retornar 500", async () => {
        const req = {
            body:
            {
                mes: '12-2021',
                categoria_id: 5
            }
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

        await deletePlanejamento(req, res, next);

        expect(res._status).toEqual(output);
    });
});