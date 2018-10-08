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
    
    let code = await getReg.Invalid(regCode);
    console.log(code);

    if (regNumber === '') {
      req.flash('info', 'Please enter a registration number that is from Paarl(CJ), CapeTown(CA) or George(CAW) !.');
    } 
   else if(code === 0) { 
    req.flash('info','Invalid registaration number entered !');
  }

  else if(await getReg.Duplicates(reg_Number)=== reg_Number){
    req.flash('info','Registration Number has been added already ! ');
  }
  
   else {
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
