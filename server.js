var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	mongoose = require('mongoose'),
	config = require('./config'),
	path = require('path'),
	User = require('./app/models/user'),	
	nodemailer = require('nodemailer'),
	schedule = require('node-schedule'),	
	cronJob = require('cron').CronJob,
	usersList,
	mailOptions,
	job,
	Service = require('node-windows').Service;
	
	var smtpTransport = nodemailer.createTransport({
		service : "Gmail",
		auth:{
			user:config.user,
			pass:config.password
		}
	});

	function getUsers(cb){		
		User.find({},function(err, users){
			cb(users);
		});
	}

	function sendEmails(resp){
		
		resp.forEach(function(user){
			usersList += ','+user.username;
		})		
		mailOptions = {
			from:"saudam@nisum.com",
			to:usersList,
			subject:"Submit your timesheet",
			text:"Please submit your timesheet"
		};	
		job = schedule.scheduleJob({hour: 12, minute: 25}, function(){
	   		console.log("in cronjob");
			smtpTransport.sendMail(mailOptions, function(error, info){
			    if(error){
			        return console.log(error);
			    }
			    console.log('Message sent: ' + info.response);
			});		
		});	
	}	
	getUsers(sendEmails);
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	app.use(function(req, res, next){
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \
		Authorization');
		next();
	});

	app.use(morgan('dev'));
	mongoose.connect(config.database,function(error){
		if(error)console.log(error);
		else console.log("mongo connected");
	});		
	app.use(express.static(__dirname + '/public'));

	app.get('*',function(req, res){
		res.sendFile(path.join(__dirname+'/public/app/views/index.html'));
	});

	app.post('/register',function(req, res){
		console.log(req.body);
		var user = new User();
		user.username = req.body.username;
		user.password = req.body.password;		
		user.save(function(err){
			if(err){
				if(err.code == 11000){
					return res.json({success:false,message:"a user already exists with that name"});
				}
				else{
					return res.send(err);
				}
			}
			res.json({success:true,message:"You are successfully registered into nisum scheduler"});
		})
	});

	// app.post('/login',function(req, res){
	// 	console.log(req.body);

	// 	User.findOne({
	// 		username:req.body.username
	// 	}).select('username password').exec(function(err, user){
	// 		console.log(user);
	// 		if(err){
	// 			throw err;
	// 		}
	// 		if(!user){
	// 			res.json({success:false,message:"user not found"});
	// 		}
	// 		else if(user){
	// 			var valid = user.comparePassword(req.body.password);
	// 			if(!valid){
	// 				res.json({
	// 					success:false,message:"Authentication failed wrong password"
	// 				})
	// 			}
	// 			else{

	// 			}
	// 		}

	// 	})
	// })

	app.listen(config.port);
	console.log("listening at 3000");

	