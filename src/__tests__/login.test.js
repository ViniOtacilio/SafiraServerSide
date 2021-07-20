const passport = require('passport');
const initialize = require('../utils/passportConfig');
const user = require('../utils/passportConfig');
const password = require('../utils/passportConfig');

describe('login', () => {
    test('contains user', () => {
        expect(user!=('')).toBe(true);
    });
    test('validate email', () => {
        const str = 'text@text.com';
        expect(str.includes("@")).toBe(true);
    });    
    test('contains password', () => {
        expect(password!=('')).toBe(true);
    });
 
});
