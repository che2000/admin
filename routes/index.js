var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer({
	dest:'uploads/'
})

var movies = require('./movies.js');
var casts = require('./casts.js');
var directors = require('./directors.js');
var admin = require('./admin.js');
var banner = require('./banner.js');




/* GET home page. */
router.get('/', function(req, res, next) {
//	console.log(req.cookies.a);
//	res.cookie('c','333333');
	var  type = req.cookies.loginState == 1 ? 'index' : 'login';
  res.render( type );
});

router.get('/movies', movies.defaultRoute);
router.get('/sortMoviesRoute', movies.sortMoviesRoute);
router.get('/areaQueryMoviesRoute', movies.areaQueryMoviesRoute);
router.get('/searchMoviesRoute', movies.searchMoviesRoute);
router.get('/getYearMovie', movies.getYearMovie);
//router.get('/addMovieRoute', movies.addMovieRoute);//定义添加演员
//router.post('/addMoviesAction', movies.addMoviesAction);

//router.get('/deleteMovieRoute', movies.deleteMovieRoute);

/* 演员相关的路由 */
router.get('/casts', casts.defaultRoute);  // 默认路由，调用形式为  /casts
router.get('/castspaging', casts.castspaging);// 分页路由，调用形式为  /castspaging?limitNum=*&skipNum=*
router.get('/deleteCastRoute', casts.deleteCastRoute);//定义删除路由
router.get('/addCastRoute', casts.addCastRoute);//定义添加演员
router.post('/addCastsAction', casts.addCastsAction);
router.get('/updateCastRoute', casts.updateCastRoute);//定义编辑演员
router.post('/updateCastsAction', casts.updateCastsAction);

router.get('/admin', admin.defaultRoute);
router.post('/adminLoginAction', admin.adminLoginAction);

router.get('/directors', directors.defaultRoute);

router.get('/banner', banner.defaultRoute);
router.get('/addBannerRouter', banner.addBannerRouter);

router.post('/addBannerAction', upload.single('bannerimg'), banner.addBannerAction);

module.exports = router;
