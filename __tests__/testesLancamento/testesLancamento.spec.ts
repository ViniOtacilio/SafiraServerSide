var express = require("express");
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { createLancamento } = require("../../src/controllers/lancamentoController.js");
const { deleteLancamento } = require("../../src/controllers/lancamentoController.js");


describe("Teste criacao lancamento, caso ideal",  () => {
    test("Deve retornar 201", async () => {
        const req = {
            body: {
                value: 100,
                tipo_de_transacao: 1,
                userid: 19,
                categoriaid: 1,
                titulo_lancamento: 'Salario',
                comentario: 'teste'
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

        await createLancamento(req, res, next);

        expect(res._status).toEqual(output);
    });
});

describe("Teste criacao lancamento, caso erro", () => {
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

        await createLancamento(req, res, next);

        expect(res._status).toEqual(output);
    });
});

describe("Teste deletar lancamento, caso ideal", () => {
    test("Deve retornar 200", async () => {
        const req = {
            params: {
                id: 1
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

        await deleteLancamento(req, res, next);

        expect(res._status).toEqual(output);
    });
});

describe("Teste deletar lancamento, caso erro", () => {
    test("Deve retornar 500", async () => {
        const req = {
            params: {
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

        await deleteLancamento(req, res, next);

        expect(res._status).toEqual(output);
    });
});