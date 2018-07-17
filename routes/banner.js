var fs = require('fs');

var { MongoClient } = require('mongodb');
var async = require('async');
var url = require('url');


var checkLogin = require('./checkLogin.js');
var mongoUrl = 'mongodb://localhost:27017/bk1804';


module.exports = {
	defaultRoute: (req, res, next) => {
		checkLogin.check( req, res );
		res.render('banner')
	},
	 addBannerRouter ( req, res, next ) {
      checkLogin.check( req, res );
      res.render('banner_add')
   },
   addBannerAction ( req, res, next ) {
   		checkLogin.check( req, res );
// 		console.log('req.body', req.body);
// 		console.log('req.file', req.file);
   		var { bannerid, bannerurl } = req.body;
   		/*
   		 * req.body { bannerid: 'banner2', bannerurl: 'http://www.baidu.com' }
req.file { fieldname: 'bannerimg',
  originalname: 'public.css',
  encoding: '7bit',
  mimetype: 'text/css',
  destination: 'uploads/',
  filename: 'e3f3b30906754b76bd449a9ebc1fd54c',
  path: 'uploads\\e3f3b30906754b76bd449a9ebc1fd54c',
  size: 586 }
   		*/
   		var oldName = './uploads/' + req.file.filename;
   		var finishFlagArr = req.file.originalname.split('.');
   		var finishFlag = finishFlagArr[finishFlagArr.length - 1];
   		var newName = './uploads/' + req.file.filename + '.' + finishFlag;
   		var imgurl = req.file.filename + '.' + finishFlag;
   		
   		async.waterfall([
   			( cb ) => {
   				fs.rename( oldName, newName, ( err, data) => {
   					if( err ) throw err;
   					cb( null, imgurl )
   				})
   			},
   			( imgurl, cb ) => {
   				MongoClient.connect( mongoUrl, ( err, db ) => {
   					if( err ) throw err;
   					cb( null, imgurl, db )
   				})
   			},
   			( imgurl, db, cb ) => {
   				db.collection('banner').insert({ bannerid, bannerurl, imgurl }, ( err, res ) => {
   					if( err ) throw err;
   					cb( null, 'ok');
   					db.close()
   				})
   			}
   		], ( err, result ) => {
   			if( err ) throw err;
   			if( result == 'ok'){
   				res.redirect('/banner')
   			}
   		})
   		
   		
   		
// 		res.send('!')
   }
}
