module.exports = function (pool) {

    async function readData () {
        let result = await pool.query('select * from RegistrationNumbers');
        return result.rows;
    }

    async function putData (reg_Number,regCode) {
        // let regCode = reg_Number.substring(0, 3).trim();
        if(reg_Number.startsWith('CA ') || reg_Number.startsWith('CJ ')||reg_Number.startsWith('CAW ')){
        let result = await pool.query('SELECT * FROM RegistrationNumbers WHERE reg=$1', [reg_Number]);
        if (result.rowCount === 0) {
          let TownId = await pool.query('SELECT id FROM towns WHERE town_id=$1', [regCode]);
        
          result = await pool.query('INSERT INTO RegistrationNumbers (reg, town_id) VALUES ($1, $2)', [reg_Number,TownId.rows[0].id]);
        }

    } return reg_Number

  };

async function   readTown(townId) {
              result = await pool.query('select id from towns where town_id=$1',[townId]);
              let id = result.rows[0].id;
              const mytowns =  await pool.query('select reg from RegistrationNumbers where town_id =$1',[id]);
              let registrationN = mytowns.rows;
              return registrationN;
                     

}

async function readCPT(myTown){
    if (myTown ==='CA') {
        result = await pool.query('select id from towns where town_id=$1',['CA']);
        let id = result.rows[0].id;
        const mytowns =  await pool.query('select reg from RegistrationNumbers where town_id =$1',[id]);
        let registrationN = mytowns.rows;
        return registrationN
}
};

async function readGeorge(myTown){
    if (myTown ==='CAW') {
        result = await pool.query('select id from towns where town_id=$1',['CAW']);
        let id = result.rows[0].id
        const mytowns =  await pool.query('select reg from RegistrationNumbers where town_id =$1',[id]);
        let registrationN = mytowns.rows;
        return registrationN
}  
};

async function readPaarl(myTown){
    if (myTown ==='CJ') {
        result = await pool.query('select id from towns where town_id=$1',['CJ']);
        let id = result.rows[0].id
        const mytowns =  await pool.query('select reg from RegistrationNumbers where town_id =$1',[id]);
        let registrationN = mytowns.rows;
        return registrationN

 
    }
}

async function readAll(myTown){

 if (myTown ==='All') {
      let number = await pool.query('Select reg from RegistrationNumbers');
     let registrationN = number.rows;
     return registrationN
         }

};

    return {
        putData,
        readData,
        readTown,
        readCPT,
        readGeorge,
        readPaarl,
        readAll

    }
};
