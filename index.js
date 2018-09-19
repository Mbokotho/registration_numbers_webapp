const express = require('express')
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const moment = require('moment');
const flash = require('express-flash');
const session = require('express-session');
const pg = require('pg');
const Pool = pg.Pool;

let regRoutes = require('./routes/registrations');

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
let getReg = regRoutes(pool);

app.get('/', getReg.home);
app.post('/reg_numbers', getReg.registrations);
app.post('/regnumbers', getReg.Townz);
// async function(req, res){
// //
//     const myTown = req.body.Town;

//     if (myTown ==='CA') {
//     result = await pool.query('select id from towns where town_id=$1',['CA']);
//     let id = result.rows[0].id;

//     console.log(id);
//     const mytowns =  await pool.query('select reg from RegistrationNumbers where town_id =$1',[id]);
//     console.log(mytowns.rows);
//     let registrationN = mytowns.rows;

//     res.render('home', {registrationN})
//     }

//     if (myTown ==='CJ') {
//         result = await pool.query('select id from towns where town_id=$1',['CJ']);
//         let id = result.rows[0].id;
//         console.log(id);
//         const mytowns =  await pool.query('select reg from RegistrationNumbers where town_id =$1',[id]);
//         console.log(mytowns.rows);
//         let registrationN = mytowns.rows;
//         res.render('home', {registrationN})
//         }


//         if (myTown ==='CAW') {
//             result = await pool.query('select id from towns where town_id=$1',['CAW']);
//             let id = result.rows[0].id;
//             console.log(id);
//             const mytowns =  await pool.query('select reg from RegistrationNumbers where town_id =$1',[id]);
//             console.log(mytowns.rows);
//             let registrationN = mytowns.rows;
//             res.render('home', {registrationN})
//             }

//     if (myTown ==='All') {
//      let number = await pool.query('Select reg from RegistrationNumbers');
//      let registrationN = number.rows;
//         res.render('home', {registrationN})
//         }



// }

app.post('/clear', async function (req, res) {
    await pool.query('delete  from  RegistrationNumbers');
    res.redirect('/');
});
let PORT = process.env.PORT || 3010;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});
