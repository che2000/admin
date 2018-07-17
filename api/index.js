var express = require('express');
var router = express.Router();

var movies = require('./movies.js');
var casts = require('./casts.js');
var directors = require('./directors.js');
var user = require('./user.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/movies', movies.defaultRoute);
router.get('/sortMoviesRoute', movies.sortMoviesRoute);
router.get('/areaQueryMoviesRoute', movies.areaQueryMoviesRoute);
router.get('/searchMoviesRoute', movies.searchMoviesRoute);

router.get('/getYearMovie', movies.getYearMovie);


/* 演员相关的路由 */
router.get('/casts', casts.defaultRoute);  // 默认路由，调用形式为  /casts
router.get('/castspaging', casts.castspaging);// 分页路由，调用形式为  /castspaging?limitNum=*&skipNum=*
router.get('/deleteCastRoute', casts.deleteCastRoute);//定义删除路由
router.get('/addCastRoute', casts.addCastRoute);//定义添加演员
router.post('/addCastsAction', casts.addCastsAction);
router.get('/updateCastRoute', casts.updateCastRoute);//定义编辑演员
router.post('/updateCastsAction', casts.updateCastsAction);

router.get('/getCastDetailRoute', casts.getCastDetailRoute);
router.get('/directors', directors.defaultRoute);

router.get('/user', user.defaultRoute);
router.get('/sendCode', user.sendCode);

module.exports = router;
