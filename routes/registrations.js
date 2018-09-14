let regServices = require("../services/registration");

module.exports = function(pool) {
  let getReg = regServices(pool);

  async function home(req, res) {
    try {
      let names = await getReg.readData();
      res.render("home", { names });
    } catch (err) {}
  }

  async function registrations(req, res) {
    try {
      const regNumber = req.body.number;
      const reg_Number = regNumber.toUpperCase();
      const regCode = reg_Number.substring(0, 3).trim();
      if (
        reg_Number.startsWith("CY ") ||
        reg_Number.startsWith("CJ ") ||
        reg_Number.startsWith("CAW")
    
      }
      res.redirect("/");
    } catch (err) {}
  }

//   async function greeted(req, res) {
//     try {
//       let names = await getReg.readData();
//       res.render("greeted", { names });
//     } catch (err) {}
//   }
//   async function counter(req, res) {
//     try {
//       let username = req.params.username;
//       let results = await getReg.readUser(username);
//       res.render("names", { times: results });
//     } catch (err) {
//       res.send(err.stack);
//     }
//   }

//   async function Reset(req, res) {
//     try {
//       await getReg.reset();
//       res.redirect("/");
//     } catch (err) {}
//   }

  return {
    home,
    registrations,
    // greeted,
    // Reset,
    // counter
  };
};
