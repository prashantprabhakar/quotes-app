console.log("May node with you");

const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
// tell server to read json data
app.use(bodyParser.json());
//Tell express to make folder accessible to public
app.use(express.static('public'));


MongoClient.connect('mongodb://localhost/star-war-quotes',(err, database)=>{
	if(err) return console.log(err);
	db = database;
	// start server only when db is connected
	app.listen(3000, function(){
		console.log("Running on port 3000");
	});

});

app.get('/old',function(req, res){
	// To just print in broswer
	//res.send('You are on right track');	
});

app.get('/new',(req,res)=>{
	// To just send plane text
	//res.send('You are on right track and using es6');

	// To server a file
	console.log(__dirname);
	res.sendFile(__dirname + '/index.html');
});


app.post('/quotes', (req, res)=>{
	console.log(req.body);
	// save quotes to databse
	db.collection('quotes').save(req.body, (err, result)=>{
		if(err) return console.log(err);
		console.log('Saved to database');
		res.redirect('/');

	});
});

// Get quotes from db
app.get('/', (req, res)=>{
	var cursor = db.collection('quotes').find();
	cursor.toArray((err, results)=>{
		res.render('index.ejs', {quotes: results})
	});
});


app.put('/quotes',(req, res)=>{
	// handle put request here
	db.collection('quotes')
	.findOneAndUpdate({
		name: req.body.name
	},
	{
		$set:{
			quote : req.body.quote
		}
	},
	{
		sort: {_id:-1},
			// upsert:true inserts a new entry if a entry doesn't exists
			upsert: true
		},
		(err, result)=>{
			if(err) return res.send(err);
			res.send(result);
		});
});

/*Use this to delte via javascript. You need to use main.js for this*/
app.delete('/quotes',(req,res)=>{
	db.collection('quotes')
	.findOneAndDelete({
		name :req.body.name
	},
	(err,result)=>{
		if(err) return res.send(500,err);
		res.send({message: 'A dart vadar quote deleted'});
	});
});

/*app.post('/updatequote',(req, res)=>{
	// handle put request here
	db.collection('quotes')
	.findOneAndUpdate({
		name: 'Yoda'
	},
	{
		$set:{
			name: req.body.name,
			quote : req.body.quote
		}
	},
	{
		sort: {_id:-1},
			// upsert:true inserts a new entry if a entry doesn't exists
			upsert: true
		},
		(err, result)=>{
			if(err) return res.send(err);
			res.send(result);
		});
});*/


/* Use this to delete using form. You don't need anything in main.js for this*/
/*app.post('/deletequote',(req,res)=>{
	db.collection('quotes')
	.findOneAndDelete({
		name :req.body.name
	},
	(err,result)=>{
		if(err) return res.send(500,err);
		res.send({message: 'A dart vadar quote deleted'});
	});
});*/