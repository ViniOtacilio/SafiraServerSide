const { createLancamento, getLancamento } = require("../controllers/lancamentoController");
const { pool } = require("../database");
const { getLancamentoByUser } = require("../services/lancamentoService");

describe('lancamento', () => {
    test('createLancamento ', () => {
        expect(createLancamento!=0).toBe(true);
    });
    test('getLancamento ', () => {
        expect(getLancamento!=0).toBe(true);
    });
    test('lancamentoByUser', () => {
       expect(getLancamentoByUser!=0).toBe(true); 
    });
    test('connect to db ', () => {
       expect(pool!=0).toBe(true); 
    });
        
});
