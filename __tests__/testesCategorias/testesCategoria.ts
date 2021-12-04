var express = require("express");
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { createCustomCategory } = require("../../src/controllers/categoriaController.js");
const { deleteCustomCategory } = require("../../src/controllers/categoriaController.js");


describe("Teste criacao categoria, caso ideal", () => {
    test("Deve retornar 201", async () => {
        const req = {
            body: {
                user_id: 19,
                newCategoryName: 'teste'
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

        await createCustomCategory(req, res, next);

        expect(res._status).toEqual(output);
    });
});

describe("Teste criacao categoria, caso erro", () => {
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

        await createCustomCategory(req, res, next);

        expect(res._status).toEqual(output);
    });
});
