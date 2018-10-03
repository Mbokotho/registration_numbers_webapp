let regServices = require("../services/registration");

module.exports = function(pool) {

  let getReg = regServices(pool);

  async function home(req, res) {
    try {
      registrationN = await getReg.readData();
      res.render("home", { registrationN});
    } catch (err) {}
  };

  async function registrations(req, res) {
    try {
    const regNumber = req.body.number;
    const reg_Number = regNumber.toUpperCase();
    const regCode = reg_Number.substring(0, 3).trim();
    if (regNumber === '' ) {
      req.flash('info', 'Please enter a registration number that if from Paarl(CJ), CapeTown(CA) or George(CAW) !.');
    } 
  // else if( regCode !== reg_Number.substring(0, 3).trim(regNumber))
  // { req.flash('info', 'Please enter a registration number in the correct format i.e (CA 123456)');
  //   // await getReg.putData(reg_Number,regCode);
  // }
  else{
    await getReg.putData(reg_Number,regCode);
  }
  
  res.redirect("/");
}catch(err){}

    };

    async function Townz(req,res){
      try{
        const myTown = req.body.Town;

        if (myTown === 'All') {
      registrationN =  await getReg.readAll(myTown)
      res.render("home", { registrationN});
        }
        if (myTown === 'CA') {
      registrationN =  await getReg.readCPT(myTown)
      res.render("home", { registrationN});
        }

      if (myTown === 'CJ') {
        registrationN =  await getReg.readPaarl(myTown)
        res.render("home", { registrationN});
      }
        if (myTown === 'CAW') {
          registrationN =  await getReg.readGeorge(myTown)
          res.render("home", { registrationN});
       
      }
      
      if (myTown === undefined){
        
        registrationN =  await getReg.readGeorge(myTown)
        res.render("home", { registrationN});
     
      }

      }
      catch(err){}
    }



  return {
    home,
    registrations,
    Townz
  };
};
