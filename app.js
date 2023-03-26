const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./route/restaurant');
const routerL = require('./route/locationRoutes');
const routerM = require('./route/mealtype');
const routerMenu = require('./route/menu');
const routerPayment = require('./route/payment');
const signupRouter = require('./route/signup');
const loginRouter = require('./route/Login');

const cors = require('cors')


// connet to mongodb database    //instead of  127.0.0.1 we can use localhost
const DBCONNECTIONSTRING = 'mongodb+srv://choubey__jii_:Sankalp%40098$@cluster0.j9tyhtg.mongodb.net/Zomato40';
// 'mongodb://127.0.0.1:27017/zomato'
mongoose.connect(DBCONNECTIONSTRING,
    () => {
        console.log('MongoDB Port is successfully conected')
    },
    (e) => {
        console.log(e)
    });

// start the express server
const PORT = process.env.PORT || 8521;


var app = express();

// middleware
app.use(bodyParser.json())
app.use(cors());
   


app.use('/restaurant', router);
app.use('/location', routerL);
app.use('/mealtype', routerM);
app.use('/menu', routerMenu);
app.use('/pay', routerPayment);
app.use('/signUp', signupRouter)
app.use('/login', loginRouter)


// heroku configrautions:
if (process.env.NODE_ENV = "production") {
    app.use(express.static("frontend/build"));
    const path = require("path");
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'frontend','build','index.html'));
    })
}




// listen to the PORT
app.listen(PORT, console.log(`App is successfully running on the PORT: ${PORT}`));
