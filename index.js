
const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 5000;


//use body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// set Handlebars middlesware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// API key pk_a5f10f84b6e54750a8849f64f87c4aa5
// function call_api(finishedAPI){
// 	request('https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_a5f10f84b6e54750a8849f64f87c4aa5', {json: true}, (err , res, body) => {
// 		if(err) {return console.log(err);}
// 		//console.log(body);
// 		if(res.statusCode === 2000){
// 			finishedAPI(body);
// 		};
// 	});
// };

function call_api(finishedAPI,ticker) {
	request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_062031d20883444f9ea74e2610fe2011', { json: true }, (err, res, body) => {
	if (err) {return console.log(err);}
	if (res.statusCode === 200){
		//console.log(body);
		finishedAPI(body);
		};
	});
};

//set handlebar index GET routes
app.get('/', function (req, res) {
    call_api(function(doneAPI) {
    	res.render('home',{
    		stuff: doneAPI
    	});
    },"fb");
    
});

//set handlebar index POST routes
app.post('/', function (req, res) {
    call_api(function(doneAPI) {
    	//posted_stuff = req.body.stock_ticker;
    	res.render('home',{
    		stuff: doneAPI,
    		//posted_stuff: posted_stuff
    	});
    }, req.body.stock_ticker);
    
});

//set about apge
app.get('/about.html',function(req,res){
	res.render('about');
});

//set static folder
app.use(express.static(path.join(__dirname,'public')))


app.listen(PORT,()=> console.log('server listening on '+ PORT));