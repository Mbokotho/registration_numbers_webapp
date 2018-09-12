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

     let number = await pool.query('Select reg from Reg ');
     let registrationN = number.rows;
    res.render('home', {registrationN});
});

app.post('/reg_numbers', async function (req, res){ 
const regNumber = req.body.number;
let reg_Number = regNumber.toUpperCase();
let regCode = reg_Number.substring(0, 3).trim();

if(reg_Number.startsWith('CY ') || reg_Number.startsWith('CJ ')||reg_Number.startsWith('CAW')){
    //   console.log(reg_Number);
    let result = await pool.query('insert into Reg (reg,town_id) values ($1,$2)', [reg_Number,regCode]);
}
    res.redirect('/');
});

app.post('/clear', async function (req, res) {
    await pool.query('delete  from  Reg');
    res.redirect('/');
});
let PORT = process.env.PORT || 3020;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});
