let regService = require('../services/registration');

const assert = require('assert');

const pg = require('pg');

const Pool = pg.Pool;

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/my_registrations';

const pool = new Pool({
    connectionString,
    ssl: useSSL
});

describe('Registrations widget', function () {
    beforeEach(async function () {
        await pool.query('delete from RegistrationNumbers');
    });

    it('Should return the entered registration number', async function () {
        let getReg = regService(pool);
        RegiNum= await getReg.putData('CA 123','CA');
        assert.strictEqual(RegiNum, 'CA 123');
    });

    it('Should not return same number twice', async function () {
        let getReg = regService(pool);
        RegiNum= await getReg.putData('CA 123','CA');
        RegiNum= await getReg.putData('CA 123','CA');
        assert.strictEqual(RegiNum, 'CA 123');
    });

    it('Should return All of the regNumbers', async function () {
        let getReg = regService(pool);
         await getReg.putData('CA 123','CA');
         await getReg.putData('CA 123','CA');
        await getReg.putData('CJ 123','CJ');

       town = await getReg.readAll('All')

        assert.deepEqual(town, [ { reg: 'CA 123' }, { reg: 'CJ 123' } ]);
    });
  
    it('Should return registration number for CTN ', async function () {

        let getReg = regService(pool);
        await getReg.putData('CA 1234','CA');
        await getReg.putData('CA 124','CA');
        await getReg.putData('CJ 123','CJ');

        town = await getReg.readCPT('CA');

        assert.deepEqual(town,  [ { reg: 'CA 1234' }, { reg: 'CA 124' } ]);  
    });  

    it('Should return registration number for George ', async function () {

        let getReg = regService(pool);
        await getReg.putData('CAW 1234','CAW');
        await getReg.putData('CAW 124','CAW');
        await getReg.putData('CJ 123','CJ');

        town = await getReg.readGeorge('CAW');

        assert.deepEqual(town, [ { reg: 'CAW 1234' }, { reg: 'CAW 124' } ] );  
    });  
    
    it('Should return registration number for Paarl ', async function () {

        let getReg = regService(pool);
        await getReg.putData('CAW 1234','CAW');
        await getReg.putData('CJ 124','CJ');
        await getReg.putData('CJ 123','CJ');

        town = await getReg.readPaarl('CJ');

        assert.deepEqual(town,  [ { reg: 'CJ 124' }, { reg: 'CJ 123' } ]);  
    });  

    after(function () {
        pool.end();
    });
});
