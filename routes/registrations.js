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
    await getReg.putData(reg_Number,regCode);
    res.redirect("/");
    }
   catch(err){}

    };

//     async function filter(townId) {
// try{
//   const myTown = req.body.Town;
//    // let myTown = townId;
//    await getReg.readTown(townId)
//   res.render('home', {registrationN})
//
// }catch(err){}
//     }

  return {
    home,
    registrations
  };
};
