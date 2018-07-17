var { MongoClient } = require('mongodb');
var async = require('async');
var url = require('url');

var mongoUrl = 'mongodb://localhost:27017/bk1804';



module.exports = {
	defaultRoute: (req, res, next) => {
		//res.render('movies')
		async.waterfall( [
            ( cb ) => {
                MongoClient.connect( mongoUrl, ( err, db ) => {
                    if ( err ) throw err;
                    cb( null, db );
                })
            },
            ( db, cb ) => {
            	db.collection('movie').distinct('year', ( err, yearArr ) => {
            		if ( err ) throw err;
            		yearArr.sort(( a, b ) => {
            			return a - b;
            		})
            		cb( null, yearArr, db );
            	})
            },
            ( yearArr, db, cb ) => {
                db.collection('movie').find( {}, {_id:0}).toArray( ( err, res ) => {
                    if ( err ) throw err;
                    cb( null, {
                        res,   // 代表拿到所有的数据
                        yearArr
                    });
                    db.close();
                })
            }
        ], ( err, result ) => {
            if ( err ) throw err;
//          res.render('movies', {
//              result: result.res,
//              yearArr: result.yearArr
//          })
			res.send(result.res)
        })
    
	},
	sortMoviesRoute:( req, res, next ) => {
		var { type, num } = url.parse( req.url, true ).query;
		var sortObj = {};
		num = num * 1;
		
		try{
			sortObj[type] = num;
		}catch(e){
			//TODO handle the exception
		}
		
		async.waterfall( [
            ( cb ) => {
                MongoClient.connect( mongoUrl, ( err, db ) => {
                    if ( err ) throw err;
                    cb( null, db );
                })
            },
            ( db, cb ) => {
            	db.collection('movie').distinct('year', ( err, yearArr ) => {
            		if ( err ) throw err;
            		yearArr.sort(( a, b ) => {
            			return a - b;
            		})
            		cb( null, yearArr, db );
            	})
            },
            ( yearArr, db, cb ) => {
                db.collection('movie').find( {}, {_id:0}).sort( sortObj ).toArray( ( err, res ) => {
                    if ( err ) throw err;
                    cb( null, {
                        res,   // 代表拿到所有的数据
                        yearArr
                    });
                    db.close();
                })
            }
        ], ( err, result ) => {
            if ( err ) throw err;
//          res.render('movies', {
//              result: result.res,
//              yearArr: result.yearArr
//          })
			res.send( result.res )
        })
		
	},
	areaQueryMoviesRoute: ( req, res, next ) => {
		var { type, min, max } = url.parse( req.url, true).query;
		var whereObj = {};
		min = min * 1;
		max = max * 1;
		try{
			whereObj[type] = {
				$gte: min,
				$lte: max
			}
		}catch(e){
			//TODO handle the exception
		}
		
		async.waterfall( [
            ( cb ) => {
                MongoClient.connect( mongoUrl, ( err, db ) => {
                    if ( err ) throw err;
                    cb( null, db );
                })
            },
            ( db, cb ) => {
            	db.collection('movie').distinct('year', ( err, yearArr ) => {
            		if ( err ) throw err;
            		yearArr.sort(( a, b ) => {
            			return a - b;
            		})
            		cb( null, yearArr, db );
            	})
            },
            ( yearArr, db, cb ) => {
                db.collection('movie').find( whereObj, {_id:0}).toArray( ( err, res ) => {
                    if ( err ) throw err;
                    cb( null, {
                        res,   // 代表拿到所有的数据
                        yearArr 
                    });
                    db.close();
                })
            }
        ], ( err, result ) => {
            if ( err ) throw err;
//          res.render('movies', {
//              result: result.res,
//              yearArr: result.yearArr
//          })
			res.send(result.res)
        })
	},
	searchMoviesRoute: ( req, res, next ) => {
        var { type, val } = url.parse( req.url, true ).query;
        var whereObj = {};
//         var whereObj = {
//             title: eval("/"+title+"/")
//         }

            try{
            	whereObj[type] = eval("/"+val+"/")
            }catch(e){
            	//TODO handle the exception
            }
        console.log(whereObj)
        async.waterfall( [
        	( cb ) => {
        		MongoClient.connect( mongoUrl, ( err, db ) => {
        			if ( err ) throw err;
        			cb( null, db );
        		})
        	},
        	( db, cb ) => {
            	db.collection('movie').distinct('year', ( err, yearArr ) => {
            		if ( err ) throw err;
            		yearArr.sort(( a, b ) => {
            			return a - b;
            		})
            		cb( null, yearArr, db );
            	})
            },
            ( yearArr, db, cb ) => {
        		db.collection('movie').find( whereObj, {_id:0}).toArray( ( err, res ) => {
        			if ( err ) throw err;
        			cb( null, {
        				res,   // 代表拿到所有的数据
        				yearArr
        			});
        			db.close();
        		})
        	}
        ], ( err, result ) => {
        	if ( err ) throw err;
        	res.render('movies', {
        		result: result.res,
        		yearArr: result.yearArr
        	})
        })
	},
	getYearMovie: ( req, res, next ) => {
		var { year } = url.parse( req.url, true ).query;
		year = year * 1;
		async.waterfall( [
            ( cb ) => {
                MongoClient.connect( mongoUrl, ( err, db ) => {
                    if ( err ) throw err;
                    cb( null, db );
                })
            },
            ( db, cb ) => {
            	db.collection('movie').distinct('year', ( err, yearArr ) => {
            		if ( err ) throw err;
            		yearArr.sort(( a, b ) => {
            			return a - b;
            		})
            		cb( null, yearArr, db );
            	})
            },
            ( yearArr, db, cb ) => {
                db.collection('movie').find( {year: year}, {_id:0}).toArray( ( err, res ) => {
                    if ( err ) throw err;
                    cb( null, {
                        res,   // 代表拿到所有的数据
                        yearArr
                    });
                    db.close();
                })
            }
        ], ( err, result ) => {
            if ( err ) throw err;
            res.render('movies', {
                result: result.res,
                yearArr: result.yearArr
            })
        })
	}
	
}






















