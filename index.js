const express = require('express')
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const moment = require('moment');
const flash = require('express-flash');
const session = require('express-session');
const pg = require('pg');
const Pool = pg.Pool;



let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
// which db connection to use
const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://coder:pg123@localhost:5432/my_registrations';

const pool = new Pool({
    connectionString,
    ssl: useSSL
})

app.engine(
    'handlebars',
    exphbs({
        defaultLayout: 'main',
        helpers: {
            timestamp: function () {
                return moment(this.timestamp).fromNow();
            }
        }
    })
);

app.set('view engine', 'handlebars');
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(
    session({
        secret: '<add a secret string here>',
        resave: false,
        saveUninitialized: true
    })
);

app.use(flash());

app.get('/', async function(req, res){
    let Capetown = await pool.query('select id from towns where town_id =$1',['CA']);
    console.log(Capetown);
    rG = await pool.query('select reg from registrationNumbers where town_id =(7)')
    console.log(rG.rows);
     let number = await pool.query('Select reg from RegistrationNumbers');
     let myTowns = await pool.query('select towns.town_name,RegistrationNumbers.reg from RegistrationNumbers inner join towns on RegistrationNumbers.town_id=towns.id;');
    //  console.log(myTowns.rows);gistrationNumbers.
         
         for (var i=0;i< rG.rows.length;i++){
         var currentTown = rG.rows[i];
            console.log(rG.rows[i].reg);

        }

        //  }
      
       
       
     let registrationN = number.rows;

    res.render('home', {registrationN});
});

app.post('/reg_numbers', async function (req, res){ 
const regNumber = req.body.number;
let reg_Number = regNumber.toUpperCase();
let regCode = reg_Number.substring(0, 3).trim();

if(reg_Number.startsWith('CA ') || reg_Number.startsWith('CJ ')||reg_Number.startsWith('CAW ')){
let result = await pool.query('SELECT * FROM RegistrationNumbers WHERE reg=$1', [reg_Number])
if (result.rowCount === 0) {
  let TownId = await pool.query('SELECT id FROM towns WHERE town_id=$1', [regCode]);
  result = await pool.query('INSERT INTO RegistrationNumbers (reg, town_id) VALUES ($1, $2)', [reg_Number, TownId.rows[0].id]);
}
  }  res.redirect('/');
});

app.post('/regnumbers', async function(req, res){

});

// function mostProfitableDay(Departmentlist){
//     //console.log(Departmentlist);
//    var DeptName = "";
//    var Total = 0;
     
//      for (var i=0;i< Departmentlist.length;i++){
//      var currentDept = Departmentlist[i];
//        if (Total <= Departmentlist[i].total){
//          Total = Departmentlist[i].total; 
//          DeptName = currentDept.day;
//      }
//    // console.log(DeptName);
//    }return  DeptName;  
//      console.log(DeptName);
//    }
   
app.post('/clear', async function (req, res) {
    await pool.query('delete  from  reg');
    res.redirect('/');
});
let PORT = process.env.PORT || 3010;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});
