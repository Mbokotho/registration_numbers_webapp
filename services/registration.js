module.exports = function (pool) {

    async function readData () {
        let result = await pool.query('select * from RegistrationNumbers');
        return result.rows;
    }
    async function putData (reg_Number,regCode) {
        // let regCode = reg_Number.substring(0, 3).trim();
        if(reg_Number.startsWith('CA ') || reg_Number.startsWith('CJ ')||reg_Number.startsWith('CAW ')){
        let result = await pool.query('SELECT * FROM RegistrationNumbers WHERE reg=$1', [reg_Number])
        if (result.rowCount === 0) {
          let TownId = await pool.query('SELECT id FROM towns WHERE town_id=$1', [regCode]);
          result = await pool.query('INSERT INTO RegistrationNumbers (reg, town_id) VALUES ($1, $2)', [reg_Number, TownId.rows[0].id]);
        }
    } return reg_Number;

  };
async function   readTown(townId) {

              result = await pool.query('select id from towns where town_id=$1',[townId]);
              let id = result.rows[0].id;
              console.log(id);
              const mytowns =  await pool.query('select reg from RegistrationNumbers where town_id =$1',[id]);
              console.log(mytowns.rows);
              let registrationN = mytowns.rows;
              return registrationN;
                console.log(registrationN)
              // res.render('home', {registrationN})

}
    return {
        putData,
        readData,
        readTown


    };
};
